import sqlite3
from database import get_db_connection

def  check_db():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT count(*) FROM employees")
    count = c.fetchone()[0]
    print(f"Total employees: {count}")
    
    c.execute("SELECT * FROM employees LIMIT 5")
    rows = c.fetchall()
    for row in rows:
        print(dict(row))
    conn.close()

if __name__ == "__main__":
    check_db()
