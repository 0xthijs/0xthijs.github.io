import sqlite3
import json
import random
from database import get_db_connection

# Department templates for gigs
GIG_TEMPLATES = {
    "Sales": [
        {"title": "Q3 Market Analysis", "skills": ["Data Analysis", "Excel", "Market Research", "Communication"]},
        {"title": "Client Outreach Campaign", "skills": ["CRM", "Communication", "Salesforce", "Negotiation"]},
        {"title": "Sales Enablement Deck", "skills": ["PowerPoint", "Communication", "Presentation", "Marketing"]},
        {"title": "Competitor Analysis", "skills": ["Research", "Strategy", "Analysis", "Reporting"]}
    ],
    "R&D": [
        {"title": "Prototype Testing", "skills": ["Python", "Data Analysis", "Testing", "Problem Solving"]},
        {"title": "Lab Equipment Upgrade", "skills": ["Project Management", "Technical Writing", "Logistics"]},
        {"title": "New Product Feasibility Study", "skills": ["Research", "Innovation", "Analysis", "Technical Writing"]},
        {"title": "Patent Application Review", "skills": ["Legal", "Technical Writing", "Research", "Attention to Detail"]}
    ],
    "Human Resources": [
        {"title": "Employee Engagement Survey", "skills": ["Data Analysis", "Communication", "SurveyMonkey", "Excel"]},
        {"title": "Diversity & Inclusion Workshop", "skills": ["Presentation", "Leadership", "Empathy", "Communication"]},
        {"title": "Policy Update Review", "skills": ["Writing", "Legal", "Compliance", "Attention to Detail"]},
        {"title": "Talent Acquisition Strategy", "skills": ["Recruiting", "Strategy", "Marketing", "Analysis"]}
    ],
    "Marketing": [
        {"title": "Social Media Campaign", "skills": ["Social Media", "Content Creation", "Copywriting", "Design"]},
        {"title": "Brand Awareness Study", "skills": ["Market Research", "Analysis", "Data Visualization", "communication"]},
        {"title": "Product Launch Event", "skills": ["Event Planning", "Project Management", "Coordination", "Budgeting"]},
        {"title": "Email Marketing Automation", "skills": ["HubSpot", "Copywriting", "A/B Testing", "Data Analysis"]}
    ]
}

GENERIC_SKILLS = ["Leadership", "Time Management", "Project Management", "Communication", "Teamwork"]

def generate_gigs():
    conn = get_db_connection()
    c = conn.cursor()
    
    # Get distinct departments from employees
    c.execute("SELECT DISTINCT department FROM employees")
    departments = [row['department'] for row in c.fetchall()]
    
    print(f"Found departments: {departments}")
    
    # Clear existing gigs
    c.execute("DELETE FROM gigs")
    
    total_gigs = 20
    gigs_created = 0
    
    while gigs_created < total_gigs:
        dept = random.choice(departments)
        
        # Get a template or make a generic one
        templates = GIG_TEMPLATES.get(dept, [])
        if templates:
            template = random.choice(templates)
            title = template["title"]
            base_skills = template["skills"]
        else:
            title = f"{dept} Project {random.randint(100, 999)}"
            base_skills = ["Communication", "Problem Solving"]
            
        # Add some random generic skills
        required_skills = list(set(base_skills + random.sample(GENERIC_SKILLS, k=random.randint(1, 2))))
        
        # Estimate hours
        hours = random.choice([5, 10, 15, 20, 40])
        
        description = f"A critical project for {dept} impacting Q4 goals."
        
        c.execute('''
            INSERT INTO gigs (title, department, required_skills, estimated_hours, description)
            VALUES (?, ?, ?, ?, ?)
        ''', (title, dept, json.dumps(required_skills), hours, description))
        
        gigs_created += 1
        
    conn.commit()
    conn.close()
    print(f"Successfully generated {gigs_created} gigs.")

if __name__ == '__main__':
    generate_gigs()
