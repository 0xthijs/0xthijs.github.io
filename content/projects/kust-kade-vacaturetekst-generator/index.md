---
title: "✍️ Vacaturetekst Generator — Kust & Kade"
date: 2026-03-24
tags: ["Tool", "AI", "Recruitment", "Claude API", "Kust & Kade"]
type: "Tool"
summary: "An AI tool that generates professional, inclusive job postings in seconds — tailored to Kust & Kade's tone of voice and HR standards."
demo: "https://0xthijs.github.io/demos/kust-kade-vacaturetekst-generator/index.html"
weight: 21
---

## What It Does

HR professionals fill in a short form (role, department, requirements, tone) and the tool generates a complete, ready-to-use job posting. Output can be downloaded directly as a formatted document. The tool ensures every vacancy aligns with company standards and follows inclusion best practices.

[🚀 **Launch Live Demo**](https://0xthijs.github.io/demos/kust-kade-vacaturetekst-generator/index.html)

## The Problem It Solves

Writing compelling, inclusive job postings from scratch is time-consuming and inconsistent across teams. Different departments create postings with varying quality, tone, and alignment with company values. This leads to missed talent, poor candidate experience, and brand inconsistency. This tool ensures quality and brand consistency with minimal effort, allowing HR to publish professional vacancies quickly without manual writing or review cycles.

## How It Works

Form inputs are combined into a structured prompt and sent to the Claude API via a Cloudflare Worker proxy. The model generates a full job posting that follows inclusion guidelines and Kust & Kade's tone of voice. The AI uses company-specific context to ensure the output matches brand expectations and company culture.

## Key Features

- **Form-based input**: Simple fields for role details (title, department, level, requirements)
- **AI-generated inclusive job descriptions**: Automatically incorporates inclusive language and diversity principles
- **One-click download**: Export ready-to-use job posting as a formatted document
- **Branded Kust & Kade design**: Consistent with company visual identity
- **Supports various roles and departments**: Flexible enough for technical, operational, management, and support positions

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML/CSS/JavaScript (vanilla) |
| API | Claude API |
| Infrastructure | Cloudflare Workers (proxy) |
| Typography | Google Fonts |
