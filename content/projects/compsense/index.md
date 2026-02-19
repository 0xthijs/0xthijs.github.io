---
title: "💰 CompSense"
date: 2026-02-17
tags: ["Dashboard", "React", "Compensation"]
type: "Dashboard"
summary: "A modern, interactive compensation planning dashboard featuring real-time budget modeling and salary band visualization."
demo: "https://0xthijs.github.io/CompSense/"
weight: 14
---

## What It Does
CompSense is a specialized dashboard for Compensation & Benefits professionals that transforms static salary data into a dynamic planning environment. It allows HR teams to model pay raise scenarios, visualize market positioning, and distribute merit increases while staying within budget.

## The Problem It Solves
Traditional compensation planning relies on complex, error-prone spreadsheets that lack visual context. Managers struggle to see the immediate budgetary impact of their decisions or how an employee's new salary compares to market bands.

## How It Works
The application is built with **React 19** and **TypeScript** for type-safe, component-based architecture. It uses **Recharts** to render interactive scatter plots and data grids that update instantly as variables (like global merit increase %) are adjusted.

## Key Features
- **Pay Raise Simulator**: Interactive slider that models different merit increase percentages and their impact on the total payroll budget.
- **Market Position Analysis**: Visual scatter plot comparing employee salaries against market bands (Junior to Principal), color-coded by role.
- **Real-Time Data Grid**: Detailed employee table that recalculates projected salaries and Compa-Ratios instantly.
- **Smart Tooltips**: Context-aware popovers showing projected salary and market alignment on hover.

## Results / Impact
Enables accurate, data-driven compensation reviews by providing immediate visual feedback on budget utilization and market equity.

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React 19 / TypeScript / Vite |
| Styling | Tailwind CSS v4 |
| Visualization | Recharts |
| Deployment | GitHub Pages |

[View Code](https://github.com/0xthijs/hr-ai-portfolio/tree/main/content/projects/compsense)
