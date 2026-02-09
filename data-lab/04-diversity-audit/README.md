# Diversity & Equity Audit

**Goal**: Evaluate fair representation and pay equity across the organization.

## Methodology
1.  **Representation**: Percentage of female employees at each `JobLevel` (1=Entry, 5=Exec).
2.  **Adjusted Pay Gap**: Comparing Average `MonthlyIncome` between Male and Female employees *within the same Job Level*.

## Key Findings (Analysis v1)
*Date: 2026-02-09*

> **✅ Equal Pay Achieved**
> The adjusted pay gap is negligible (< 2%) across all job levels. At Job Level 3, women actually earn slightly more than men.

> **⚠️ Representation Gaps**
> Women are underrepresented at both the **Entry Level (36%)** and **Executive Level (34%)**.

| Job Level | Female % | Pay Gap (Male - Female) | Status |
| :--- | :--- | :--- | :--- |
| **1 (Entry)** | 36.6% | +0.3% | ✅ Equity |
| **2** | 41.2% | +2.0% | ✅ Equity |
| **3** | 43.1% | -2.6% | ✅ Equity (F > M) |
| **4** | 48.1% | +0.9% | ✅ Equity |
| **5 (Exec)** | 34.8% | +0.5% | ⚠️ Low Rep |

### Recommendations
1.  **Recruiting**: Review hiring funnel for Entry Level roles to improve gender balance.
2.  **Leadership Pipeline**: Investigate the drop-off in female representation from Level 4 (48%) to Level 5 (34%).

## Files
-   `analysis.py`: Calculates Pay Gap and Reprentation metrics.
-   `audit.py`: Verifies input data quality.
