---
title: "📜 Automated Contract Generator"
date: 2026-02-12
summary: "A browser-based tool for generating employment contracts. Features dynamic form binding, real-time preview, and print-ready output."
tags: ["Legal Tech", "JavaScript", "HTML/CSS", "PoC"]
---

## 🚀 Project Overview

This tool addresses the issue of manual contract drafting. It serves as a "Legal Atelier," offering a minimalist interface to draft standard employment agreements without the error-prone "Find & Replace" method.

### ✨ Key Features
*   **Dynamic Drafting**: The contract preview updates instantly as you type in the form details.
*   **Smart Formatting**: Automatically handles currency formatting (e.g., transforming `120000` to `120,000`) and date localization.
*   **Clean Output**: Generates a print-ready document by hiding the UI during printing.
*   **Zero Backend**: Runs entirely in the browser for privacy and speed.

## 📺 Live Demo

Draft a sample contract here:

[👉 **Launch Contract Generator**](https://0xthijs.github.io/demos/automated-contract-generator/index.html)

---

### 🛠️ Technical Highlights

The project uses Vanilla JavaScript to create a reactive experience without frameworks.

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
