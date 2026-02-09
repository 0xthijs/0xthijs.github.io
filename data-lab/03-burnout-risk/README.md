# Burnout Risk Index

**Goal**: Proactively identify employees at risk of leaving due to burnout using a composite risk score.

## Methodology: The "Burnout Score" (0-100)
We constructed a weighted score based on known stressors:

| Factor | Condition | Weight |
| :--- | :--- | :--- |
| **Overtime** | Yes | +30 pts |
| **Work-Life Balance** | Bad (1) | +40 pts |
| **Work-Life Balance** | Good (2) | +20 pts |
| **Commute** | > 20 miles | +20 pts |
| **Stagnation** | > 4 Years No Promo | +10 pts |

## Key Findings (Analysis v1)
*Date: 2026-02-09*

> **✅ Confirmed: Burnout Predicts Attrition**
> Employees flagged as "High Risk" are **4x more likely to leave** than Low Risk employees.

| Risk Segment | Score | Count | Attrition Rate |
| :--- | :--- | :--- | :--- |
| **High Risk** | >= 60 | 64 | **39.1%** |
| **Moderate Risk** | 30-59 | 495 | **25.5%** |
| **Low Risk** | < 30 | 911 | **9.4%** |

### Recommendations
1.  **Immediate Intervention**: The 64 employees in the "High Risk" group should be prioritized for retention interviews.
2.  **Policy Review**: Review overtime policies for those with long commutes.

## Files
- `analysis.py`: Calculates score and segments employees.
- `audit.py`: Verifies input data quality.
