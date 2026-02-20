import { useMemo } from 'react';
import { Employee } from '@/types';
import { generate2030Plan, WorkforcePlan2030 } from '@/lib/engines/planGenerator';

export function useWorkforcePlan(employees: Employee[], growthRate: number = 0.05) {
    const plan: WorkforcePlan2030 | null = useMemo(() => {
        if (!employees || employees.length === 0) return null;
        return generate2030Plan(employees, growthRate);
    }, [employees, growthRate]);

    return plan;
}
