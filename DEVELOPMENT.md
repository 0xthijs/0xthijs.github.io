# Development Guide

> Technical details for building, running, and deploying the portfolio.

## Prerequisites

- [Hugo](https://gohugo.io/) (Extended Edition recommended)
- [Git](https://git-scm.com/)
- Python 3.10+ (for data-lab projects)

## Local Development

```bash
# Clone with submodules (for PaperMod theme)
git clone --recurse-submodules https://github.com/0xthijs/hr-ai-portfolio.git

# Start the Hugo dev server
hugo server -D
```

The site will be available at `http://localhost:1313/hr-ai-portfolio/`.

## Architecture

| Component | Technology | Purpose |
|:----------|:-----------|:--------|
| **Static Site** | Hugo + PaperMod | Portfolio website with dark theme |
| **Content** | Markdown | Blog posts, case studies, reports |
| **Data Lab** | Python | Analysis scripts and datasets |
| **CI/CD** | GitHub Actions | Automated build and deployment |

## Directory Structure

```text
.
├── content/
│   ├── about.md                  # About page
│   ├── projects/                 # Portfolio case studies
│   └── reports/                  # Executive briefs
├── data-lab/
│   ├── 01-ibm-attrition/        # Attrition analysis + dataset
│   ├── 02-promotion-velocity/   # Promotion impact study
│   ├── 03-burnout-risk/         # Burnout risk scoring
│   ├── 04-diversity-audit/      # Pay equity & representation

├── themes/                       # Hugo themes (PaperMod)
├── hugo.toml                     # Hugo configuration
├── AI-WORKFLOW.md                # AI usage documentation
├── DEVELOPMENT.md                # This file
└── README.md                     # Project Charter
```

## Deployment

The site is configured for GitHub Pages deployment:

- **Base URL:** `https://0xthijs.github.io/hr-ai-portfolio/`
- **Build command:** `hugo --minify`
- **Deploy:** Push to `main` branch → GitHub Actions builds and deploys

## Hugo Configuration

The site uses the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme with:

- **Dark theme** by default
- **Profile mode** on the homepage
- **Reading time**, share buttons, breadcrumbs enabled
- Social links for GitHub and LinkedIn

## Adding New Projects

To add a new project to the portfolio (e.g., `my-new-app`):

### 1. Create the Portfolio Entry
Create a folder `content/projects/my-new-app/` and add an `index.md` file:
```bash
hugo new content/projects/my-new-app/index.md
```

**Required Frontmatter:**
```yaml
---
title: "My New App: Value Proposition"
date: 2026-02-18
draft: false
tags: ["Python", "AI", "HR Tech"]
summary: "One-line description of the project's impact."
weight: 12  # Higher numbers appear lower on the list
---
```

### 2. Add Application Code (Optional)
If the project has runnable code (Flask, Streamlit, Scripts), **DO NOT** put it inside `content/`. Hugo will try to build it and fail.

Instead, create a folder in `apps/`:
```bash
mkdir apps/my-new-app
```
Place all your `app.py`, `templates/`, and `requirements.txt` files here.

### 3. Update the README
Add your new project to the "Portfolio at a Glance" table in the root `README.md`.
