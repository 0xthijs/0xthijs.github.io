import json
from flask import Flask, render_template, g, abort, request
from database import get_db, close_db
from models import Employee
from matcher import find_matches

app = Flask(__name__)

# Register custom filter for Jinja2
@app.template_filter('from_json')
def from_json_filter(s):
    try:
        return json.loads(s)
    except:
        return []

# Translations
TRANSLATIONS = {
    'en': {
        'title': 'SkillFlex | Internal Mobility',
        'hero_title': 'Unlock Internal <span class="text-indigo-600 dark:text-indigo-400">Potential</span>',
        'hero_subtitle': 'Match the right talent to the right opportunities. Data-driven mobility for a dynamic workforce.',
        'view_manager': 'View as Manager',
        'view_manager_desc': 'Access the HR Dashboard. Identify flight risks, view talent distribution, and manage open gigs.',
        'view_employee': 'View as Employee',
        'view_employee_desc': 'Explore your personalized dashboard. See recommended gigs based on your skills and career goals.',
        'dashboard_title': 'Talent Dashboard',
        'dashboard_desc': 'Overview of {} employees and their retention risk.',
        'high_risk': 'High Risk',
        'stable': 'Stable',
        'flight_risk': 'Flight Risk',
        'department': 'Department',
        'inferred_skills': 'Top Skills',
        'years_tenure': 'Years',
        'view_profile': 'View Profile &rarr;',
        'attrition_warning': '⚠️ Attrition Risk Detected',
        'education': 'Education',
        'recommended_gigs': 'Recommended Gigs',
        'available': 'Available',
        'no_matches': 'No gigs matched your skills at this time. Check back later!',
        'match_score': 'Match Score',
        'matching_skills': 'Matching Skills',
        'assign_gig': 'Apply Now',
        'assigned': 'Applied! 🎉',
        'success_msg': 'Success! Assignments would be saved to DB in a real app.',
        'footer': '&copy; 2026 SkillFlex Internal Mobility PoC'
    },
    'nl': {
        'title': 'SkillFlex | Interne Mobiliteit',
        'hero_title': 'Ontgrendel Intern <span class="text-indigo-600 dark:text-indigo-400">Potentieel</span>',
        'hero_subtitle': 'Koppel het juiste talent aan de juiste kansen. Datagedreven mobiliteit voor een dynamisch personeelsbestand.',
        'view_manager': 'Bekijk als Manager',
        'view_manager_desc': 'Toegang tot het HR-dashboard. Identificeer vertrekrisico\'s, bekijk talentverdeling en beheer open opdrachten.',
        'view_employee': 'Bekijk als Werknemer',
        'view_employee_desc': 'Verken je persoonlijke dashboard. Bekijk aanbevolen opdrachten op basis van je vaardigheden en carrièredoelen.',
        'dashboard_title': 'Talent Dashboard',
        'dashboard_desc': 'Overzicht van {} werknemers en hun behoudsrisico.',
        'high_risk': 'Hoog Risico',
        'stable': 'Stabiel',
        'flight_risk': 'Vertrekrisico',
        'department': 'Afdeling',
        'inferred_skills': 'Top Vaardigheden',
        'years_tenure': 'Jaren',
        'view_profile': 'Bekijk Profiel &rarr;',
        'attrition_warning': '⚠️ Vertrekrisico Gedetecteerd',
        'education': 'Opleiding',
        'recommended_gigs': 'Aanbevolen Opdrachten',
        'available': 'Beschikbaar',
        'no_matches': 'Geen opdrachten gevonden die passen bij jouw vaardigheden. Kijk later nog eens!',
        'match_score': 'Match Score',
        'matching_skills': 'Overeenkomende Vaardigheden',
        'assign_gig': 'Solliciteer Nu',
        'assigned': 'Gesolliciteerd! 🎉',
        'success_msg': 'Succes! Toewijzingen zouden in een echte app worden opgeslagen.',
        'footer': '&copy; 2026 SkillFlex Interne Mobiliteit PoC'
    }
}

def get_locale():
    return request.args.get('lang', 'en')

@app.context_processor
def inject_conf_var():
    lang = get_locale()
    return dict(
        lang=lang,
        t=TRANSLATIONS.get(lang, TRANSLATIONS['en'])
    )

@app.teardown_appcontext
def shutdown_session(exception=None):
    close_db()

@app.route('/')
def index():
    # Pick a random employee ID for the "View as Employee" button
    # Using SQLAlchemy func.random() is one way, but simpler here to just get all IDs and pick one logic-side if small, 
    # or use order_by(func.random()) if we import func.
    # For PoC, let's just grab the first one or a specific one to avoid complex imports not in models yet
    session = get_db()
    # Simple random fetch via query might differ by DB, but let's just get the first for safety or ID 1
    employee = session.query(Employee).first()
    random_id = employee.id if employee else 1
    return render_template('index.html', random_id=random_id)

@app.route('/dashboard')
def dashboard():
    session = get_db()
    employees = session.query(Employee).all()
    return render_template('dashboard.html', employees=employees)

@app.route('/employee/<int:emp_id>')
def employee(emp_id):
    session = get_db()
    employee = session.query(Employee).filter(Employee.id == emp_id).first()
    
    if not employee:
        abort(404)
        
    # Get matches
    matches = find_matches(emp_id)
    
    return render_template('employee.html', employee=employee, matches=matches[:5])

if __name__ == '__main__':
    app.run(debug=True, port=8080)
