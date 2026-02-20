import { Employee } from '@/types';

export const RETIREMENT_AGE = 65;

export interface RetirementPrediction {
    employeeId: string;
    employeeName: string;
    department: string;
    retirementYear: number;
    yearsToRetirement: number;
}

export function calculateRetirements(
    employees: Employee[],
    currentYear: number = new Date().getFullYear()
): RetirementPrediction[] {
    return employees
        .map((emp) => {
            const yearsToRetirement = Math.max(0, RETIREMENT_AGE - emp.age);
            const retirementYear = currentYear + yearsToRetirement;

            return {
                employeeId: emp.id,
                employeeName: emp.name,
                department: emp.department,
                retirementYear,
                yearsToRetirement,
            };
        })
        .filter((prediction) => prediction.yearsToRetirement <= 10) // Focus on next decade
        .sort((a, b) => a.retirementYear - b.retirementYear);
}
