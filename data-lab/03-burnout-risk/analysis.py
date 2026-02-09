import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
sns.set_theme(style="whitegrid")

# Define paths
DATA_PATH = '../01-ibm-attrition/IBM_HR_Employee_Attrition.csv'
OUTPUT_DIR = '../../static/images/burnout/'

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_data():
    file_path = os.path.join(os.path.dirname(__file__), DATA_PATH)
    return pd.read_csv(file_path)

def analyze_burnout_risk(df):
    print("--- Burnout Risk Analysis ---")
    
    # exact mapping for Attrition
    df['Attrition_Numeric'] = df['Attrition'].apply(lambda x: 1 if x == 'Yes' else 0)

    # 1. Construct Burnout Score (0-100)
    # Factors:
    # - OverTime: Yes (+30)
    # - WorkLifeBalance: 1 (Bad) -> +40, 2 -> +20, 3 -> +0, 4 -> -10
    # - DistanceFromHome: > 20 miles (+20)
    # - YearsSinceLastPromotion: > 5 (+10)
    
    def calculate_burnout_score(row):
        score = 0
        if row['OverTime'] == 'Yes':
            score += 30
        
        if row['WorkLifeBalance'] == 1:
            score += 40
        elif row['WorkLifeBalance'] == 2:
            score += 20
        # Levels 3 and 4 are neutral/protective
        
        if row['DistanceFromHome'] > 20:
            score += 20
            
        if row['YearsSinceLastPromotion'] > 4:
            score += 10
            
        return min(score, 100) # Cap at 100

    df['Burnout_Score'] = df.apply(calculate_burnout_score, axis=1)

    # 2. Risk Segments
    def segment_risk(score):
        if score >= 60: return 'High Risk'
        if score >= 30: return 'Moderate Risk'
        return 'Low Risk'

    df['Risk_Segment'] = df['Burnout_Score'].apply(segment_risk)
    
    # 3. Correlation with Attrition
    risk_attrition = df.groupby('Risk_Segment')['Attrition_Numeric'].agg(['mean', 'count'])
    risk_attrition.columns = ['Attrition Rate', 'Employee Count']
    risk_attrition = risk_attrition.sort_values('Attrition Rate', ascending=False)
    
    print("\nAttrition by Burnout Risk Segment:")
    print(risk_attrition)
    
    # 4. Visualization
    plt.figure(figsize=(10, 6))
    sns.barplot(x=risk_attrition.index, y=risk_attrition['Attrition Rate'], palette='magma')
    plt.title('Attrition Rate by Calculated Burnout Risk')
    plt.ylabel('Attrition Rate')
    plt.xlabel('Burnout Risk Segment')
    plt.axhline(y=df['Attrition_Numeric'].mean(), color='black', linestyle='--', label='Global Average')
    plt.legend()
    
    output_file = os.path.join(OUTPUT_DIR, 'burnout-risk.png')
    plt.savefig(output_file)
    plt.close()
    print(f"\nSaved Chart to {output_file}")

if __name__ == "__main__":
    df = load_data()
    analyze_burnout_risk(df)
