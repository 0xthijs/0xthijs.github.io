---
title: "🧭 Ontwikkelkompas — Kust & Kade"
date: 2026-03-24
tags: ["Tool", "AI", "L&D", "Claude API", "Kust & Kade"]
type: "Tool"
summary: "An AI tool that transforms vague personal development goals into concrete 70-20-10 action plans — built for Kust & Kade's learning & development practice."
demo: "https://0xthijs.github.io/demos/kust-kade-ontwikkelkompas/index.html"
weight: 23
---

## What It Does

Employees or L&D coaches enter a development goal and the tool generates a structured 70-20-10 action plan: 70% on-the-job learning, 20% social/peer learning, 10% formal training — all concretely tailored to the goal. The result is an immediately actionable personal development roadmap.

[🚀 **Launch Live Demo**](https://0xthijs.github.io/demos/kust-kade-ontwikkelkompas/index.html)

## The Problem It Solves

Personal development plans (POPs) are often vague and quickly forgotten. Managers and employees struggle to translate intentions into concrete, measurable actions. The 70-20-10 learning model is powerful but requires expertise to apply. This tool bridges that gap by automatically structuring development goals into actionable, balanced learning plans that align with proven adult learning science.

## How It Works

The user's development goal is sent to the Claude API (via a Cloudflare Worker proxy) with a prompt designed around the 70-20-10 learning model. The AI returns a structured, actionable plan per category. Each section includes specific activities, resources, and milestones aligned to the employee's learning style and organizational context.

## Key Features

- **Input any development goal**: Natural language description of what the employee wants to learn or improve
- **AI-generated 70-20-10 structured action plan**: Automatically balances learning approaches
- **Clear breakdown across on-the-job / social / formal learning**: Easy to understand and execute
- **Branded Kust & Kade design**: Professional, on-brand presentation
- **Mobile-friendly**: Full functionality on phones, tablets, and desktops

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML/CSS/JavaScript (vanilla) |
| API | Claude API |
| Infrastructure | Cloudflare Workers (proxy) |
| Typography | Google Fonts |
