import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
sns.set_theme(style="whitegrid")

# Define paths
DATA_PATH = '../01-ibm-attrition/IBM_HR_Employee_Attrition.csv'
OUTPUT_DIR = '../../static/images/promotion/'

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def load_data():
    # Load dataset from the central location
    file_path = os.path.join(os.path.dirname(__file__), DATA_PATH)
    return pd.read_csv(file_path)

def analyze_promotion_velocity(df):
    # exact mapping for Attrition
    df['Attrition_Numeric'] = df['Attrition'].apply(lambda x: 1 if x == 'Yes' else 0)

    # 1. Define "Stagnation"
    # High Performers (3 or 4) who haven't been promoted in > 2 years
    df['Is_High_Performer'] = df['PerformanceRating'] >= 3
    df['Is_Stagnant'] = (df['Is_High_Performer']) & (df['YearsSinceLastPromotion'] > 2)

    stagnant_count = df['Is_Stagnant'].sum()
    total_high_performers = df['Is_High_Performer'].sum()
    stagnation_rate = stagnant_count / total_high_performers

    print(f"--- Promotion Velocity Analysis ---")
    print(f"Total High Performers: {total_high_performers}")
    print(f"Stagnant High Performers (>2 yrs no promo): {stagnant_count}")
    print(f"Stagnation Rate: {stagnation_rate:.2%}")

    # 2. Attrition Risk of Stagnation
    avg_attrition = df['Attrition_Numeric'].mean()
    stagnant_attrition = df[df['Is_Stagnant']]['Attrition_Numeric'].mean()
    non_stagnant_hp_attrition = df[(df['Is_High_Performer']) & (~df['Is_Stagnant'])]['Attrition_Numeric'].mean()

    print(f"\nGlobal Attrition Rate: {avg_attrition:.2%}")
    print(f"Stagnant High Performer Attrition: {stagnant_attrition:.2%}")
    print(f"Propelled High Performer Attrition: {non_stagnant_hp_attrition:.2%}")

    # 3. Visualization: Heatmap of Attrition
    # Pivot table: Performance Rating vs Years Since Last Promotion
    pivot_table = df.pivot_table(
        values='Attrition_Numeric', 
        index='YearsSinceLastPromotion', 
        columns='PerformanceRating', 
        aggfunc='mean'
    )

    plt.figure(figsize=(10, 8))
    sns.heatmap(pivot_table, annot=True, fmt=".0%", cmap="Reds", cbar_kws={'label': 'Attrition Probability'})
    plt.title('Attrition Risk: Performance vs. Promotion Stagnation')
    plt.ylabel('Years Since Last Promotion')
    plt.xlabel('Performance Rating')
    
    output_file = os.path.join(OUTPUT_DIR, 'promotion-stagnation.png')
    plt.savefig(output_file)
    plt.close()
    print(f"\nSaved Heatmap to {output_file}")
    
    return {
        "stagnation_rate": stagnation_rate,
        "stagnant_attrition": stagnant_attrition
    }

if __name__ == "__main__":
    df = load_data()
    analyze_promotion_velocity(df)
