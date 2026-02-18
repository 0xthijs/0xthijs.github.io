from database import get_db
from models import Employee, Gig

def find_matches(employee_id, db_session=None):
    """
    Find matching gigs for an employee using SQLAlchemy.
    Allows passing a db_session for testing, otherwise gets one from database.py.
    """
    if db_session is None:
        db_session = get_db()
        should_close = True
    else:
        should_close = False
    
    try:
        # Fetch employee details
        employee = db_session.query(Employee).filter(Employee.id == employee_id).first()
        
        if not employee:
            return []
        
        # Get employee skills (using helper method from model)
        emp_skills = employee.get_skills_set()
            
        is_flight_risk = employee.attrition == 'Yes'
        
        # Fetch all gigs
        gigs = db_session.query(Gig).all()
        
        matches = []
        
        for gig in gigs:
            req_skills = gig.get_skills_set()
                
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
                    "gig_id": gig.id,
                    "title": gig.title,
                    "department": gig.department,
                    "score": round(match_score, 1),
                    "required_skills": list(req_skills),
                    "common_skills": list(emp_skills.intersection(req_skills))
                })
        
        # Sort by score descending
        matches.sort(key=lambda x: x['score'], reverse=True)
        
        return matches
    finally:
        if should_close:
            db_session.remove()

if __name__ == '__main__':
    # Test with employee ID 1
    results = find_matches(1)
    print(f"Found {len(results)} matches for Employee 1:")
    for m in results[:5]:
        print(f" - {m['title']} ({m['score']}%)")
