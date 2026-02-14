import streamlit as st
import pandas as pd
import plotly.express as px
import google.generativeai as genai
import os

# --- Configuration ---
st.set_page_config(page_title="Critical Talent Risk Radar", layout="wide")

# --- Constants & Rules ---
CRITICAL_JOB_LEVEL = 3
CRITICAL_PERF_RATING = 3
RISK_SATISFACTION_THRESHOLD = 2
RISK_WLB_THRESHOLD = 2

# --- Helper Functions ---
@st.cache_data
def load_data():
    csv_path = "IBM_HR_Employee_Attrition.csv"
    if not os.path.exists(csv_path):
        st.error(f"Dataset not found at {csv_path}. Please ensure 'employees.csv' is in the application directory.")
        return pd.DataFrame()
    
    df = pd.read_csv(csv_path)
    return df

def filter_critical_talent(df):
    """
    Filter for employees where JobLevel >= 3 AND PerformanceRating >= 3.
    """
    mask = (df['JobLevel'] >= CRITICAL_JOB_LEVEL) & (df['PerformanceRating'] >= CRITICAL_PERF_RATING)
    return df[mask]

def flag_flight_risk(df):
    """
    Flag employees where JobSatisfaction <= 2 OR WorkLifeBalance <= 2.
    """
    mask = (df['JobSatisfaction'] <= RISK_SATISFACTION_THRESHOLD) | (df['WorkLifeBalance'] <= RISK_WLB_THRESHOLD)
    return df[mask]

def get_gemini_response(prompt):
    """
    Calls Google Gemini API to generate retention strategy.
    """
    api_key = st.secrets.get("GEMINI_API_KEY")
    if not api_key:
        st.warning("⚠️ GEMINI_API_KEY not found in secrets. Please set it in .streamlit/secrets.toml to use AI features.")
        return None
    
    try:
        genai.configure(api_key=api_key)
        # Using gemini-flash-latest which usually points to the current stable Flash model (likely 1.5 Flash)
        # This one typically has better free tier availability than 2.0-flash-preview
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        if "429" in str(e) or "quota" in str(e).lower():
            st.error("⚠️ Gemini API Quota Exceeded. Please try again in a minute or check your plan.")
        else:
            st.error(f"Error calling Gemini API: {e}")
        return None

# --- Main App ---
def main():
    # --- Header ---
    st.title("🛡️ Critical Talent Risk Radar")
    st.markdown("""
    **Methodology:**
    1.  **Critical Talent:** Employees with `JobLevel >= 3` AND `PerformanceRating >= 3` (High Value).
    2.  **Flight Risk:** Within that pool, employees with `JobSatisfaction <= 2` OR `WorkLifeBalance <= 2`.
    """)
    st.divider()

    # --- Data Loading ---
    df = load_data()
    if df.empty:
        return

    # --- Sidebar Filters ---
    st.sidebar.header("Filters")
    departments = ["All"] + sorted(df['Department'].unique().tolist())
    selected_dept = st.sidebar.selectbox("Department", departments)

    # Apply Filters
    filtered_df = df.copy()
    if selected_dept != "All":
        filtered_df = filtered_df[filtered_df['Department'] == selected_dept]

    # --- Logic Calculation ---
    critical_talent_df = filter_critical_talent(filtered_df)
    at_risk_df = flag_flight_risk(critical_talent_df)

    # Counts
    total_critical = len(critical_talent_df)
    at_risk_count = len(at_risk_df)
    at_risk_pct = (at_risk_count / total_critical * 100) if total_critical > 0 else 0

    # --- Metrics Row ---
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Critical Talent", total_critical)
    col2.metric("At-Risk Count", at_risk_count, delta_color="inverse")
    col3.metric("At-Risk %", f"{at_risk_pct:.1f}%")

    # --- Visuals ---
    st.subheader("At-Risk Count by Job Role")
    if not at_risk_df.empty:
        role_counts = at_risk_df['JobRole'].value_counts().reset_index()
        role_counts.columns = ['JobRole', 'Count']
        
        fig = px.bar(role_counts, x='JobRole', y='Count', 
                     title=f"At-Risk Employees in {selected_dept}",
                     text_auto=True, color='Count', color_continuous_scale='Reds')
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No At-Risk employees found matching criteria.")

    # --- Data Table ---
    st.subheader("At-Risk Employee Details")
    if not at_risk_df.empty:
        # Show relevant columns, hide sensitive personally identifiable info if needed
        # (Dataset usually has generic IDs, but usually good practice to limit view)
        display_cols = ['EmployeeNumber', 'JobRole', 'Department', 'MonthlyIncome', 
                        'YearsAtCompany', 'JobSatisfaction', 'WorkLifeBalance', 
                        'JobLevel', 'PerformanceRating']
        # Intersect with available columns
        cols_to_show = [c for c in display_cols if c in at_risk_df.columns]
        st.dataframe(at_risk_df[cols_to_show], hide_index=True)
    
    # --- AI Agent Feature ---
    st.divider()
    st.subheader("🤖 AI Retention Strategy Agent")
    
    if st.button("Generate Retention Strategy"):
        if at_risk_df.empty:
            st.warning("No at-risk employees to analyze.")
        else:
            with st.spinner("Analyzing risk profile and generating strategy..."):
                # Construct Summary
                dept_context = f"Department: {selected_dept}" if selected_dept != "All" else "All Departments"
                
                # Group by job role for the prompt
                risk_summary = at_risk_df['JobRole'].value_counts().to_string()
                
                # Identify main pain points
                low_sat = len(at_risk_df[at_risk_df['JobSatisfaction'] <= RISK_SATISFACTION_THRESHOLD])
                low_wlb = len(at_risk_df[at_risk_df['WorkLifeBalance'] <= RISK_WLB_THRESHOLD])
                
                prompt = f"""
                You are an Organizational Development Expert.
                
                Context:
                We are analyzing "Critical Talent" (High Job Level & High Performance) who are at risk of leaving.
                Scope: {dept_context}
                Total At-Risk Count: {at_risk_count}
                
                Breakdown by Role:
                {risk_summary}
                
                Risk Factors:
                - {low_sat} employees have Low Job Satisfaction.
                - {low_wlb} employees have Poor Work-Life Balance.
                
                Task:
                Based on this risk profile, draft a 3-point retention plan. 
                Focus on structural changes (policy, autonomy, workload), not perks (pizza parties). 
                Be concise and executive.
                """
                
                response_text = get_gemini_response(prompt)
                
                if response_text:
                    st.success("Strategy Generated!")
                    st.markdown(response_text)

if __name__ == "__main__":
    main()
