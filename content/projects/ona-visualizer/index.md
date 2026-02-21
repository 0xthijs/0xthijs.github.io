---
title: "🕸️ ONA Visualizer"
date: 2026-02-13
tags: ["Tool", "Vanilla JS", "Org Design"]
type: "Tool"
summary: "A browser-based Organizational Network Analysis tool that visualizes informal communication flows to spot hidden influencers and isolated teams."
demo: "https://0xthijs.github.io/demos/ona-visualizer/index.html"
weight: 19
---

## What It Does
The ONA Visualizer maps the "Invisible Organization"—the informal web of communication that actually drives work. It visualizes connections between employees to reveal who is truly influential and who is becoming isolated.

## The Problem It Solves
Traditional org charts only show reporting lines, masking the reality of how collaboration happens. This leads to blind spots where key influencers burn out unnoticed, or remote teams become siloed from the core business.

## How It Works
The tool uses **D3.js** to render a force-directed graph where nodes represent employees and links represent communication frequency. It serves as a privacy-first, client-side PoC that runs directly in the browser without backend data storage.

## Key Features
- **Network Strength Scoring**: Identifies "Hubs" (informal leaders) whose departure would fracture the network.
- **Proximity Bias Detection**: Visualizes the disconnect between "Remote" (Purple) and "In-Office" (Green) clusters.
- **Retention Risk Analysis**: Highlights critical nodes that are "single points of failure" for information flow.

## Results / Impact
Visualized the isolation of the "Remote" cluster, providing data-backed evidence to support a new hybrid integration program.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | HTML5 / CSS3 |
| Visualization | D3.js v7 |
| Logic | Vanilla JavaScript |
| Deployment | GitHub Pages |

[View Code](https://github.com/0xthijs/demos/tree/main/ona-visualizer)
