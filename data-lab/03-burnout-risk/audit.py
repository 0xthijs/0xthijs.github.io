import pandas as pd
import os
import sys

# Define paths
DATA_PATH = '../01-ibm-attrition/IBM_HR_Employee_Attrition.csv'

def load_data():
    file_path = os.path.join(os.path.dirname(__file__), DATA_PATH)
    return pd.read_csv(file_path)

def audit_data(df):
    print("--- Auditing Burnout Data ---")
    errors = 0
    
    # Check 1: WorkLifeBalance Range
    # Should be 1-4
    invalid_wlb = df[~df['WorkLifeBalance'].between(1, 4)]
    if not invalid_wlb.empty:
        print(f"[FAIL] Found {len(invalid_wlb)} records with invalid WorkLifeBalance")
        errors += 1
    else:
        print("[PASS] Data Integrity: WorkLifeBalance is within 1-4 range")

    # Check 2: OverTime Values
    # Should be Yes/No
    invalid_overtime = df[~df['OverTime'].isin(['Yes', 'No'])]
    if not invalid_overtime.empty:
        print(f"[FAIL] Found {len(invalid_overtime)} records with invalid OverTime value")
        errors += 1
    else:
        print("[PASS] Data Integrity: OverTime column contains only Yes/No")

    # Check 3: DistanceFromHome Range
    # Assume reasonable commute < 200 miles
    invalid_distance = df[df['DistanceFromHome'] > 200]
    if not invalid_distance.empty:
        print(f"[FAIL] Found {len(invalid_distance)} records with suspicious DistanceFromHome (>200)")
        errors += 1
    else:
        print("[PASS] Data Integrity: DistanceFromHome appears valid")

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
