import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import TrialLog, PreferenceSurvey


def home(request):

    sections = [f"Placeholder {i}" for i in range(1, 25)]

    context = {
        'initial_count': 0,
        'sections': sections,
    }
    return render(request, 'appsetup/index.html', context)


def about(request):
    return render(request, 'appsetup/about.html')


def instructions(request):
    return render(request, 'appsetup/instructions.html')


@csrf_exempt
def log_trial(request):
    if request.method != 'POST':
        return HttpResponseBadRequest('POST required')
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        return HttpResponseBadRequest('Invalid JSON')

    participant_id = (data.get('participant_id') or '').strip()
    condition_id = (data.get('condition_id') or '').strip()

    if not participant_id or not condition_id:
        return HttpResponseBadRequest('participant_id and condition_id required')

    duration_ms = data.get('duration_ms')
    word_count = data.get('word_count')
    wpm = data.get('wpm')

    try:
        if (wpm is None or wpm == '') and word_count is not None and duration_ms:
            minutes = float(duration_ms) / 60000.0
            if minutes > 0:
                wpm = float(word_count) / minutes
    except Exception:
        wpm = None

    log = TrialLog.objects.create(
        participant_id=participant_id,
        condition_id=condition_id,
        duration_ms=duration_ms,
        word_count=word_count,
        wpm=wpm,
    )
    return JsonResponse({'ok': True, 'id': log.id})

@csrf_exempt
def save_survey(request):
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

    survey, created = PreferenceSurvey.objects.update_or_create(
        participant_id=participant_id,
        defaults={'ranked_conditions': ranked_conditions}
    )
    return JsonResponse({'ok': True, 'id': survey.id, 'created': created})
