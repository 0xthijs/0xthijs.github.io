---
title: "🏗️ 100% Data Integrity Pipeline"
date: 2026-02-15
tags: ["Pipeline", "Python", "Data Governance"]
type: "Pipeline"
summary: "An automated 'Governance Engine' acting as a firewall for HR data, implementing a 'Chaos Monkey' to stress-test data integrity."
demo: ""
weight: 16
cover:
  image: "/images/automated-hr-data-governance-pipeline.png"
  alt: "Automated HR Data Governance Pipeline Interface"
  relative: false
  hiddenInList: true
---

## What It Does
This automated "Governance Engine" acts as a firewall for HR data, ensuring 100% integrity before data enters the analytics warehouse. It uses a "Chaos Engineering" approach, intentionally injecting errors to prove the system's ability to catch them.

## The Problem It Solves
HRIS migrations and analytics projects often fail due to "dirty data"—human errors like typos (e.g., negative ages), impossible tenure dates, or orphaned records. Manual auditing of thousands of rows is slow, expensive, and error-prone.

## How It Works
The pipeline is built in **Python** using **Pandas**. It implements a two-stage process:
1.  **Chaos Monkey**: Intentionally corrupts a sample of clean data with common HR errors (typos, logic conflicts).
2.  **Audit Engine**: A strict validation layer that must catch 100% of the injected errors to pass the build.

## Key Features
- **Chaos Monkey Simulation**: Stresses the system by injecting random logic errors (e.g., "Start Date > End Date").
- **Strict Schema Validation**: Enforces business logic rules (e.g., "Director level must have >5 years tenure").
- **Executive Health Scorecard**: Automatically generates a "Data Health" report with actionable cleanup tasks.

## Results / Impact
Achieved **100% data trust** for the People Analytics team by catching critical data quality issues before they polluted the dashboard, saving an estimated 40 hours of manual cleanup per month.

## Tech Stack
| Layer | Technology |
|---|---|
| Logic | Python / Pandas |
| Testing | PyTest (Chaos Monkey) |
| Reporting | Markdown / Pandas Profiling |
| Deployment | Local Script / CI Pipeline |

[View Code](https://github.com/0xthijs/hr-ai-portfolio/tree/main/content/projects/data-governance)
