# AI Workflow: How I Build With AI

> This document is proof-of-work. It shows *how* AI was used in each project — not just *that* it was used.

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
**AI Role:** Analytical Co-pilot

- **Problem Framing:** Used AI to brainstorm which variables would be most predictive of attrition based on HR domain knowledge.
- **Script Generation:** The `analysis.py` and `audit_analysis.py` scripts were built through iterative AI prompting — starting from a natural language description of the KPIs needed, then refining the Pandas logic.
- **Data Audit:** Prompted AI to generate a validation script that checks sample sizes (n > 30) and statistical integrity — a step I wouldn't have prioritized without AI surfacing the risk.

### 02 — Promotion Velocity
**AI Role:** Hypothesis Challenger

- **Insight Discovery:** The "Promotion Curse" finding (recently promoted employees leave *more*) was counter-intuitive. AI helped reframe this by suggesting alternative interpretations: marketability, title shopping, expectations gap.
- **Visualization:** Used AI to generate the Matplotlib chart configuration for comparing stagnant vs. propelled attrition rates.

### 03 — Burnout Risk Index
**AI Role:** Methodology Designer

- **Scoring Model:** The weighted burnout score (0–100) was co-designed with AI. I provided the HR domain factors (overtime, commute, work-life balance), and AI helped assign weights and normalize the composite score.
- **Segmentation:** AI recommended the 3-tier risk segmentation (High/Moderate/Low) and suggested that 60+ was the appropriate "High Risk" threshold based on the data distribution.

### 04 — Diversity & Equity Audit
**AI Role:** Framework Builder

- **Adjusted Pay Gap Methodology:** AI helped design the "within-level" comparison methodology — comparing male and female pay *at the same job level* instead of using a simple average, which would produce misleading results.
- **Audit Script:** AI generated the `audit.py` data quality checks to ensure no job level had fewer than 10 employees of either gender.

  ```
- **JSON Schema Enforcement:** The prompt requires the LLM to return a strict JSON object, which is then parsed and used for filtering decisions.
- **Graceful Degradation:** If the Gemini API key is missing, the system falls back to keyword-based title matching — no crash, no data loss.

---

## My Prompting Philosophy

1. **Start with the business question**, not the code. I tell AI what decision I need to make, not what function to write.
2. **Validate everything.** Every project has an `audit.py` script that independently verifies the analysis — because AI can hallucinate pandas logic too.
3. **Document the "why."** AI-generated code without context is tech debt. Each project README explains the hypothesis, methodology, and interpretation.

---

## What This Proves

| Competency | Evidence |
|:-----------|:---------|
| **AI-Augmented Development** | Every project was built faster because of AI — not copy-pasted from a tutorial |
| **Prompt Engineering** | Structured prompts with injection guards, JSON schemas, and graceful fallbacks |
| **Critical Thinking** | AI suggested; I validated. Every finding has an `audit.py` counterpart |
| **Product Thinking** | Job Intelligence is a full AI agent pipeline: scrape → analyze → report |
