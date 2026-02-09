# Promotion Velocity & Stagnation Analysis

**Goal**: Identify if high-performing employees are leaving due to a lack of career progression (Promotion Velocity).

## Hypotheses
1.  **Stagnation Risk**: High performers who haven't been promoted in > 2 years have a significantly higher attrition rate.
2.  **The "3-Year Itch"**: Attrition spikes when `YearsSinceLastPromotion` exceeds 3 years for top talent.

## Key Findings (Analysis v1)
*Date: 2026-02-09*

> **⚠️ Insight: The "Promotion Curse"**
> Contrary to our hypothesis, **high performers who were recently promoted are MORE likely to leave** than those who are stagnant.

| Category | Count | Attrition Rate |
| :--- | :--- | :--- |
| **Global Average** | 1470 | 16.1% |
| **Stagnant High Performers** (>2 yrs no promo) | 373 | **13.7%** |
| **Propelled High Performers** (<2 yrs promo) | 1097 | **17.0%** |

### Interpretation
1.  **Marketability**: Recently promoted employees may be more attractive to external recruiters ("Title Shopping").
2.  **Stagnation = Stability?**: Employees who stay in roles longer without promotion may be more risk-averse or comfortable.

## Files
-   `analysis.py`: Python script to calculate metrics and generate visualziations.
-   `audit.py`: Data integrity checks to ensure analysis validity.
