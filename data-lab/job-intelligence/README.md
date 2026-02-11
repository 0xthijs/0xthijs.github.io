# Job Intelligence — AI-Powered Job Market Monitor

> **An AI agent that scrapes, analyzes, and ranks job listings using Google Gemini.**

## The Problem

Job hunting as a senior HR professional is noisy. Hundreds of listings, most irrelevant — wrong seniority, wrong language, recruitment roles disguised as HRBP positions. Manually filtering takes hours every week.

## The Solution

An automated pipeline that:
1. **Scrapes** job listings from configured sources (Indeed, LinkedIn, etc.)
2. **Analyzes** each listing with Gemini 2.0 Flash to extract structured data
3. **Filters** by seniority, salary, language, and role type
4. **Reports** a curated weekly Markdown summary of relevant positions

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   scraper.py │────▶│  analyzer.py │────▶│  reporter.py │
│              │     │              │     │              │
│  Playwright  │     │  Gemini API  │     │  Pandas +    │
│  Async       │     │  JSON Parse  │     │  Markdown    │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
   Raw HTML          Structured JSON       Weekly_Job_Report.md
```

## How Gemini Is Used

The `analyzer.py` module sends each job listing to Gemini 2.0 Flash with a structured prompt that extracts:

| Field | Description |
|:------|:------------|
| `salary` | Normalized monthly salary (EUR/USD), or null |
| `is_senior` | Whether the role is Senior/Lead level |
| `meets_salary_criteria` | Inferred salary threshold (> €2,500/mo) |
| `is_target_language` | English or Dutch language listing |
| `is_recruitment_role` | Filters out recruiter/TA roles |

**Security:** The prompt includes injection guards — job description text is enclosed in `<job_text>` tags with explicit instructions to ignore embedded prompt injections.

**Resilience:** If no API key is available, the system gracefully degrades to keyword-based title matching.

## Files

| File | Purpose |
|:-----|:--------|
| `main.py` | Orchestrator — runs the full pipeline |
| `scraper.py` | Async web scraper using Playwright |
| `analyzer.py` | Gemini API integration with structured prompting |
| `reporter.py` | Generates deduplicated Markdown reports |
| `sources.json` | Configurable list of job board URLs |
| `requirements.txt` | Python dependencies |

## Running

```bash
# Install dependencies
pip install -r requirements.txt

# Set API key
export GEMINI_API_KEY=your_key_here

# Run the pipeline
python main.py
```

## Why This Matters for HR

This isn't just a scraping script — it's a proof-of-concept for how AI can automate repetitive HR operations. The same pattern (scrape → LLM analysis → structured report) applies to:

- **Candidate screening** (parse CVs → extract skills → match to JDs)
- **Compensation benchmarking** (scrape market data → normalize → compare)
- **Employee sentiment analysis** (survey responses → LLM classification → dashboard)
