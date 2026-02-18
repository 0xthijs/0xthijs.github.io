---
title: "🧠 SkillFlex: AI-Driven Internal Mobility Marketplace"
date: 2026-02-18
draft: false
tags: ["Internal Mobility", "Matching Engine", "Python", "Flask", "AI Agents", "SQLAlchemy", "Pytest"]
summary: "A production-grade internal talent marketplace that uses AI to infer employee skills and match them with open project 'gigs' to reduce attrition. Features a premium SaaS UI with Dark Mode."
weight: 11
---

## 🚀 Overview

**SkillFlex** is a sophisticated **Internal Talent Marketplace** designed to address high attrition rates by proactively connecting employees with internal "gigs" or projects.

In many organizations, potential talent leaves because they can't find growth opportunities internally. SkillFlex solves this by transforming static HR data into dynamic opportunities using AI and a robust matching engine.

## 🌟 Key Features

### 1. AI-Powered Skill Inference
Instead of relying on outdated CVs, SkillFlex uses **Google Gemini Pro** to analyze an employee's profile (Role, Department, Education, Tenure) and infer 5 Hard Skills and 3 Soft Skills. This creates a "Live Profile" that reflects actual capabilities.

### 2. Strategic Matching Engine
Matches are calculated using a **Weighted Jaccard Similarity** algorithm that prioritizes business value:
*   **Standard Match:** Skill Overlap / Total Required Skills.
*   **Retention Boost:** Employees flagged as `Flight Risk` (Attrition = Yes) receive a strategic score boost to surface them for more opportunities, encouraging retention through mobility.

### 3. Premium SaaS Experience
A fully responsive, modern UI designed to demonstrate "Senior Product" quality:
*   **Dark Mode Support:** System-wide dark mode with persistent state.
*   **Glassmorphism Design:** Modern aesthetics using TailwindCSS.
*   **Role-Based Views:** Distinct dashboards for Managers (Risk Analysis) and Employees (Opportunity Feed).
*   **Privacy-First:** Sensitive "Risk" data is strictly limited to the Manager view.

## 📺 Live Demo (Walkthrough)

**Watch the capabilities in action:**

![SkillFlex Walkthrough](/images/skillflex-demo-v3.webp)

## 🛠️ Architecture & Tech Stack

Refactored from a script-based PoC to a production-grade architecture to demonstrate maintainability and scalability/

*   **Backend:** Python (Flask), **SQLAlchemy ORM** (SQLite)
*   **Frontend:** HTML5, **TailwindCSS**, Alpine.js logic
*   **AI/Data:** Google Gemini Pro, Pandas
*   **Quality Assurance:** **Pytest** suite for matching logic verification
*   **Localization:** Bilingual support (English / Dutch)

## 📺 Live Demo (Walkthrough)

Since this is a backend Python application, it cannot be hosted as a static page. However, you can view the architecture and code structure below.

**Manager Dashboard (Dark Mode):**
*Real-time risk analysis and talent distribution.*

**Employee Profile (Light Mode):**
*Personalized gig recommendations based on inferred skills.*

## 💻 Usage

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run the ingestion pipeline (Generates DB and infers skills)
python ingestion.py

# Run the web application
python app.py
```
