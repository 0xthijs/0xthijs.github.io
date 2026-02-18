import sqlite3
import random
import json
from flask import Flask, render_template, g, abort, request
from database import get_db_connection
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
        'hero_title': 'Unlock Internal <span class="text-blue-600">Potential</span>',
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
        'inferred_skills': 'Inferred Skills',
        'years_tenure': 'Years Tenure',
        'view_profile': 'View Profile &rarr;',
        'attrition_warning': '⚠️ Attrition Risk Detected',
        'education': 'Education',
        'recommended_gigs': 'Recommended Gigs',
        'available': 'Available',
        'no_matches': 'No gigs matched your skills at this time. Check back later!',
        'match_score': 'Match Score',
        'matching_skills': 'Matching Skills',
        'assign_gig': 'Assign Gig',
        'assigned': 'Assigned! 🎉',
        'success_msg': 'Success! Assignments would be saved to DB in a real app.',
        'footer': '&copy; 2026 SkillFlex Internal Mobility PoC'
    },
    'nl': {
        'title': 'SkillFlex | Interne Mobiliteit',
        'hero_title': 'Ontgrendel Intern <span class="text-blue-600">Potentieel</span>',
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
        'inferred_skills': 'Vaardigheden',
        'years_tenure': 'Jaren Dienstverband',
        'view_profile': 'Bekijk Profiel &rarr;',
        'attrition_warning': '⚠️ Vertrekrisico Gedetecteerd',
        'education': 'Opleiding',
        'recommended_gigs': 'Aanbevolen Opdrachten',
        'available': 'Beschikbaar',
        'no_matches': 'Geen opdrachten gevonden die passen bij jouw vaardigheden. Kijk later nog eens!',
        'match_score': 'Match Score',
        'matching_skills': 'Overeenkomende Vaardigheden',
        'assign_gig': 'Wijs Opdracht Toe',
        'assigned': 'Toegewezen! 🎉',
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

# Close DB connection after request
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = get_db_connection()
    return db

@app.route('/')
def index():
    # Pick a random employee ID for the "View as Employee" button
    cur = get_db().cursor()
    cur.execute("SELECT id FROM employees ORDER BY RANDOM() LIMIT 1")
    row = cur.fetchone()
    random_id = row['id'] if row else 1
    return render_template('index.html', random_id=random_id)

@app.route('/dashboard')
def dashboard():
    cur = get_db().cursor()
    cur.execute("SELECT * FROM employees")
    employees = cur.fetchall()
    return render_template('dashboard.html', employees=employees)

@app.route('/employee/<int:emp_id>')
def employee(emp_id):
    cur = get_db().cursor()
    cur.execute("SELECT * FROM employees WHERE id = ?", (emp_id,))
    employee = cur.fetchone()
    
    if not employee:
        abort(404)
        
    # Get matches
    matches = find_matches(emp_id)
    
    return render_template('employee.html', employee=employee, matches=matches[:5])

if __name__ == '__main__':
    app.run(debug=True, port=8080)
