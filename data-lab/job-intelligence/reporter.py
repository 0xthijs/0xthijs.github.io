import pandas as pd
from datetime import datetime
import os
import json
import html

class JobReporter:
    def __init__(self, output_dir='.'):
        self.output_dir = output_dir

    def generate_report(self, jobs):
        if not jobs:
            print("No jobs to report.")
            return

        df = pd.DataFrame(jobs)
        
        # Deduplication Logic
        # 1. Remove exact duplicates based on Link
        df.drop_duplicates(subset=['link'], keep='first', inplace=True)
        
        # 2. Fuzzy Deduplication (Title + Company) - simplistic approach
        df['dedup_key'] = df['title'].str.lower() + "_" + df['company'].str.lower()
        df.drop_duplicates(subset=['dedup_key'], keep='first', inplace=True)
        
        # Filter: Keep only those meeting criteria (from Analyzer)
        # Assuming 'meets_criteria' is in the dictionary from analyzer
        if 'meets_criteria' in df.columns:
            filtered_df = df[df['meets_criteria'] == True]
        else:
             filtered_df = df # If analyzer skipped, show all? Or fail open?
             
        if filtered_df.empty:
            print("No jobs met the criteria after analysis.")
            return

        # Prepare Markdown Content
        date_str = datetime.now().strftime("%Y-%m-%d")
        filename = os.path.join(self.output_dir, f"Weekly_Job_Report_{date_str}.md")
        
        markdown_content = f"# Weekly Job Report - {date_str}\n\n"
        markdown_content += f"Found {len(filtered_df)} relevant positions.\n\n"
        
        if not filtered_df.empty:
            first_analysis = filtered_df.iloc[0].get('analysis')
            print(f"DEBUG: First job analysis keys: {first_analysis}")

        # Create Table
        table_columns = ['Title', 'Company', 'Source', 'Link', 'Salary', 'Language', 'Is Recruiter', 'Note']
        
        # Standardize for display and Sanitize
        def sanitize(text):
            if not isinstance(text, str):
                return str(text)
            return html.escape(text).replace('[', '\\[').replace(']', '\\]')

        filtered_df['Title'] = filtered_df['title'].apply(sanitize)
        filtered_df['Company'] = filtered_df['company'].apply(sanitize)
        filtered_df['Source'] = filtered_df['source'].apply(sanitize)
        # Link is assumed to be a valid URL, but we should be careful. 
        # Markdown link syntax is [text](url). We already escape text in Title/Company.
        # For the URL part, we trust it's a URL, but we can at least ensure it doesn't break out.
        filtered_df['Link'] = filtered_df['link'].apply(lambda x: f"[Apply]({x})")
        
        def safe_get_analysis(row, key):
             if isinstance(row.get('analysis'), dict):
                 return row['analysis'].get(key, 'N/A')
             return 'N/A'
             
        filtered_df['Salary'] = filtered_df.apply(lambda row: safe_get_analysis(row, 'salary'), axis=1)
        filtered_df['Language'] = filtered_df.apply(lambda row: safe_get_analysis(row, 'is_target_language'), axis=1)
        filtered_df['Is Recruiter'] = filtered_df.apply(lambda row: safe_get_analysis(row, 'is_recruitment_role'), axis=1)
        filtered_df['Note'] = filtered_df.apply(lambda row: "Senior" if safe_get_analysis(row, 'is_senior') else "Salary Met", axis=1)

        final_table = filtered_df[['Title', 'Company', 'Source', 'Link', 'Salary', 'Language', 'Is Recruiter', 'Note']]
        
        markdown_table = final_table.to_markdown(index=False)
        markdown_content += markdown_table
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
            
        print(f"Report generated: {filename}")
