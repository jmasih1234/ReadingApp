from django.shortcuts import render


def home(request):
    """Render the main UI page with a small initial context."""
    context = {
        'initial_count': 0,
    }
    return render(request, 'appsetup/index.html', context)
