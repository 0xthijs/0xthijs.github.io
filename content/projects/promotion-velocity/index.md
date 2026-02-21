---
title: "🚀 The Promotion Curse"
date: 2026-02-09
tags: ["Analysis", "Python", "Retention"]
type: "Analysis"
summary: "A counter-intuitive analysis of the 'Promotion Paradox', revealing that high performers are 17% more likely to leave immediately after a promotion."
demo: ""
weight: 22
---

## What It Does
This project tests the "Stagnation Hypothesis"—the idea that people leave because they aren't moving up. Using the IBM HR dataset, I analyzed the attrition rates of high potential employees based on their time since last promotion.

## The Problem It Solves
Companies often view promotions as a "Retention Lock," assuming a promoted employee is safe for at least 2 years. This false sense of security leads to a lack of support during the critical transition period.

## How It Works
I performed a cohort analysis using **Python (Pandas)**, segmenting high performers into "Stagnant" (>2 years without promotion) and "Propelled" (<2 years since promotion) groups and calculating their respective flight risk.

## Key Findings
- **The Promotion Paradox**: "Propelled" high performers had a **17.0%** attrition rate, compared to **13.7%** for their "Stagnant" peers.
- **Title Shopping**: New titles make employees significantly more marketable to external recruiters.
- **The Valley of Despair**: The stress of a new role combined with "Mission Accomplished" syndrome increases vulnerability to poaching.

## Results / Impact
Reframed the internal mobility strategy to include "Post-Promotion Onboarding" programs, treating internal movers with the same care and support structure as new external hires.

## Tech Stack
| Layer | Technology |
|---|---|
| Analysis | Python (Pandas) |
| Visualization | Matplotlib |
| Data | IBM HR Analytics Dataset |

![Stagnation Heatmap](promotion-stagnation.png)
