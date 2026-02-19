---
title: "📜 Automated Contract Generator"
date: 2026-02-12
tags: ["Tool", "Vanilla JS", "Data Governance"]
type: "Tool"
summary: "A browser-based engine that generates error-free employment contracts in real-time, eliminating manual drafting mistakes."
demo: "https://0xthijs.github.io/demos/automated-contract-generator/index.html"
weight: 12
---

## What It Does
The Automated Contract Generator is a client-side tool that transforms standardized HR templates into dynamic, interactive forms. It allows HR generalists to draft complex employment agreements by simply filling out a structured questionnaire, with changes reflected instantly in a print-ready document.

## The Problem It Solves
Drafting employment contracts manually using "Find & Replace" is error-prone and time-consuming. Legal teams often struggle to enforce version control, leading to outdated clauses being sent to candidates.

## How It Works
The application uses **Vanilla JavaScript** to create a reactive DOM binding system. It maps input fields directly to span elements within the contract text, updating content in real-time as the user types. The system runs entirely in the browser, ensuring candidate data privacy by never sending PII to a server.

## Key Features
- **Dynamic Template Injection**: Text fields and variables update instantly across the entire document as inputs change.
- **Smart Formatting**: Automatically handles currency localization (e.g., converting inputs to `$120,000`) and date formats.
- **Privacy-First Architecture**: Zero backend dependency means sensitive candidate data never leaves the user's device.

## Results / Impact
Reduces contract drafting time from 20 minutes to under 2 minutes per candidate while eliminating formatting errors and ensuring 100% compliance with the current legal template.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | HTML5 / CSS3 / Vanilla JS |
| Logic | DOM Manipulation API |
| Deployment | GitHub Pages |

[View Code](https://github.com/0xthijs/demos/tree/main/automated-contract-generator)
