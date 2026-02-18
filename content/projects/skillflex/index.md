---
title: "🧠 SkillFlex: AI-Driven Internal Mobility Marketplace"
date: 2026-02-18
draft: false
tags: ["Internal Mobility", "Matching Engine", "Python", "Flask", "AI Agents"]
summary: "An internal talent marketplace that uses AI to infer employee skills and match them with open project 'gigs' to reduce attrition and boost retention."
weight: 11
---

## 🚀 Overview

**SkillFlex** is a Proof of Concept (PoC) for an internal talent marketplace designed to address high attrition rates by connecting employees with internal "gigs" or projects.

In many organizations, employees leave because they can't find growth opportunities internally. SkillFlex solves this by:
1.  **Inferring Skills:** Using AI (Google Gemini) to analyze an employee's profile (Role, Dept, Education) and generate a verified skill profile—going beyond what's written in their outdated CV.
2.  **Matching Engine:** A Python-based matching algorithm that pairs employees to open opportunities based on skill overlap and retention risk.
3.  **Retention Boosting:** The algorithm deliberately boosts opportunities for employees flagged as "Flight Risk" to re-engage them.

## 📺 Live Demo (Walkthrough)

Since this is a backend Python application (Flask + SQLite), it requires a server environment and cannot be hosted as a static page on GitHub. 

**Watch the capabilities in action:**

![SkillFlex Walkthrough](/images/skillflex-demo.webp)

## 🛠️ Architecture & Tech Stack

The application is built as a lightweight, deployable PoC:

*   **Backend:** Python (Flask)
*   **Database:** SQLite (Relational Data)
*   **AI Engine:** Google Gemini Pro (Skill Inference)
*   **Frontend:** Tailwind CSS + Jinja2 Templates
*   **Localization:** Fully bilingual (English / Dutch)

## ✨ Key Features

### 1. AI Skill Inference
Instead of asking employees to "update their profile" (which they never do), SkillFlex uses Generative AI to infer 5 Hard Skills and 3 Soft Skills based on their current role and tenure.

### 2. Strategic Matching Engine
matches are calculated not just by keyword overlap, but by business priority.
*   **Standard Match:** Skill Overlap / Total Required Skills
*   **Retention Boost:** Employees with `Attrition = Yes` get a weighted score boost to surface them for more opportunities.

### 3. Manager & Employee Personas
*   **Manager View:** A dashboard identifying flight risks and talent distribution.
*   **Employee View:** A personalized feed of gigs that match their inferred capabilities, with transparency on *why* they matched.

## 💻 Usage

This project acts as a functional prototype for HR Tech integration. It demonstrates how "Static" HR data (rows in a CSV) can be transformed into "Dynamic" opportunities using simple AI agents and matching logic.

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run the ingestion pipeline (Generates DB and infers skills)
python ingestion.py

# Run the web application
python app.py
```
