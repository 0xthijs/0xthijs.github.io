---
title: "🤖 HR Assistent — Kust & Kade"
date: 2026-03-24
tags: ["Tool", "AI", "HR", "Claude API", "Kust & Kade"]
type: "Tool"
summary: "An AI-powered HR assistant that gives instant, 24/7 answers to employee questions about collective labor agreements, leave, and absence policies — built for Kust & Kade."
demo: "https://0xthijs.github.io/demos/kust-kade-hr-assistent/index.html"
weight: 20
---

## What It Does

A conversational AI chatbot specifically configured for HR questions. Employees can ask questions about CAO (collective labor agreement), leave entitlements, sick leave procedures and get instant, accurate answers at any time of day. The tool provides 24/7 support without requiring HR staff intervention for routine policy questions.

[🚀 **Launch Live Demo**](https://0xthijs.github.io/demos/kust-kade-hr-assistent/index.html)

## The Problem It Solves

HR teams spend a large portion of their time answering repetitive policy questions. This constant context-switching diverts strategic HR work and leaves employees waiting for answers. When HR is unavailable, employees struggle to find clear answers to common questions about their rights, entitlements, and procedures. This tool offloads those routine queries so HR can focus on strategic work while employees get instant answers whenever they need them.

## How It Works

The tool uses the Claude API (routed via a Cloudflare Worker proxy) to power a branded chat interface. Responses are grounded in Kust & Kade HR policy context passed in the system prompt. The system ensures consistency and accuracy by providing the AI with a complete HR policy reference, so answers are always aligned with company standards.

## Key Features

- **24/7 instant answers**: No waiting for HR availability
- **Conversational chat interface**: Natural, multi-turn conversation with message history
- **Branded Kust & Kade design**: Fully customized with company colors and tone of voice
- **Mobile-friendly layout**: Works seamlessly on any device
- **AI-powered with Claude**: Leverages Claude's natural language understanding for accurate HR guidance

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML/CSS/JavaScript (vanilla) |
| API | Claude API |
| Infrastructure | Cloudflare Workers (proxy) |
| Typography | Google Fonts |
