---
title: "👋 Zero-Dependency Onboarding"
date: 2026-02-12
tags: ["Tool", "Vanilla JS", "Onboarding"]
type: "Tool"
summary: "A zero-dependency, local-first onboarding checklist that gamifies the new hire experience without requiring any backend infrastructure."
demo: "https://0xthijs.github.io/demos/onboarding-poc/index.html"
weight: 20
---

## What It Does
This is a lightweight, purposeful Proof-of-Concept for an interactive employee onboarding checklist. It allows new hires to track their first-week tasks through a gamified interface that saves progress locally on their device, requiring no login or installation.

## The Problem It Solves
Enterprise onboarding tools are often heavy, slow, and require complex provisioning before a user can even log in. This creates a "chicken and egg" problem where the new hire needs the tool to get access to the tool.

## How It Works
The application leverages the browser's **LocalStorage API** to persist user data without a database. It is built with **Vanilla JavaScript** to ensure instant load times and zero dependency vulnerabilities.

## Key Features
- **Local Persistence**: Progress is saved to the browser, surviving page reloads or browser restarts.
- **Zero-Friction Access**: No login, no servers, no installation—just a URL.
- **Gamified Progress**: Visual completion bars and "celebration" states to drive user engagement.

## Results / Impact
Demonstrated the viability of "Micro-Apps" for HR: lightweight tools that solve specific problems without adding to the enterprise tech bloat.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | HTML5 / CSS3 |
| Logic | Vanilla JavaScript |
| Persistence | LocalStorage API |
| Deployment | GitHub Pages |

[View Code](https://github.com/0xthijs/demos/tree/main/onboarding-poc)
