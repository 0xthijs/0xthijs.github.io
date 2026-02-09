import pandas as pd
import os
import sys

# Define paths
DATA_PATH = '../01-ibm-attrition/IBM_HR_Employee_Attrition.csv'

def load_data():
    file_path = os.path.join(os.path.dirname(__file__), DATA_PATH)
    return pd.read_csv(file_path)

def audit_data(df):
    print("--- Auditing Promotion Data ---")
    errors = 0
    
    # Check 1: YearsSinceLastPromotion <= YearsAtCompany
    # Logical consistency check
    invalid_promo_years = df[df['YearsSinceLastPromotion'] > df['YearsAtCompany']]
    if not invalid_promo_years.empty:
        print(f"[FAIL] Found {len(invalid_promo_years)} records where YearsSinceLastPromotion > YearsAtCompany")
        errors += 1
    else:
        print("[PASS] Logical Check: YearsSinceLastPromotion <= YearsAtCompany")

    # Check 2: Performance Rating Range
    # Should be 1-4
    invalid_ratings = df[~df['PerformanceRating'].between(1, 4)]
    if not invalid_ratings.empty:
        print(f"[FAIL] Found {len(invalid_ratings)} records with invalid PerformanceRating (expected 1-4)")
        errors += 1
    else:
        print("[PASS] Data Integrity: PerformanceRating is within 1-4 range")

    # Check 3: Attrition Column
    # Should be Yes/No
    invalid_attrition = df[~df['Attrition'].isin(['Yes', 'No'])]
    if not invalid_attrition.empty:
        print(f"[FAIL] Found {len(invalid_attrition)} records with invalid Attrition value")
        errors += 1
    else:
        print("[PASS] Data Integrity: Attrition column contains only Yes/No")

    # Result
    if errors == 0:
        print("\nAll Data Integrity Checks PASSED")
    else:
        print(f"\n{errors} Checks FAILED")
        sys.exit(1) # Fail the build/process if audit fails

if __name__ == "__main__":
    try:
        df = load_data()
        audit_data(df)
    except FileNotFoundError:
        print(f"[CRITICAL] Could not find dataset at {DATA_PATH}")
        sys.exit(1)
