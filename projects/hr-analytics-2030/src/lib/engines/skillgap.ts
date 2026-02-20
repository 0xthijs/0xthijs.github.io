import { Department } from '@/types';

export interface HiringNeed {
    department: Department;
    currentHeadcount: number;
    projectedGrowthNeed: number;
    replacementNeed: number; // Retirements + Attrition
    totalHiringTarget: number;
}

export function calculateHiringNeeds(
    department: Department,
    currentHeadcount: number,
    growthRate: number, // 0.05 for 5%
    predictedExits: number // Retirement + High Risk Attritions
): HiringNeed {
    const growthNeed = Math.ceil(currentHeadcount * growthRate);
    const totalNeed = growthNeed + predictedExits;

    return {
        department,
        currentHeadcount,
        projectedGrowthNeed: growthNeed,
        replacementNeed: predictedExits,
        totalHiringTarget: totalNeed,
    };
}
