# ReadingApp

A Django-based web application built to support HCI research into how visual design variables (font size, font family, text/background colour) affect reading speed and user preference.

## Overview

The app presents participants with 24 text passages (8 conditions × 3 sections each) in a researcher-configured sequence. It automatically measures reading duration, calculates words per minute (WPM), and collects a post-trial preference ranking survey. All data is saved to a database for later analysis.

## Quick Start

### Prerequisites

- Python 3.10+
- pip

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd ReadingApp

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Navigate to the Django project directory
cd ReadingApp

# 5. Apply database migrations
python manage.py migrate

# 6. (Optional) Create an admin superuser
python manage.py createsuperuser

# 7. Start the development server
python manage.py runserver
```

The application is then available at <http://127.0.0.1:8000/>.

## Usage

### For Researchers

1. Open the **Home** page and enter a unique **Participant ID** (e.g. `P001`).
2. Click each condition pill to fill the 8 sequence slots, setting the order in which conditions will appear.
3. Click **Begin trial** to start the experiment.
4. After all 24 passages have been read, the participant completes the preference survey.
5. Access collected data via the Django admin panel at <http://127.0.0.1:8000/admin/>.

### For Participants

1. Click **Start** when you are ready to read the displayed passage.
2. Click **Finished Reading** as soon as you finish.
3. Repeat for all 24 passages.
4. Drag and drop the condition cards to rank them from most to least preferred, then click **Submit Survey**.

## Reading Conditions

| ID | Description |
|----|-------------|
| `default` | Arial, 17 px, black on white |
| `size-small` | 10 px font size |
| `size-large` | 24 px font size |
| `font-verdana` | Verdana font family |
| `font-inter` | Inter font family |
| `color-wb` | White text on black background |
| `color-bblue` | Black text on light blue background |
| `color-bred` | Black text on light red background |

## Data Collected

Each trial log stores:
- Participant ID and condition ID
- Reading duration (ms) and word count
- Words per minute (WPM) — calculated automatically if not supplied by the client

The preference survey stores the participant's ranked ordering of all 8 conditions.

## Project Structure

```
ReadingApp/
├── ReadingApp/          # Django project settings, root URLs
├── appsetup/            # Main application
│   ├── models.py        # TrialLog, PreferenceSurvey models
│   ├── views.py         # Page views and API endpoints
│   ├── urls.py          # URL patterns
│   ├── admin.py         # Admin registrations
│   ├── templates/       # HTML templates
│   └── static/          # CSS, JavaScript, favicon
├── manage.py
└── requirements.txt
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `POST` | `/api/log-trial/` | Save a single trial reading log |
| `POST` | `/api/save-survey/` | Save participant preference ranking |

## Running Tests

```bash
python manage.py test
```
