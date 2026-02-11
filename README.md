# 🧠 Human-Centric Intelligence

![Human-Centric Intelligence](static/images/header.png)

> **Turning HR data into board-level decisions — with AI as a co-pilot, not a crutch.**

I'm a Senior HRBP who builds AI-powered analytics tools to answer the questions that keep us up at night: *Why are our best people leaving? Where is burnout hiding? Is our pay equitable?*

This repository is my working lab — every project solves a real HR problem, and every line of code was built using an AI-first workflow.

---

## Portfolio at a Glance

| # | Project | Business Question | Key Finding | Impact |
|:--|:--------|:------------------|:------------|:-------|
| 01 | [Attrition Analysis](data-lab/01-ibm-attrition/) | Why are high performers leaving? | Employees with a new manager have **32% attrition** — 3x the norm | Recommended "Manager Transition Onboarding" program |
| 02 | [Promotion Velocity](data-lab/02-promotion-velocity/) | Does promoting people retain them? | **No.** Recently promoted employees are *more* likely to leave (17% vs 14%) | Proposed "Post-Promotion Re-recruitment" initiative |
| 03 | [Burnout Risk Index](data-lab/03-burnout-risk/) | Can we predict who will burn out? | High-risk employees leave at **39%** — 4x the baseline | Flagged 64 employees for immediate retention interviews |
| 04 | [Diversity & Equity Audit](data-lab/04-diversity-audit/) | Is our pay equitable? | Pay gap < 2% ✅ — but exec representation is only **34% female** | Recommended pipeline review for Level 4 → 5 progression |
| 05 | [Job Intelligence](data-lab/job-intelligence/) | Can AI automate my job search? | Built an AI agent that scrapes, filters, and ranks job listings using Gemini | Automated weekly job market intelligence reports |

---

## 📌 Featured: Q1 2026 Executive Strategy Brief

> *This is what "HRBP meets AI" looks like in practice.*

My [Q1 2026 Board Update](content/reports/q1-2026-board-update.md) synthesizes all four analytics projects into a single executive brief with risk categories, Mermaid diagrams, and concrete recommendations. It's the artifact I'd present to a CHRO.

---

## How I Work: AI-First Methodology

I don't just *use* AI — I build *with* AI. Every project in this repo was developed using a structured AI workflow:

- **Gemini 2.0 Flash** → Job analysis & classification ([Job Intelligence](data-lab/job-intelligence/))
- **AI Pair Programming** → Code generation, debugging, and data validation
- **Prompt Engineering** → Structured prompts with injection guards and JSON schema enforcement

📄 **Full details:** [AI-WORKFLOW.md](AI-WORKFLOW.md)

---

## Tech Stack

| Layer | Tools |
|:------|:------|
| **Analytics** | Python · Pandas · Matplotlib |
| **AI / LLM** | Google Gemini 2.0 Flash · Google AI Studio · Structured Prompts |
| **AI Agents** | Google Antigravity · AI Pair Programming |
| **Automation** | Playwright · Async Python |
| **Platform** | Hugo · PaperMod · GitHub Pages |
| **Data** | SQL · CSV · SQLite |

---

## Quick Links

| Resource | Link |
|:---------|:-----|
| 📊 Executive Strategy Brief | [Q1 2026 Board Update](content/reports/q1-2026-board-update.md) |
| 🤖 AI Workflow Documentation | [AI-WORKFLOW.md](AI-WORKFLOW.md) |
| 🛠️ Development & Deployment | [DEVELOPMENT.md](DEVELOPMENT.md) |
| 🌐 Live Portfolio | [0xthijs.github.io/hr-ai-portfolio](https://0xthijs.github.io/hr-ai-portfolio/) |
| 💼 LinkedIn | [Thijs van der Aa](https://linkedin.com/in/thijsvanderaa) |

---

## Project Log

- **2026-02-11**: Portfolio overhaul — rewrote README as Project Charter, added AI-WORKFLOW.md, documented job-intelligence module.
- **2026-02-09**: HR Attrition Analysis with data audit and "Data Verified" badge.
- **2026-02-09**: Implemented `promotion-velocity`, `burnout-risk`, `diversity-audit` modules. Published Q1 Board Update.
- **2026-02-09**: Initialized Hugo architecture with PaperMod theme using AI-First workflow.
