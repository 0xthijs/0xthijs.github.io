import sqlite3
import json

DB_NAME = 'talent.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    
    # Employees Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            job_role TEXT NOT NULL,
            department TEXT,
            education_field TEXT,
            years_at_company INTEGER,
            attrition TEXT,
            skills TEXT,  -- JSON string of inferred skills
            flight_risk BOOLEAN DEFAULT 0
        )
    ''')
    
    # Gigs Table
    c.execute('''
        CREATE TABLE IF NOT EXISTS gigs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            department TEXT NOT NULL,
            required_skills TEXT, -- JSON string
            estimated_hours INTEGER,
            description TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database {DB_NAME} initialized successfully.")

if __name__ == '__main__':
    init_db()
