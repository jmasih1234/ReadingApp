import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import TrialLog, PreferenceSurvey


def home(request):
    """Render the main UI page with a small initial context."""
    # Provide a small set of reading sections. These can be replaced with
    # dynamic content later (DB, file, etc.).
    # Provide 24 sections (8 conditions × 3 repeats)
    sections = [
        "Section 1 sample text placeholder.",
        "Section 2 sample text placeholder.",
        "Section 3 sample text placeholder.",
        "Section 4 sample text placeholder.",
        "Section 5 sample text placeholder.",
        "Section 6 sample text placeholder.",
        "Section 7 sample text placeholder.",
        "Section 8 sample text placeholder.",
        "Section 9 sample text placeholder.",
        "Section 10 sample text placeholder.",
        "Section 11 sample text placeholder.",
        "Section 12 sample text placeholder.",
        "Section 13 sample text placeholder.",
        "Section 14 sample text placeholder.",
        "Section 15 sample text placeholder.",
        "Section 16 sample text placeholder.",
        "Section 17 sample text placeholder.",
        "Section 18 sample text placeholder.",
        "Section 19 sample text placeholder.",
        "Section 20 sample text placeholder.",
        "Section 21 sample text placeholder.",
        "Section 22 sample text placeholder.",
        "Section 23 sample text placeholder.",
        "Section 24 sample text placeholder.",
    ]

    context = {
        'initial_count': 0,
        'sections': sections,
    }
    return render(request, 'appsetup/index.html', context)


@csrf_exempt
def log_trial(request):
    """Accept a JSON payload from the client to record a completed trial.

    Expected JSON fields:
    - participant_id: str
    - section_index: int (0-based)
    - condition_id: str
    - started_at_ms: int (optional)
    - ended_at_ms: int (optional)
    - duration_ms: int (optional)
    - word_count: int (optional)
    - wpm: float (optional; if absent but word_count+duration provided, server derives)
    """
    if request.method != 'POST':
        return HttpResponseBadRequest('POST required')
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return HttpResponseBadRequest('Invalid JSON')

    participant_id = (data.get('participant_id') or '').strip()
    condition_id = (data.get('condition_id') or '').strip()
    try:
        section_index = int(data.get('section_index'))
    except Exception:
        return HttpResponseBadRequest('section_index required')

    if not participant_id or not condition_id:
        return HttpResponseBadRequest('participant_id and condition_id required')

    duration_ms = data.get('duration_ms')
    word_count = data.get('word_count')
    wpm = data.get('wpm')
    # Derive WPM server-side if missing and data available
    try:
        if (wpm is None or wpm == '') and word_count is not None and duration_ms:
            minutes = float(duration_ms) / 60000.0
            if minutes > 0:
                wpm = float(word_count) / minutes
    except Exception:
        # Fallback to None on any unexpected error
        wpm = None

    log = TrialLog.objects.create(
        participant_id=participant_id,
        section_index=section_index,
        condition_id=condition_id,
        started_at_ms=data.get('started_at_ms'),
        ended_at_ms=data.get('ended_at_ms'),
        duration_ms=duration_ms,
        word_count=word_count,
        wpm=wpm,
    )
    return JsonResponse({'ok': True, 'id': log.id})


@csrf_exempt
def save_survey(request):
    """Accept a JSON payload with ranked condition preferences after trial completion.

    Expected JSON fields:
    - participant_id: str
    - ranked_conditions: list of condition IDs ordered from most to least preferred
    """
    if request.method != 'POST':
        return HttpResponseBadRequest('POST required')
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return HttpResponseBadRequest('Invalid JSON')

    participant_id = (data.get('participant_id') or '').strip()
    ranked_conditions = data.get('ranked_conditions')

    if not participant_id:
        return HttpResponseBadRequest('participant_id required')
    if not isinstance(ranked_conditions, list) or len(ranked_conditions) != 8:
        return HttpResponseBadRequest('ranked_conditions must be a list of 8 condition IDs')

    # Use update_or_create to allow resubmission if needed
    survey, created = PreferenceSurvey.objects.update_or_create(
        participant_id=participant_id,
        defaults={'ranked_conditions': ranked_conditions}
    )
    return JsonResponse({'ok': True, 'id': survey.id, 'created': created})
