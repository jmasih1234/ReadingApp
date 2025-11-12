from django.shortcuts import render


def home(request):
    """Render the main UI page with a small initial context."""
    # Provide a small set of reading sections. These can be replaced with
    # dynamic content later (DB, file, etc.).
    sections = [
        "Section 1 sample text placeholder.",
        "Section 2 sample text placeholder.",
        "Section 3 sample text placeholder.",
        "Section 4 sample text placeholder.",
        "Section 5 sample text placeholder.",
        "Section 6 sample text placeholder.",
        "Section 7 sample text placeholder.",
        "Section 8 sample text placeholder.",
    ]

    context = {
        'initial_count': 0,
        'sections': sections,
    }
    return render(request, 'appsetup/index.html', context)
