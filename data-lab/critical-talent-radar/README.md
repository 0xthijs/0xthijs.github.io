# 🛡️ Critical Talent Risk Radar

A Streamlit application designed to identify high-value employees at risk of attrition and generate AI-driven retention strategies.

## 🎯 Goal
To help HR professionals proactively retain "Critical Talent" (High Performance & High Job Level) who show signs of "Flight Risk" (Low Satisfaction or Poor Work-Life Balance).

## 🛠️ Features
-   **Risk Dashboard**: Visualizes "At-Risk" counts by Job Role and Department.
-   **Critical Talent Filter**: Automatically segments employees with `JobLevel >= 3` and `PerformanceRating >= 3`.
-   **Flight Risk Detection**: Flags employees with `JobSatisfaction <= 2` or `WorkLifeBalance <= 2`.
-   **AI Retention Strategies**: Uses **Google Gemini AI** to draft executive-level retention plans based on the specific risk profile of the selected group.

## 🚀 How to Run
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/critical-talent-radar.git
    cd critical-talent-radar
    ```

2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Setup Secrets**:
    Rename `.streamlit/secrets.toml.example` to `.streamlit/secrets.toml` and add your Google Gemini API key:
    ```toml
    GEMINI_API_KEY = "your_api_key_here"
    ```

4.  **Run the App**:
    ```bash
    streamlit run app.py
    ```

## 📊 Dataset
Uses the IBM HR Analytics Employee Attrition & Performance dataset.
