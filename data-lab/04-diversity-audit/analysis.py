import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
sns.set_theme(style="whitegrid")

# Define paths
DATA_PATH = '../01-ibm-attrition/IBM_HR_Employee_Attrition.csv'
OUTPUT_DIR = '../../static/images/diversity/'

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_data():
    file_path = os.path.join(os.path.dirname(__file__), DATA_PATH)
    return pd.read_csv(file_path)

def analyze_diversity(df):
    print("--- Diversity & Equity Audit ---")
    
    # 1. Representation by Job Level
    print("\n1. Gender Representation by Job Level:")
    gender_rep = df.groupby(['JobLevel', 'Gender']).size().unstack(fill_value=0)
    gender_rep['Total'] = gender_rep.sum(axis=1)
    gender_rep['Female %'] = (gender_rep['Female'] / gender_rep['Total']) * 100
    print(gender_rep[['Female', 'Male', 'Total', 'Female %']])
    
    # Visualization: Stacked Bar Chart of Representation
    gender_rep_pct = gender_rep[['Female', 'Male']].div(gender_rep['Total'], axis=0) * 100
    
    plt.figure(figsize=(10, 6))
    gender_rep_pct.plot(kind='bar', stacked=True, color=['#e74c3c', '#3498db'], ax=plt.gca())
    plt.title('Gender Representation by Job Level')
    plt.ylabel('Percentage')
    plt.xlabel('Job Level')
    plt.legend(title='Gender', loc='upper right')
    plt.axhline(y=50, color='black', linestyle='--', alpha=0.5)
    
    output_rep = os.path.join(OUTPUT_DIR, 'gender-representation.png')
    plt.savefig(output_rep)
    plt.close()
    print(f"Saved Representation Chart to {output_rep}")

    # 2. Adjusted Pay Gap
    # Calculate average MonthlyIncome by JobLevel and Gender
    print("\n2. Pay Gap Analysis (Monthly Income):")
    pay_gap = df.groupby(['JobLevel', 'Gender'])['MonthlyIncome'].mean().unstack()
    pay_gap['Pay Gap (M-F)'] = pay_gap['Male'] - pay_gap['Female']
    pay_gap['Pay Gap %'] = ((pay_gap['Male'] - pay_gap['Female']) / pay_gap['Male']) * 100
    
    print(pay_gap)
    
    # Visualization: Grouped Bar Chart for Pay
    plt.figure(figsize=(10, 6))
    sns.barplot(x='JobLevel', y='MonthlyIncome', hue='Gender', data=df, palette=['#e74c3c', '#3498db'], ci=None)
    plt.title('Average Monthly Income by Job Level & Gender')
    plt.ylabel('Monthly Income ($)')
    plt.xlabel('Job Level')
    
    output_pay = os.path.join(OUTPUT_DIR, 'gender-pay-gap.png')
    plt.savefig(output_pay)
    plt.close()
    print(f"Saved Pay Gap Chart to {output_pay}")

if __name__ == "__main__":
    df = load_data()
    analyze_diversity(df)
