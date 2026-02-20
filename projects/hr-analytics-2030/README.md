# HR Predictive Analytics 2030

**"How do you translate demographic data into a workforce plan for 2030?"**

This application answers that strategic question through a secure, local-first predictive analytics platform. Designed for HR leaders and Workforce Planners, it transforms raw employee data into actionable 5-year forecasts without ever sending sensitive PII to the cloud.

---

## 🚀 Value Proposition

In an era of data privacy concerns and cloud costs, **HR Predictive Analytics 2030** demonstrates a paradigm shift: **The Browser as the Backend.**

- **Zero Latency:** All processing happens instantly on the client device.
- **Privacy First:** Employee data is stored in IndexedDB (browser-native database) and never leaves the user's machine.
- **Predictive Power:** Client-side heuristics and machine learning models forecast retirement waves, attrition risks, and skill gaps in real-time.

## 🏗 Architecture (Local-First)

This project leverages a modern, serverless stack deployed as a static export:

- **Framework:** [Next.js 14](https://nextjs.org/) (Static Export / SPA Mode)
- **Database:** [Dexie.js](https://dexie.org/) (Wrapper for IndexedDB)
- **Visualization:** [Recharts](https://recharts.org/) for dynamic, responsive charts.
- **Data Processing:** TypeScript-based heuristic engines for Attrition and Retirement modeling.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a premium, clean aesthetic.

### Key Logic Engines
1.  **Retirement Engine:** Projects mandatory and voluntary retirements based on age demographics.
2.  **Attrition Heuristics:** multifactor model weighting Tenure, Performance, and Salary Band.
3.  **Skill Gap Calculator:** Derives net hiring needs from (Growth Targets + Attrition + Retirement).

## 🛠 Local Development Setup

To run this project locally and explore the code:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/hr-analytics-2030.git
    cd hr-analytics-2030
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the dashboard. The app will automatically seed mock data if the database is empty.

## 📦 Deployment Guide

This project is designed to be hosted on **GitHub Pages** (or any static host).

### Build for Production
To generate the static bundle:
```bash
npm run build
```
This command outputs the application to the `out/` directory, optimized for static serving.

### GitHub Pages Configuration
The project is configured with a `basePath` of `/projects/hr-analytics-2030` to reside within a portfolio repository.
- Ensure your GitHub Actions workflow deploys the `out/` folder.
- If hosting at the root domain, remove `basePath` and `assetPrefix` from `next.config.ts`.
