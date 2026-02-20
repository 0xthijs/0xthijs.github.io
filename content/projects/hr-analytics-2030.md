---
title: "📊 HR Analytics 2030"
date: 2026-02-20
draft: false
tags: ["App", "Next.js", "Predictive Analytics"]
type: "App"
summary: "A privacy-first predictive analytics platform. Features client-side AI for attrition modeling, interactive workforce planning scenarios, and secure CSV processing—all running 100% in your browser."
weight: 10
---

## What It Does
**HR Analytics 2030** is a secure, local-first dashboard that transforms raw HRIS data into actionable workforce intelligence. Unlike traditional BI tools that require cloud uploads, this application runs entirely in your browser using **IndexedDB** and **Web Workers**, ensuring sensitive employee data never leaves your device.

## The Problem It Solves
HR teams often struggle with:
1.  **Data Privacy:** Hesitancy to upload sensitive payroll/attrition data to public cloud tools.
2.  **Static Reporting:** Relying on backward-looking Excel sheets instead of forward-looking scenarios.
3.  **Complex Modeling:** Lack of accessible tools to model "what-if" scenarios for attrition and retirement.

## How It Works
The application uses a client-side heuristic engine to:
*   **Ingest & Sanitize:** Parse CSV exports locally with strict schema validation.
*   **Predict Risk:** Apply attrition logic (e.g., high performer + low salary + tenure > 2y) to flag flight risks.
*   **Model Scenarios:** Allow leaders to toggle growth targets and see immediate impacts on hiring gaps.

## Key Features
- **Privacy-First Architecture**: Zero data exfiltration. All processing happens on your device.
- **Interactive Planning**: Slider-based scenario modeling for headcount growth.
- **Smart Attrition Flags**: Automated detection of "Tenure Cliff" and "Compensation Gaps".
- **Instant Visuals**: Real-time charts powered by Recharts.

[View Live Dashboard](/projects/hr-analytics-2030/)
