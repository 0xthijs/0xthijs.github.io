# IBM Attrition Technical Documentation

## Dataset
**Source**: IBM HR Employee Attrition (Synthetic Data)
**Goal**: Analyze factors contributing to employee turnover.

### Key Columns
- `Attrition`: Target variable (Yes/No).
- `PerformanceRating`: Employee performance score (1-4).
- `YearsWithCurrManager`: Tenure with current manager.
- `PercentSalaryHike`: Percentage increase in salary.

## Scripts
- `analysis.py`: Main analysis script. Calculates KPIs and generates flight risk charts.
    - **Output**: Generates `manager-tenure.png` in `static/images/attrition/`.
- `audit_analysis.py`: Validation script used to audit the findings in the blog post.
    - **Goal**: Ensures data integrity and sample size sufficiency (>30).

## Metrics
- **High Performer Flight Risk**: Attrition rate for Top Performers (Rating 4).
- **Manager Stability**: Analysis of attrition risk during manager transitions.
