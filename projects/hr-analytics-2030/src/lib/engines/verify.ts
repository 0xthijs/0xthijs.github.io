import { generateMockData } from '../seed';
import { generate2030Plan } from './planGenerator';
import { predictAttrition } from './attrition';

// Run verification
async function runTest() {
    console.log('Generating 50 mock employees...');
    const employees = generateMockData(50);

    console.log('Running Attrition Engine...');
    const risks = predictAttrition(employees);
    let highRiskCount = 0;
    risks.forEach(r => {
        if (r.riskLevel === 'High') highRiskCount++;
    });
    console.log(`High Risk Employees: ${highRiskCount}`);

    console.log('Running 2030 Plan Generator...');
    const plan = generate2030Plan(employees);

    console.log('--- 2030 PLAN REPORT ---');
    console.log(`Total Employees: ${plan.totalEmployees}`);
    console.log(`Total Retirements by 2030: ${plan.totalRetirements}`);
    console.log(`High Risk Attrition (Plan Scope): ${plan.highRiskAttrition}`);

    console.log('--- Departmental Needs ---');
    plan.departmentalPlans.forEach(d => {
        console.log(`${d.department}: Need ${d.totalHiringTarget} (Growth: ${d.projectedGrowthNeed}, Replacement: ${d.replacementNeed})`);
    });
}

runTest();
