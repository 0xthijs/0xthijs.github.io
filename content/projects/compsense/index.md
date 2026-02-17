---
title: "💰 CompSense: Enterprise Compensation Dashboard"
date: 2026-02-17
summary: "A modern, React-based compensation planning tool featuring real-time budget modeling, interactive salary band visualization, and a premium enterprise UI."
tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Vite"]

---

## Project Overview

**CompSense** is a specialized HR tech dashboard designed for Compensation & Benefits professionals. It moves beyond static spreadsheets to offer a dynamic, visual approach to salary planning and market analysis.

### Key Features
*   **Pay Raise Simulator**: Interactive budget modeling tool. Adjust the merit increase slider to see the immediate impact on the total payroll budget.
*   **Market Position Analysis**: Scatter plot visualization comparing employee salaries against market bands (Junior, Senior, Staff, Principal), color-coded by role.
*   **Smart Tooltips**: Hover over employees to see their **projected new salary** and **Compa-Ratio** based on the proposed increase.
*   **Real-time Data Grid**: Detailed employee table that updates calculations instantly as you adjust parameters.
*   **Premium Design**: Built with a clean, "Enterprise SaaS" aesthetic using Tailwind CSS and the *Outfit* typeface.

## 🚀 Live Demo

Explore the dashboard here:

[👉 **Launch CompSense Dashboard**](https://0xthijs.github.io/CompSense/)

---

### Technical Highlights

Built with a modern frontend stack focusing on performance and developer experience:

*   **Framework**: React 19 + TypeScript + Vite
*   **Styling**: Tailwind CSS v4 (using the new `@theme` configuration)
*   **Visualization**: Recharts for responsive, composable charts
*   **Icons**: Lucide React
*   **Deployment**: GitHub Pages (CI/CD)

**Code Snippet (Smart Tooltip Logic):**
```typescript
const CustomTooltip = ({ active, payload, meritIncrease }: CustomTooltipProps) => {
    // dynamically calculating projection
    const projectedSalary = data.salary * (1 + meritIncrease / 100);
    
    return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg">
            <span className="text-emerald-400 font-bold text-right">
                ${projectedSalary.toLocaleString()}
            </span>
            {/* ... */}
        </div>
    );
};
```
