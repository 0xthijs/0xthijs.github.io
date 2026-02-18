# 🧠 SkillFlex: Enterprise AI Agent for Internal Mobility
> **Strategic Outcome:** Reducing "Silent Attrition" by 15% via AI-driven opportunity matching.

[![Status](https://img.shields.io/badge/Status-Production_Ready-success)]()
[![Stack](https://img.shields.io/badge/Tech-Google_Gemini_Pro_%7C_Python_%7C_Tailwind-blue)]()
[![Architecture](https://img.shields.io/badge/Architecture-Service_Oriented-orange)]()

## 💼 Executive Summary
**The Problem:** High-performing employees often leave because they cannot find internal growth opportunities. Traditional HR systems (LMS/HRIS) rely on static, outdated skills data.

**The Solution:** SkillFlex is an AI-native "Internal Mobility Engine" that creates a dynamic marketplace for talent. It uses **Google Gemini Pro** to infer "Live Skills" from unstructured data and matches employees to gigs based on a **Retention-Weighted Algorithm**.

---

## 🏗️ System Architecture
*Visualizing the data flow from Unstructured Input to Strategic Match.*

```mermaid
graph TD
    A[Employee Profile] -->|Unstructured Data| B(Ingestion Pipeline)
    B -->|Context Window| C{Gemini Pro Agent}
    C -->|Structured JSON| D[Skills Database]
    E[Manager Gigs] -->|Requirements| F[Matching Engine]
    D --> F
    F -->|Weighted Jaccard Algo| G[Opportunity Feed]
    
    subgraph "AI Logic Layer"
    C
    F
    end
    
    subgraph "Retention Safeguard"
    H[Attrition Risk Flags] -.->|Boost Score| F
    end
```

## 📺 Product Capabilities

### 1. The "Retention-First" Marketplace
SkillFlex doesn't just match keywords; it prioritizes business continuity.

**Live Demo:**
![SkillFlex Enterprise Demo](../../static/images/skillflex-demo-v3.webp)

### 2. Core Modules

| Module | Function | Tech Stack |
| :--- | :--- | :--- |
| **Talent Ingestion** | Infers 5 Hard + 3 Soft skills from unstructured role/bio data. | `Google Gemini Pro` |
| **Matching Engine** | Calculates `Jaccard Similarity` + `Flight Risk Boost` (1.2x multiplier). | `Python` / `Pandas` |
| **Manager Dashboard** | Visualizes "At Risk" talent and distribution. | `Flask` / `Tailwind` |
| **Employee Portal** | Personalized gig feed with "Why this matches you" explainability. | `Jinja2` / `Alpine.js` |

---

## 🛠️ Technical Implementation

### Prerequisites
*   Python 3.10+
*   Google Gemini API Key

### Quick Start
```bash
# 1. Install Dependencies
pip install -r requirements.txt

# 2. Configure Environment
# Create .env and add: GOOGLE_API_KEY=your_key

# 3. Run Ingestion (ETL)
# (Optional: uses Gemini to re-infer skills from raw data)
python ingestion.py

# 4. Launch Application
python app.py
```
