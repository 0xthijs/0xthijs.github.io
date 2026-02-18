import pytest
import sys
import os

# Add the application directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database import Base
from models import Employee, Gig
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

@pytest.fixture(scope='function')
def db_session():
    """
    Creates a new database session for a test.
    """
    # Use in-memory SQLite for speed and isolation
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    
    Session = sessionmaker(bind=engine)
    session = Session()
    
    yield session
    
    session.close()
    
@pytest.fixture(scope='function')
def sample_data(db_session):
    """
    Populates the DB with sample data for testing.
    """
    # Employee 1: Flight Risk
    emp1 = Employee(
        name="John Doe", 
        job_role="Data Analyst",
        skills='{"hard": ["Python", "SQL"], "soft": ["Leadership"]}',
        attrition="Yes",
        flight_risk=True
    )
    
    # Employee 2: Stable
    emp2 = Employee(
        name="Jane Smith",
        job_role="Engineer",
        skills='{"hard": ["Java", "C++"], "soft": ["Teamwork"]}',
        attrition="No",
        flight_risk=False
    )
    
    # Gig 1: Python Gig
    gig1 = Gig(
        title="Python Dev",
        department="Engineering",
        required_skills='["Python", "Django"]'
    )
    
    # Gig 2: Java Gig
    gig2 = Gig(
        title="Java Dev",
        department="Engineering",
        required_skills='["Java", "Spring"]'
    )
    
    db_session.add_all([emp1, emp2, gig1, gig2])
    db_session.commit()
    
    return {"emp1_id": emp1.id, "emp2_id": emp2.id, "gig1_id": gig1.id}
