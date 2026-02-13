---
title: "Interactive Onboarding Checklist"
date: 2026-02-12
summary: "A zero-dependency, browser-based onboarding application proof-of-concept. Features local persistence, gamification, and a responsive design."
tags: ["HTML", "CSS", "JavaScript", "PoC"]
weight: 3
---

## Project Overview

This project is a Proof-of-Concept (PoC) for a lightweight, interactive employee onboarding checklist. The goal was to create an engaging, "zero-config" application that requires no installation or backend infrastructure.

### Key Features
*   **Zero Dependencies**: Built with pure HTML5, CSS3, and Vanilla JavaScript.
*   **Local Persistence**: Uses browser's `localStorage` to save progress, so users can close and reopen the page without losing their checklist state.
*   **Gamification**: Includes a visual progress bar and a confetti celebration upon 100% completion.
*   **Responsive Design**: Mobile-friendly interface with modern styling.

## 🚀 Live Demo

Experience the application directly in your browser:

[👉 **Launch Onboarding App**](https://0xthijs.github.io/demos/onboarding-poc/index.html)

---

### Technical Highlights

The application demonstrates how powerful standard web technologies can be without the complexity of modern frameworks.

**Code Snippet (Persistence Logic):**
```javascript
function saveState() {
    localStorage.setItem('onboardingCompletedTasks', JSON.stringify(completedTasks));
}

// Load on startup
let completedTasks = JSON.parse(localStorage.getItem('onboardingCompletedTasks')) || [];
```
