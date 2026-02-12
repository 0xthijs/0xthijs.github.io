---
title: "Automated Contract Generator"
date: 2026-02-12
summary: "A sleek, browser-based tool for generating employment contracts. Features dynamic form binding, real-time preview, and print-ready output."
tags: ["Legal Tech", "JavaScript", "HTML/CSS", "PoC"]
weight: 3
---

## Project Overview

This tool solves the common HR pain point of manual contract drafting. It serves as a **"Legal Atelier"**, offering a minimalist, high-end interface to draft standard employment agreements without the error-prone "Find & Replace" method.

### Key Features
*   **Dynamic Drafting**: The contract preview updates instantly as you type in the form details.
*   **Smart Formatting**: Automatically handles currency formatting (e.g., transforming `120000` to `120,000`) and date localization.
*   **Clean Output**: Generates a distraction-free, print-ready document by hiding the UI during printing.
*   **Zero Backend**: Runs entirely in the browser for maximum privacy and speed.

## 🚀 Live Demo

Draft a sample contract right now:

[👉 **Launch Contract Generator**](/demos/automated-contract-generator/index.html)

---

### Technical Highlights

The project uses Vanilla JavaScript to create a reactive experience without heavy frameworks.

**Code Snippet (Dynamic Template Injection):**
```javascript
// Updates text fills in real-time
document.querySelectorAll('.fill').forEach(span => {
    const key = span.getAttribute('data-key');
    let value = data[key];
    
    // Auto-format currency
    if (key === 'salary' && value) {
        value = Number(value).toLocaleString();
    }
    
    span.textContent = value || '_______'; // Clean empty state
});
```
