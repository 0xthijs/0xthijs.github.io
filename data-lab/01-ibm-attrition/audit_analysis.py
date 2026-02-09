import pandas as pd
import sys

# Define path
DATA_PATH = 'data-lab/IBM_HR_Employee_Attrition.csv'

def load_data():
    return pd.read_csv(DATA_PATH)

def audit_kpis(df):
    df['Attrition_Numeric'] = df['Attrition'].apply(lambda x: 1 if x == 'Yes' else 0)
    
    print("--- Audit Report ---")
    
    # 1. High-Performer Flight Risk
    high_performers = df[df['PerformanceRating'] >= 4]
    hp_count = len(high_performers)
    hp_attrition = high_performers['Attrition_Numeric'].mean()
    
    print(f"\n[High Performers (Rating >= 4)]")
    print(f"Sample Size: {hp_count}")
    print(f"Attrition Rate: {hp_attrition:.4f} ({hp_attrition:.2%})")
    if hp_count < 30:
        print("WARNING: Sample size < 30")
        
    global_attrition = df['Attrition_Numeric'].mean()
    print(f"Global Attrition Rate: {global_attrition:.4f} ({global_attrition:.2%})")

    # 2. Manager Stability (Focus on 0 years)
    width_manager_0 = df[df['YearsWithCurrManager'] == 0]
    wm0_count = len(width_manager_0)
    wm0_attrition = width_manager_0['Attrition_Numeric'].mean()
    
    print(f"\n[Manager Stability (YearsWithCurrManager == 0)]")
    print(f"Sample Size: {wm0_count}")
    print(f"Attrition Rate: {wm0_attrition:.4f} ({wm0_attrition:.2%})")
    if wm0_count < 30:
        print("WARNING: Sample size < 30")

    # 3. Compensation Gap
    print("\n[Compensation Gap]")
    comp_gap = df.groupby('Attrition')['PercentSalaryHike'].mean()
    print(comp_gap)
    
    count_yes = len(df[df['Attrition'] == 'Yes'])
    count_no = len(df[df['Attrition'] == 'No'])
    print(f"Sample Size (Attrition=Yes): {count_yes}")
    print(f"Sample Size (Attrition=No): {count_no}")


if __name__ == "__main__":
    try:
        df = load_data()
        audit_kpis(df)
    except FileNotFoundError:
        print(f"Error: File not found at {DATA_PATH}")
    except Exception as e:
        print(f"An error occurred: {e}")
