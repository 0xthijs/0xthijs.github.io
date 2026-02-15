import pandas as pd
import numpy as np
import random
import os

# Configuration
INPUT_FILE = '../employees.csv'
DIRTY_FILE = 'employees_simulated_dirty.csv'
CLEAN_FILE = 'employees_clean_final.csv'
REPORT_FILE = 'executive_summary.txt'
RANDOM_SEED = 42

def phase_1_chaos_monkey():
    """
    PHASE 1: THE CHAOS MONKEY (Simulation)
    - Load the clean 'employees.csv'.
    - Create a copy and intentionally corrupt 5% of the data.
    - Inject specific errors as requested.
    """
    print("--- Phase 1: Chaos Monkey Started ---")
    
    if not os.path.exists(INPUT_FILE):
        print(f"Error: Input file '{INPUT_FILE}' not found.")
        return None

    try:
        df = pd.read_csv(INPUT_FILE)
    except Exception as e:
        print(f"Error reading input file: {e}")
        return None

    # Create a copy to corrupt
    df_dirty = df.copy()
    
    # Calculate number of rows to corrupt (5%)
    n_corrupt = int(len(df) * 0.05)
    print(f"Injecting errors into {n_corrupt} rows...")

    # Set seed for reproducibility
    np.random.seed(RANDOM_SEED)
    random.seed(RANDOM_SEED)

    # 1. Typos: Change 'Department' to 'Financ' or 'HumRes'
    typo_indices = np.random.choice(df_dirty.index, size=n_corrupt // 3, replace=False)
    for idx in typo_indices:
        df_dirty.at[idx, 'Department'] = random.choice(['Financ', 'HumRes'])

    # 2. Logic Errors: Make 'YearsAtCompany' 5 years LARGER than 'TotalWorkingYears'
    # We need to pick indices that are NOT already chosen if possible, 
    # but for simplicity and chaos, overlaps are fine.
    logic_indices = np.random.choice(df_dirty.index, size=n_corrupt // 3, replace=False)
    for idx in logic_indices:
        # Ensure we have valid numbers to work with
        total_working = df_dirty.at[idx, 'TotalWorkingYears']
        if pd.notna(total_working):
             df_dirty.at[idx, 'YearsAtCompany'] = total_working + 5

    # 3. Compliance Errors: Set 'Age' to -5 or 150
    compliance_indices = np.random.choice(df_dirty.index, size=n_corrupt // 3, replace=False)
    for idx in compliance_indices:
        df_dirty.at[idx, 'Age'] = random.choice([-5, 150])

    # Save corrupted file
    df_dirty.to_csv(DIRTY_FILE, index=False)
    print(f"Corrupted data saved to '{DIRTY_FILE}'")
    return DIRTY_FILE

def phase_2_governance_engine(dirty_file_path):
    """
    PHASE 2: THE GOVERNANCE ENGINE (Audit)
    - Load the 'employees_simulated_dirty.csv'.
    - Apply strict business logic to flag errors.
    - Separate data into Clean and Error DataFrames.
    """
    print("\n--- Phase 2: Governance Engine Started ---")
    
    if not dirty_file_path or not os.path.exists(dirty_file_path):
         print(f"Error: Dirty file '{dirty_file_path}' not found.")
         return None, None

    df = pd.read_csv(dirty_file_path)
    
    # Initialize Error_Reason column
    df['Error_Reason'] = ''
    
    # Business Logic 1: Valid Departments
    valid_departments = ['Sales', 'Research & Development', 'Human Resources']
    # Check if Department is NOT in the valid list
    mask_dept_invalid = ~df['Department'].isin(valid_departments)
    df.loc[mask_dept_invalid, 'Error_Reason'] += 'Invalid Department; '

    # Business Logic 2: Time Travel (YearsAtCompany > TotalWorkingYears)
    # We check if YearAtCompany > TotalWorkingYears. Handle NaNs safely if needed.
    mask_time_travel = df['YearsAtCompany'] > df['TotalWorkingYears']
    df.loc[mask_time_travel, 'Error_Reason'] += 'Tenure Logic Fail (YearsAtCompany > TotalWorkingYears); '
    
    # Business Logic 3: Age Limits (18 - 80)
    mask_age_invalid = (df['Age'] < 18) | (df['Age'] > 80)
    df.loc[mask_age_invalid, 'Error_Reason'] += 'Invalid Age (Must be 18-80); '
    
    # Clean up trailing separators
    df['Error_Reason'] = df['Error_Reason'].str.strip('; ')
    
    # Separate Clean and Error
    df_error = df[df['Error_Reason'] != ''].copy()
    df_clean = df[df['Error_Reason'] == ''].copy()
    
    # Drop the Error_Reason column from clean data (it's empty anyway)
    df_clean = df_clean.drop(columns=['Error_Reason'])

    print(f"Audit Complete. Found {len(df_error)} errors.")
    return df_clean, df_error

def phase_3_executive_reporting(df_clean, df_error):
    """
    PHASE 3: EXECUTIVE REPORTING
    - Calculate a 'Data Health Score'.
    - Generate a text file named 'executive_summary.txt'.
    - Save the clean rows to 'employees_clean_final.csv'.
    """
    print("\n--- Phase 3: Executive Reporting Started ---")
    
    if df_clean is None or df_error is None:
        print("Error: DataFrame inputs are missing.")
        return

    # Metrics
    total_rows = len(df_clean) + len(df_error)
    clean_count = len(df_clean)
    error_count = len(df_error)
    
    health_score = (clean_count / total_rows) * 100 if total_rows > 0 else 0
    
    # Error Analysis
    # We'll split the Error_Reason by '; ' to count individual error types if a row has multiple
    all_errors = df_error['Error_Reason'].str.split('; ').explode()
    error_counts = all_errors.value_counts()
    
    # Recommendation
    recommendation = "Data Healthy"
    if health_score < 98:
        recommendation = "Urgent Cleanup Needed"
    elif health_score < 100:
        recommendation = "Review Required"

    # Generate Report Content
    report_lines = [
        "EXECUTIVE DATA QUALITY REPORT",
        "=============================",
        f"Date: {pd.Timestamp.now().strftime('%Y-%m-%d')}",
        "",
        "SUMMARY METRICS",
        "---------------",
        f"Total Records Processed: {total_rows}",
        f"Clean Records:           {clean_count}",
        f"Corrupt Records:         {error_count}",
        f"Data Health Score:       {health_score:.2f}%",
        "",
        "ERROR BREAKDOWN",
        "---------------"
    ]
    
    if error_count > 0:
        for error_type, count in error_counts.items():
            report_lines.append(f"- {error_type}: {count} records")
    else:
        report_lines.append("No errors found.")
        
    report_lines.append("")
    report_lines.append("RECOMMENDATION")
    report_lines.append("--------------")
    report_lines.append(f"Assessment: {recommendation}")
    
    # Write Report
    with open(REPORT_FILE, 'w') as f:
        f.write('\n'.join(report_lines))
    
    print(f"Executive Summary saved to '{REPORT_FILE}'")
    
    # Save Clean Data
    df_clean.to_csv(CLEAN_FILE, index=False)
    print(f"Clean data saved to '{CLEAN_FILE}'")

def main():
    print("Starting HR Data Stress Test & Audit Pipeline...")
    
    # Phase 1
    dirty_file = phase_1_chaos_monkey()
    if not dirty_file:
        print("Pipeline aborted at Phase 1.")
        return

    # Phase 2
    df_clean, df_error = phase_2_governance_engine(dirty_file)
    if df_clean is None:
        print("Pipeline aborted at Phase 2.")
        return

    # Phase 3
    phase_3_executive_reporting(df_clean, df_error)
    print("\nPipeline execution finished successfully.")

if __name__ == "__main__":
    main()
