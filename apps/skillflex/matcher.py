import sqlite3
import json
from database import get_db_connection

def find_matches(employee_id):
    conn = get_db_connection()
    c = conn.cursor()
    
    # Fetch employee details
    c.execute("SELECT * FROM employees WHERE id = ?", (employee_id,))
    employee = c.fetchone()
    
    if not employee:
        conn.close()
        return []
    
    # Parse employee skills
    try:
        emp_skills_data = json.loads(employee['skills'])
        # Handle both dict (from AI/fallback) and list (if any legacy format)
        if isinstance(emp_skills_data, dict):
            # Combine hard and soft skills for matching
            emp_skills = set(emp_skills_data.get('hard', []) + emp_skills_data.get('soft', []))
        else:
            # Fallback if just a list
            emp_skills = set(emp_skills_data)
    except json.JSONDecodeError:
        emp_skills = set()
        
    is_flight_risk = employee['attrition'] == 'Yes'
    
    # Fetch all gigs
    c.execute("SELECT * FROM gigs")
    gigs = c.fetchall()
    
    matches = []
    
    for gig in gigs:
        try:
            req_skills = set(json.loads(gig['required_skills']))
        except json.JSONDecodeError:
            req_skills = set()
            
        if not req_skills:
            match_score = 0
        else:
            # Calculate Jaccard similarity or simple overlap
            common = emp_skills.intersection(req_skills)
            match_score = (len(common) / len(req_skills)) * 100
        
        # Boost for flight risk
        if is_flight_risk:
            match_score += 15 # Boost score to surface more opportunities
            
        # Cap at 100
        match_score = min(100, match_score)
        
        # Only return relevant matches
        if match_score > 0:
            matches.append({
                "gig_id": gig['id'],
                "title": gig['title'],
                "department": gig['department'],
                "score": round(match_score, 1),
                "required_skills": list(req_skills),
                "common_skills": list(emp_skills.intersection(req_skills))
            })
    
    conn.close()
    
    # Sort by score descending
    matches.sort(key=lambda x: x['score'], reverse=True)
    
    return matches

if __name__ == '__main__':
    # Test with employee ID 1
    results = find_matches(1)
    print(f"Found {len(results)} matches for Employee 1:")
    for m in results[:5]:
        print(f" - {m['title']} ({m['score']}%)")
