import pandas as pd
import json
import os
import time
import random
import google.generativeai as genai
from database import init_db, get_db
from models import Employee
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# Fake names for the dataset since it lacks them
FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"]
LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]

def generate_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"

def infer_skills(role, department, education):
    """
    Uses Gemini to infer 5 hard skills and 3 soft skills.
    Returns a JSON object: {"hard": [...], "soft": [...]}
    """
    if not api_key:
        # Fallback if no API key
        return json.dumps({
            "hard": ["Generic Skill 1", "Generic Skill 2", "Generic Skill 3", "Generic Skill 4", "Generic Skill 5"],
            "soft": ["Communication", "Teamwork", "Problem Solving"]
        })

    prompt = f"""
    You are an expert HR Python script. 
    For an employee with:
    - Role: {role}
    - Department: {department}
    - Education: {education}
    
    Output ONLY a raw JSON object (no markdown formatting) with exactly 5 "hard" skills and 3 "soft" skills relevant to their profile.
    Example format:
    {{"hard": ["Excel", "Python", "Data Analysis", "SQL", "Tableau"], "soft": ["Leadership", "Communication", "Empathy"]}}
    """
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            if text.endswith("```"):
                text = text.rsplit("\n", 1)[0]
        return text
    except Exception as e:
        print(f"Error inferring skills for {role}: {e}")
        return json.dumps({"hard": [], "soft": []})

def ingest_data():
    print("Initializing database...")
    init_db()
    
    # Path to the REAL dataset
    csv_path = r"C:\Users\thijs\Documents\GitHub\hr-ai-portfolio\data-lab\employees.csv"
    print(f"Reading CSV from {csv_path}...")
    
    try:
        df = pd.read_csv(csv_path)
    except FileNotFoundError:
        print(f"Error: {csv_path} not found.")
        return

    session = get_db()
    
    # Check if data already exists to avoid duplicates on re-run
    session.query(Employee).delete()
    # Reset Auto increment is handled by DB recreation mostly, or simply ignore for ORM
    session.commit()
    print("Cleared existing employee data.")

    # Limit to first 20-30 rows for PoC speed if dataset is huge
    df_subset = df.head(50)
    print(f"Processing {len(df_subset)} employees (subset of {len(df)})...")
    
    for _, row in df_subset.iterrows():
        name = generate_name() # Dataset has no name column
        role = row['JobRole']
        dept = row['Department']
        edu = row['EducationField']
        years = row['YearsAtCompany']
        attrition = row['Attrition']
        
        print(f"Enriching profile for: {name} ({role})...")
        skills_json = infer_skills(role, dept, edu)
        
        flight_risk = (attrition == 'Yes')
        
        employee = Employee(
            name=name,
            job_role=role,
            department=dept,
            education_field=edu,
            years_at_company=int(years),
            attrition=attrition,
            skills=skills_json,
            flight_risk=flight_risk
        )
        session.add(employee)
        
        # Rate limiting
        time.sleep(1)

    session.commit()
    session.remove()
    print("Ingestion complete!")

if __name__ == '__main__':
    ingest_data()
