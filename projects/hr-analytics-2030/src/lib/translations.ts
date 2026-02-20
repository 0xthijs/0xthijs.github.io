export type Language = 'en' | 'nl';

export const translations = {
    en: {
        // Navigation
        "nav.dashboard": "Dashboard",
        "nav.upload": "Upload data",
        "nav.plan": "Workforce plan",
        "nav.settings": "Settings",

        // Dashboard
        "dash.title": "HR Analytics 2030",
        "dash.subtitle": "Privacy-first workforce intelligence",
        "dash.total_employees": "Total employees",
        "dash.avg_salary": "Avg salary",
        "dash.flight_risk": "High flight risk",
        "dash.risk_label": "High risk",
        "dash.retirement_risk": "Retirement risk",
        "dash.tenure": "Avg tenure (yrs)",

        // Upload
        "upload.title": "Upload employee data",
        "upload.desc": "Processing happens locally in your browser. No data leaves your device.",
        "upload.dropzone": "Drag & drop CSV here, or click to select",
        "upload.columns": "Required columns:",
        "upload.success": "Successfully processed",
        "upload.error": "Error processing file",
        "upload.reset": "Reset data",

        // Plan
        "plan.title": "Workforce scenario planning",
        "plan.subtitle": "Strategic hiring roadmap based on predictive modeling",
        "plan.growth_target": "Growth target (YoY)",
        "plan.growth_desc": "Positive % = Expanding the team. Negative % = Downsizing.",
        "plan.contraction": "Contraction (-5%)",
        "plan.high_growth": "High growth mode (20%)",
        "plan.current_headcount": "Current headcount",
        "plan.projected_headcount": "Projected headcount",
        "plan.hiring_gap": "Hiring gap",
        "plan.dept_breakdown": "Department breakdown",
        "plan.exec_summary": "Executive summary",
        "plan.summary_template": "To meet 2030 goals, we need to hire {0} new employees across all departments, accounting for {1} retirements and predicted attrition.",
        "plan.forecast_template": "This forecast assumes a consistent {0}% year-over-year growth rate. Key risk areas include Engineering (high attrition probability) and Operations (retirement wave in 2028).",
        "plan.recommendation": "Recommendation",
        "plan.rec_text": "Initiate a \"Knowledge Transfer\" program immediately for the {0} senior employees identified as retiring within the strategic window.",
        "plan.total_impact": "Total impact",
        "plan.positions_fill": "Positions to fill by 2030",
        "plan.cost_attrition": "Cost of attrition (est.)",
        "plan.recruitment_training": "Recruitment & training",

        // Insights
        "insight.title": "Strategic insight",
        "insight.desc": "Strategic insights are generated based on the current workforce data.",
        "insight.engineering": "Engineering faces the highest replacement need due to market attrition factors.",
        "insight.sales": "Sales growth targets require aggressive hiring starting Q3 2026.",
    },
    nl: {
        // Navigation
        "nav.dashboard": "Dashboard",
        "nav.upload": "Data uploaden",
        "nav.plan": "Personeelsplanning",
        "nav.settings": "Instellingen",

        // Dashboard
        "dash.title": "HR Analytics 2030",
        "dash.subtitle": "Privacy-first personeelsinformatie",
        "dash.total_employees": "Totaal werknemers",
        "dash.avg_salary": "Gem. salaris",
        "dash.flight_risk": "Hoog verlooprisico",
        "dash.risk_label": "Hoog risico",
        "dash.retirement_risk": "Pensioenrisico",
        "dash.tenure": "Gem. dienstjaren",

        // Upload
        "upload.title": "Upload werknemersdata",
        "upload.desc": "Verwerking gebeurt lokaal in uw browser. Geen data verlaat uw apparaat.",
        "upload.dropzone": "Sleep CSV hierheen of klik om te selecteren",
        "upload.columns": "Vereiste kolommen:",
        "upload.success": "Succesvol verwerkt",
        "upload.error": "Fout bij verwerken bestand",
        "upload.reset": "Data resetten",

        // Plan
        "plan.title": "Scenario planning",
        "plan.subtitle": "Strategische routekaart op basis van voorspellende modellen",
        "plan.growth_target": "Groeidoelstelling (jaar-op-jaar)",
        "plan.growth_desc": "Positief % = Uitbreiding. Negatief % = Inkrimping.",
        "plan.contraction": "Krimp (-5%)",
        "plan.high_growth": "Hoge groei (20%)",
        "plan.current_headcount": "Huidig personeelsbestand",
        "plan.projected_headcount": "Verwacht personeelsbestand",
        "plan.hiring_gap": "Wervingsbehoefte",
        "plan.dept_breakdown": "Afdelingsoverzicht",
        "plan.exec_summary": "Managementsamenvatting",
        "plan.summary_template": "Om de doelen van 2030 te halen, moeten we {0} nieuwe werknemers aannemen, rekening houdend met {1} pensioneringen en voorspeld verloop.",
        "plan.forecast_template": "Deze prognose gaat uit van een consistente groei van {0}%. Risicogebieden zijn Engineering (hoog verloop) en Operations (pensioengolf in 2028).",
        "plan.recommendation": "Aanbeveling",
        "plan.rec_text": "Start direct een \"Kennisoverdracht\" programma voor de {0} senior medewerkers die binnenkort met pensioen gaan.",
        "plan.total_impact": "Totale impact",
        "plan.positions_fill": "In te vullen functies tot 2030",
        "plan.cost_attrition": "Kosten van verloop (schatting)",
        "plan.recruitment_training": "Werving & opleiding",

        // Insights
        "insight.title": "Strategisch inzicht",
        "insight.desc": "Inzichten worden gegenereerd op basis van de huidige personeelsdata.",
        "insight.engineering": "Engineering heeft de hoogste vervangingsvraag door marktgebonden verloop.",
        "insight.sales": "Verkoopdoelstellingen vereisen agressieve werving vanaf Q3 2026.",
    }
};
