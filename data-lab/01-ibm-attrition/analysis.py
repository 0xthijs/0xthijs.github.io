import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
sns.set_theme(style="whitegrid")

# Define paths
DATA_PATH = 'data-lab/IBM_HR_Employee_Attrition.csv'
OUTPUT_DIR = 'static/images/attrition/'

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_data():
    return pd.read_csv(DATA_PATH)

def calculate_kpis(df):
    # exact mapping for Attrition to numeric for simpler calculation
    df['Attrition_Numeric'] = df['Attrition'].apply(lambda x: 1 if x == 'Yes' else 0)
    
    # 1. High-Performer Flight Risk
    high_performers = df[df['PerformanceRating'] >= 4]
    avg_attrition = df['Attrition_Numeric'].mean()
    hp_attrition = high_performers['Attrition_Numeric'].mean()
    
    print(f"Global Attrition Rate: {avg_attrition:.2%}")
    print(f"High Performer Attrition Rate: {hp_attrition:.2%}")
    
    # 2. Manager Stability
    manager_stability = df.groupby('YearsWithCurrManager')['Attrition_Numeric'].mean()
    print("\nManager Stability (Attrition Rate by Years with Manager):")
    print(manager_stability)
    
    # Generate Chart
    plt.figure(figsize=(10, 6))
    sns.barplot(x=manager_stability.index, y=manager_stability.values, color='steelblue')
    plt.title('Attrition Rate by Years with Current Manager')
    plt.xlabel('Years with Current Manager')
    plt.ylabel('Attrition Rate')
    plt.axhline(y=avg_attrition, color='r', linestyle='--', label='Global Average')
    plt.legend()
    plt.savefig(os.path.join(OUTPUT_DIR, 'manager-tenure.png'))
    plt.close()
    print(f"\nSaved chart to {os.path.join(OUTPUT_DIR, 'manager-tenure.png')}")

    # 3. Compensation Gap
    comp_gap = df.groupby('Attrition')['PercentSalaryHike'].mean()
    print("\nCompensation Gap (Average Percent Salary Hike):")
    print(comp_gap)

if __name__ == "__main__":
    df = load_data()
    calculate_kpis(df)
