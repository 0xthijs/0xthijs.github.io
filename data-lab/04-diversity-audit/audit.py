import pandas as pd
import os
import sys

# Define paths
DATA_PATH = '../01-ibm-attrition/IBM_HR_Employee_Attrition.csv'

def load_data():
    file_path = os.path.join(os.path.dirname(__file__), DATA_PATH)
    return pd.read_csv(file_path)

def audit_data(df):
    print("--- Auditing Diversity Data ---")
    errors = 0
    
    # Check 1: Gender Values
    # Should be Female/Male (in this dataset)
    invalid_gender = df[~df['Gender'].isin(['Female', 'Male'])]
    if not invalid_gender.empty:
        print(f"[FAIL] Found {len(invalid_gender)} records with invalid Gender value")
        errors += 1
    else:
        print("[PASS] Data Integrity: Gender column contains only Female/Male")
        
    # Check 2: JobLevel Range
    # Should be 1-5
    invalid_level = df[~df['JobLevel'].between(1, 5)]
    if not invalid_level.empty:
        print(f"[FAIL] Found {len(invalid_level)} records with invalid JobLevel")
        errors += 1
    else:
        print("[PASS] Data Integrity: JobLevel is within 1-5 range")

    # Check 3: MonthlyIncome
    # Should be positive
    invalid_income = df[df['MonthlyIncome'] <= 0]
    if not invalid_income.empty:
        print(f"[FAIL] Found {len(invalid_income)} records with non-positive MonthlyIncome")
        errors += 1
    else:
        print("[PASS] Data Integrity: MonthlyIncome is positive")

    # Result
    if errors == 0:
        print("\nAll Data Integrity Checks PASSED")
    else:
        print(f"\n{errors} Checks FAILED")
        sys.exit(1)

if __name__ == "__main__":
    try:
        df = load_data()
        audit_data(df)
    except FileNotFoundError:
        print(f"[CRITICAL] Could not find dataset at {DATA_PATH}")
        sys.exit(1)
