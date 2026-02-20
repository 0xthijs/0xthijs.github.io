import { Employee, Department } from '@/types';
import { calculateRetirements } from './retirement';
import { predictAttrition } from './attrition';
import { calculateHiringNeeds, HiringNeed } from './skillgap';

export interface WorkforcePlan2030 {
    totalEmployees: number;
    totalRetirements: number; // By 2030
    highRiskAttrition: number;
    departmentalPlans: HiringNeed[];
    summary: string;
}

export function generate2030Plan(
    employees: Employee[],
    targetGrowthRate: number = 0.05
): WorkforcePlan2030 {
    const currentYear = new Date().getFullYear();
    const targetYear = 2030;

    // 1. Run Engines
    const retirements = calculateRetirements(employees, currentYear);
    const attritionRisks = predictAttrition(employees);

    // 2. Aggregate by Department
    const departments: Department[] = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
    const departmentalPlans: HiringNeed[] = [];

    let totalHighRisk = 0;
    let totalRetiringBy2030 = 0;

    departments.forEach(dept => {
        const deptEmployees = employees.filter(e => e.department === dept);
        const headcount = deptEmployees.length;

        // Count retirements in this department by 2030
        const deptRetirements = retirements.filter(r => r.department === dept && r.retirementYear <= targetYear).length;

        // Count high risk attrition
        const deptHighRisk = deptEmployees.filter(e => {
            const risk = attritionRisks.get(e.id);
            return risk?.riskLevel === 'High';
        }).length;

        totalRetiringBy2030 += deptRetirements;
        totalHighRisk += deptHighRisk;

        // Simplified logic: Assume 50% of high risk employees leave over 5 years + 100% of retirements
        const predictedExits = deptRetirements + Math.ceil(deptHighRisk * 0.5);

        departmentalPlans.push(
            calculateHiringNeeds(dept, headcount, targetGrowthRate, predictedExits)
        );
    });

    return {
        totalEmployees: employees.length,
        totalRetirements: totalRetiringBy2030,
        highRiskAttrition: totalHighRisk,
        departmentalPlans,
        summary: `To meet 2030 goals, we need to hire ${departmentalPlans.reduce((acc, curr) => acc + curr.totalHiringTarget, 0)} new employees across all departments, accounting for ${totalRetiringBy2030} retirements and predicted attrition.`,
    };
}
