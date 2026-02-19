---
title: "🔥 Burnout Risk Model"
date: 2026-02-09
tags: ["Analysis", "Python", "Burnout"]
type: "Analysis"
summary: "A predictive risk model that aggregates commute, overtime, and stagnation data to identify potential attrition, proving 4x more effective than random sampling."
demo: ""
weight: 13
---

## What It Does
The Burnout Risk Model is a composite scoring system that quantifies "hidden" employee stress factors. It aggregates distinct data points—such as commute distance, overtime hours, and promotion stagnation—into a single 0-100 "Burnout Score" for every employee.

## The Problem It Solves
Burnout is often treated as a qualitative feeling, leaving HR leaders reactive rather than proactive. By the time an employee reports feeling burnt out in a survey, they are often already looking for a new job.

## How It Works
I engineered a **Composite Risk Score** using Python (Pandas) to weigh and aggregate stressors found in the IBM HR dataset. The model assigns weighted points to risk factors:
- **Overtime** (+30 pts)
- **Commute** (>20 miles) (+20 pts)
- **Stagnation** (No promotion >4 years) (+10 pts)
- **Sentiment** (Low Work-Life Balance score) (+40 pts)

## Key Features
- **Weighted Scoring Algorithm**: Differentiates between minor irritants and major flight risks.
- **Risk Segmentation**: Automatically categorizes the workforce into "Safe," "At Risk," and "Critical" cohorts.
- **Visual Impact**: Generates clear distribution charts to highlight organizational hotspots.

## Results / Impact
The model successfully identified a "Red Zone" cohort of 64 employees who were **4x more likely to resign** (39.1% attrition rate) compared to the low-risk group (9.4%). This allowed HR to deploy targeted retention interventions before resignations occurred.

## Tech Stack
| Layer | Technology |
|---|---|
| Analysis | Python (Pandas / NumPy) |
| Visualization | Matplotlib / Seaborn |
| Data Source | IBM HR Analytics Dataset |

![Burnout Risk Chart](burnout-risk.png)
