# SkillFlex: AI-Powered Internal Mobility

SkillFlex is an AI-driven Internal Talent Marketplace designed to improve employee retention by matching employees to internal gigs and opportunities based on their skills and flight risk status.

## Key Features
*   **AI-Powered Matching**: Uses Jaccard Similarity to match employee skills with gig requirements.
*   **Retention Focus**: "Flight Risk" employees receive a matching boost to encourage internal mobility over external churn.
*   **Premium SaaS UI**: Modern, responsive interface with Dark Mode support and glassmorphism aesthetics.
*   **Data-Driven**: Built on SQLAlchemy ORM for robust data management.

## Tech Stack
*   **Backend**: Python, Flask, SQLAlchemy
*   **Frontend**: HTML, TailwindCSS (via CDN), Alpine.js interaction concepts
*   **AI/Data**: Pandas, Google Gemini (for skill extraction pipeline)
*   **Testing**: Pytest

## Setup & Running

1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Initialize Database**:
    (The app automatically initializes the SQLite database on first run if it doesn't exist, but you can force ingestion if needed by running `python ingestion.py`)

3.  **Run the Application**:
    ```bash
    python app.py
    ```

4.  **Access the App**:
    Open your browser to `http://127.0.0.1:8080`

## Testing

Run the automated test suite to verify the matching logic:
```bash
python -m pytest
```

## Project Structure
*   `app.py`: Main Flask application entry point.
*   `models.py`: Database schema (Employee, Gig).
*   `matcher.py`: Core matching logic engine.
*   `ingestion.py`: Script to load data from CSVs and infer skills.
*   `templates/`: HTML templates for the UI.
