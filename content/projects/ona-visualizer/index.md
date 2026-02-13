---
title: "Organizational Network Visualizer"
date: 2026-02-13
summary: "Mapping the 'Invisible Organization'. A strategic tool to visualize communication flow, identify hidden influencers, and prevent burnout before it happens."
tags: ["HR Analytics", "D3.js", "Network Analysis", "AI Engineering"]
weight: 1
---

## 🚀 Experience the "Invisible Organization"

[👉 **Launch the Interactive Visualizer**](https://0xthijs.github.io/hr-ai-portfolio/demos/ona-visualizer/index.html)

---

## 1. The Business Case: Why ONA Matters?

Traditional Org Charts are static lines of reporting. They tell you who **should** be talking.
**Organizational Network Analysis (ONA)** reveals who **is** talking. It maps the informal structure of your company—the "Invisible Organization."

As HR Business Partners, we often rely on intuition to answer critical questions. This tool turns that intuition into data.

### Strategic Lenses (View Modes)

This Proof of Concept (PoC) focuses on four specific strategic questions:

1.  **🔍 Influence & Bottlenecks ("The Hidden Leaders")**
    *   *Question:* Who are the people holding the team together?
    *   *Insight:* Often, your most critical employees aren't managers. They are "Hubs"—informal leaders who bridge gaps. If they leave, the network fractures.

2.  **🚨 Flight Risk ("Proactive Retention")**
    *   *Question:* What happens if our high-risk employees leave?
    *   *Insight:* ONA overlays "Flight Risk" models onto the network. It highlights **Critical Points of Failure**—high-influence nodes that are at risk of turnover.

3.  **🏠 Work Mode Integration ("Hybrid Culture")**
    *   *Question:* Is "Hybrid" working, or are we creating two separate companies?
    *   *Insight:* By visualizing Remote vs. Office employees, we can spot "Proximity Bias"—where office workers only talk to office workers, isolating remote talent.

4.  **🌱 Onboarding Speed ("New Hire Integration")**
    *   *Question:* Are new hires integrating?
    *   *Insight:* Healthy onboarding looks like movement toward the center. If a 6-month employee is still on the periphery, we need to intervene.

---

## 2. How We Built This: AI-First Engineering

This project is not just a demonstration of HR Analytics; it is a demonstration of **AI-Augmented Development**.

I built this entire application—from concept to code—using an **AI Pair Programmer**.

### The Workflow

1.  **Strategic Prompting**:
    *   I defined the *business problem* (HRBPs need to see the "Invisible Organization").
    *   I asked the AI to "think like an HRBP" to define the categories (Influence, Retention, Work Mode).

2.  **Rapid Prototyping (D3.js)**:
    *   I used the AI to generate the complex **D3.js** force-directed graph logic. Writing this physics simulation manually would take days; with AI, it took minutes.
    *   *Key Command:* "Create a force-directed graph where node size equals centrality and color represents department."

3.  **Mock Data Generation**:
    *   To make the PoC realistic, I asked the AI to generate a "Story" in the data: *Create a scenario with an isolated 'Remote' cluster and a high-risk 'Key Influencer' named Sanne.*
    *   The AI generated the JSON structure that reflects this exact organizational tension.

4.  **Client-Side Privacy**:
    *   A key constraint was privacy. I instructed the AI to build a **Zero-Backend** solution. All data processing happens locally in your browser. No employee data is ever uploaded.

### Outcome
We moved from a "cool idea" to a **functioning, interactive MVP** in less than 24 hours. This showcases how HR Tech leaders can use AI to rapidly prototype solutions before committing expensive engineering resources.

---

## 3. Technical Specs
*   **Architecture**: Static HTML/JS (Serverless)
*   **Visualization**: [D3.js v7](https://d3js.org/)
*   **Styling**: Custom CSS ("Legal Atelier" Theme)
*   **Deployment**: GitHub Pages
