# ReadingApp
This django, Python-based web application will serve as a means to justify and test our HCI-based research hypothesis regarding Visual Design Variables and their Effects on Reading Performance. 
1. Clone Repository
2. Install django on personal machine
3. Make a virtual environment
   - python -m venv (name)
   - Windows: venv\Scripts\activate
   - macOS/Linux: source venv/bin/activate
   - pip install django
   - cd ReadingApp
   - (again) cd ReadingApp
   - py manage.py runserver
4. Lots of Other Tutorials on Youtube if this doesn't work
Web Application Plans
____________________________________________________________________________________________________________________________________________________
Build the Reading Test Page

Create Simple Model

Create Result model with fields: participant_name, font_type, font_size, text_color, bg_color, wpm, timestamp
Run python manage.py makemigrations
Run python manage.py migrate


Build Single Page View

Create view in views.py that renders the reading test
Add URL pattern in urls.py
Create template with:

Text passage (hardcoded for now)
"Start" button (starts timer)
"Done Reading" button (stops timer, calculates WPM)


Add Timer Logic (JavaScript)

JavaScript timer that starts/stops
Calculate WPM: (word count / seconds) × 60
Auto-submit form with WPM result


Create Results Page

Simple view that shows: "Your reading speed: X WPM"
Option to display font settings used
Link to "Test Again"

____________________________________________________________________________________________________________________________________________________
Make It Work

Connect Frontend to Backend

POST form with WPM data
Save to database
Redirect to results page


Add Basic Styling

CSS to make text readable
Style buttons
Make it look clean


Test Locally

Run server: python manage.py runserver
Test complete flow
Verify WPM calculations
____________________________________________________________________________________________________________________________________________________
Issue #1: Project Setup

 Create Django project and app
 Set up virtual environment
 Push to GitHub

Issue #2: Database Model

 Create Result model
 Run migrations

Issue #3: Reading Test Page

 Create HTML template with text passage
 Add Start/Stop buttons
 Add basic CSS

Issue #4: Timer & WPM Calculation

 JavaScript timer
 Calculate WPM on button click
 Display result

Issue #5: Save Results

 POST form to save WPM
 Redirect to results page

Issue #6: Results Page

 Show WPM result
 Add "Test Again" link
 ____________________________________________________________________________________________________________________________________________________
5. Django Setup Video: https://www.youtube.com/watch?v=XRFpSDS0_hY 
