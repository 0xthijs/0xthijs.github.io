# AI Workflow: How I Build With AI

> This document outlines the specific AI methodologies applied in each project.

---

## My AI Toolchain

| Tool | Role | Where Used |
|:-----|:-----|:-----------|
| **Google Antigravity** | AI coding agent for pair programming, architecture, and documentation | All projects |
| **Google AI Studio** | Prompt prototyping, model testing, and API key management | [Job Intelligence](data-lab/job-intelligence/) |
| **Google Gemini 2.0 Flash** | LLM for job analysis, classification, salary inference | [Job Intelligence](data-lab/job-intelligence/) |
| **AI Pair Programming (Gemini)** | Code generation, debugging, refactoring, data validation | All projects |
| **Structured Prompting** | JSON-schema-enforced outputs with injection guards | [analyzer.py](data-lab/job-intelligence/analyzer.py) |

---

## Per-Project AI Usage

### 01 — IBM Attrition Analysis
**AI Application:** Analysis Support

- **Problem Framing:** Identification of predictive variables based on HR domain knowledge.
- **Script Generation:** Iterative development of `analysis.py` and `audit_analysis.py` to define KPIs and implement Pandas logic.
- **Data Audit:** Automated generation of validation scripts to check sample sizes and statistical integrity.

### 02 — Promotion Velocity
**AI Application:** Hypothesis Testing

- **Insight Discovery:** Analysis of attrition rates among promoted employees versus non-promoted peers.
- **Visualization:** Generation of Matplotlib configurations for comparative analysis.

### 03 — Burnout Risk Index
**AI Application:** Methodology Design

- **Scoring Model:** Collaborative design of a weighted burnout score (0–100) incorporating multiple HR factors.
- **Segmentation:** Establishment of risk thresholds (High/Moderate/Low) based on data distribution.

### 04 — Diversity & Equity Audit
**AI Application:** Framework Development

- **methodology:** Design of "within-level" pay gap comparison to ensure accurate analysis.
- **Audit Script:** Generation of `audit.py` for data quality checks and minimum sample size verification.

  ```
- **JSON Schema Enforcement:** The prompt requires the LLM to return a strict JSON object, which is then parsed and used for filtering decisions.
- **Graceful Degradation:** If the Gemini API key is missing, the system falls back to keyword-based title matching — no crash, no data loss.

---

## My Prompting Philosophy

1. **Define the business question.** I focus on the decision required, which guides the technical implementation.
2. **Validate outputs.** Independent audit scripts (e.g., `audit.py`) define logic to verify analysis results.
3. **Document the methodology.** Context is essential. Each project README explains the hypothesis, methodology, and interpretation.

---

## What This Proves

| Competency | Evidence |
|:-----------|:---------|
| **AI-Augmented Development** | Accelerated project delivery through AI integration |
| **Prompt Engineering** | Use of structured prompts and validation mechanisms |
| **Critical Thinking** | Verification of AI suggestions with independent audit scripts |
| **Product Thinking** | Job Intelligence is a full AI agent pipeline: scrape → analyze → report |
