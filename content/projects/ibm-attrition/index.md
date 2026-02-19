---
title: "🏃 High Performer Attrition Analysis"
date: 2026-02-09T14:30:00+07:00
tags: ["Analysis", "Python", "Attrition"]
type: "Analysis"
summary: "A deep-dive analysis challenging retention myths, revealing that 'High Performers' are 16% more likely to leave than average employees."
demo: ""
weight: 18
---

## What It Does
This analysis investigates the hidden drivers of employee turnover using the IBM HR Attrition dataset. It tests common retention hypotheses against statistical reality to determine what actually makes people stay.

## The Problem It Solves
Organizations often default to "throwing money at the problem" (salary hikes) or assuming high performers are safe. This analysis proves which levers actually move the needle on retention.

## How It Works
I performed exploratory data analysis (EDA) using **Python (Pandas)** to correlate attrition rates with variables like salary, manager tenure, and performance ratings.

## Key Findings
- **High Performer Risk**: Employees with a 4/5 rating had a **16.37%** attrition rate (higher than the 16.12% average).
- **The "New Manager" Cliff**: Attrition spikes to **32%** during the first year with a new manager.
- **Salary Hikes Ineffective**: The average salary hike for leavers (15.10%) was virtually identical to stayers (15.23%), debunking the "pay to stay" myth.

## Results / Impact
Shifted the retention strategy from broad salary bands to targeted "New Manager Integration" programs and "Stay Interviews" for high performers, directly addressing the highest-risk segments.

## Tech Stack
| Layer | Technology |
|---|---|
| Analysis | Python (Pandas) |
| Visualization | Matplotlib |
| Data Source | IBM HR Analytics Dataset |

![Attrition by Manager Stability](manager-tenure.png)
