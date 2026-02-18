---
title: "Predicting Burnout: A Composite Risk Model"
date: 2026-02-09T15:00:00+07:00
draft: false
tags: ["Wellbeing", "Predictive Modeling", "Burnout"]
description: "How we built a composite 'Burnout Score' that successfully identified employees 4x more likely to resign."
---

Burnout is often treated as a qualitative feeling, but it leaves quantitative footprints. By aggregating known stressors in the IBM HR dataset, I built a **Composite Burnout Risk Score** to identify at-risk employees *before* they resign.

## The Model

The "Burnout Score" (0-100) aggregates weighted risk factors:
*   **Overtime:** Working beyond standard hours (+30 pts).
*   **Commute:** Traveling > 20 miles to work (+20 pts).
*   **Work-Life Balance:** Self-reported ratings of "Bad" or "Good" (vs "Excellent") (+40/20 pts).
*   **Stagnation:** No promotion in > 4 years (+10 pts).

## Results: Validating the Risk Score

The model proved highly predictive. Employees flagged as "High Risk" (Score $\ge$ 60) showed a massive spike in attrition.

![Burnout Risk Chart](burnout-risk.png)

| Risk Segment | Burnout Score | Attrition Rate |
| :--- | :--- | :--- |
| **Low Risk** | $< 30$ | **9.4%** |
| **Moderate Risk** | $30 - 59$ | 25.5% |
| **High Risk** | $\ge 60$ | **39.1%** |

## Impact

We identified **64 employees** in the "Red Zone" (High Risk). These employees are **4 times more likely to leave** than their low-risk peers.

### Action Plan
Detailed retention plans are now being deployed for the "Red Zone" cohort, including:
1.  **Workload Balancing:** Immediate review of overtime hours.
2.  **Flexible Work Options:** Remote days for those with long commutes.
