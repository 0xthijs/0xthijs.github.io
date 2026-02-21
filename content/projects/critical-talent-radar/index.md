---
title: "🛡️ Critical Talent Risk Radar"
date: 2026-02-14
tags: ["App", "Python", "Retention"]
type: "App"
summary: "An AI-powered retention tool that identifies at-risk high performers and generates personalized retention strategies."
demo: ""
weight: 15
---

## What It Does
The Critical Talent Risk Radar is an HR analytics application that segments the workforce to identify "Critical Talent" (High Potential / High Impact) who are at risk of leaving. It then uses Generative AI to act as a retention consultant, drafting specific strategies for each risk case.

## The Problem It Solves
Organizations often fail to identify flight risks among their top performers until it's too late. Generic retention programs fail to address the specific needs of critical talent, leading to the loss of key institutional knowledge.

## How It Works
The app uses **Streamlit** for the frontend and **Pandas** for data processing. It filters employee data based on performance, tenure, and sentiment scores to flag high-risk individuals. The **Google Gemini API** is then engaged to analyze the profile of at-risk departments and generate tailored retention advice.

## Key Features
- **Automated Risk Segmentation**: Instantly filters employees based on multi-dimensional criteria (Performance vs. Flight Risk).
- **Executive Dashboard**: Real-time visualization of critical talent exposure across departments.
- **AI Retention Consultant**: Generates contextual, actionable retention plans for specific risk cohorts.

## Results / Impact
Transforms retention from a reactive guessing game into a proactive, targeted strategy, specifically protecting the organization's most valuable human assets.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Streamlit |
| Data Processing | Python (Pandas) |
| Visualization | Plotly Express |
| AI Engine | Google Gemini API |

[View Code](https://github.com/0xthijs/hr-ai-portfolio/tree/main/data-lab/critical-talent-radar)
