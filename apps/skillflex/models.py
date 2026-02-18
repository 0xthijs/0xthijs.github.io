from sqlalchemy import Column, Integer, String, Boolean, Text
from sqlalchemy.orm import declarative_base
import json

Base = declarative_base()

class Employee(Base):
    __tablename__ = 'employees'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    job_role = Column(String, nullable=False)
    department = Column(String)
    education_field = Column(String)
    years_at_company = Column(Integer)
    attrition = Column(String)
    skills = Column(Text)  # JSON string
    flight_risk = Column(Boolean, default=False)

    def get_skills_set(self):
        """Helper to parse JSON skills into a set."""
        try:
            data = json.loads(self.skills)
            if isinstance(data, dict):
                 return set(data.get('hard', []) + data.get('soft', []))
            return set(data)
        except (json.JSONDecodeError, TypeError):
            return set()

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Gig(Base):
    __tablename__ = 'gigs'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    department = Column(String, nullable=False)
    required_skills = Column(Text)  # JSON string
    estimated_hours = Column(Integer)
    description = Column(Text)

    def get_skills_set(self):
        try:
            return set(json.loads(self.required_skills))
        except (json.JSONDecodeError, TypeError):
            return set()

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
