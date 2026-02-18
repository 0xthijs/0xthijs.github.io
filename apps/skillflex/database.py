from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models import Base

DB_NAME = 'sqlite:///talent.db'

engine = create_engine(DB_NAME, echo=False)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

def init_db():
    import models
    Base.metadata.create_all(bind=engine)
    print(f"Database initialized successfully with SQLAlchemy.")

def get_db():
    return db_session

def close_db(e=None):
    db_session.remove()

if __name__ == '__main__':
    init_db()
