import { Employee } from '@/types';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface AttritionRisk {
    employeeId: string;
    riskScore: number; // 0.0 to 1.0 (Higher is riskier)
    riskLevel: RiskLevel;
    primaryFactor: string;
}

export function predictAttrition(employees: Employee[]): Map<string, AttritionRisk> {
    const riskMap = new Map<string, AttritionRisk>();

    // Calculate average salary per department/role to compare
    // For simplicity MVP, we'll use raw heuristics

    employees.forEach((emp) => {
        let score = 0.1; // Baseline risk
        let factors: string[] = [];

        // Factor 1: Tenure
        // "The 3-Year Itch": Risk spikes at 2-4 years
        if (emp.tenure >= 2 && emp.tenure <= 4) {
            score += 0.3;
            factors.push('Tenure Cliff (2-4y)');
        } else if (emp.tenure > 10) {
            score -= 0.1; // Loyal
        }

        // Factor 2: Performance vs Salary (Flight Risk)
        // High performer (5) but salary < 70k (simplified heuristic)
        if (emp.performanceRating === 5 && emp.salary < 70000) {
            score += 0.4;
            factors.push('High Performer / Low Salary');
        }

        // Factor 3: Role Stagnation
        // High tenure in same role (simplified: assuming role change resets tenure, which isn't tracked here, so using total tenure vs age)
        if (emp.age < 35 && emp.tenure > 5) {
            score += 0.2;
            factors.push('Stagnation Risk');
        }

        // Cap score
        score = Math.min(0.95, Math.max(0.05, score));

        let level: RiskLevel = 'Low';
        if (score > 0.6) level = 'High';
        else if (score > 0.3) level = 'Medium';

        riskMap.set(emp.id, {
            employeeId: emp.id,
            riskScore: parseFloat(score.toFixed(2)),
            riskLevel: level,
            primaryFactor: factors[0] || 'General Market Turnover',
        });
    });

    return riskMap;
}
