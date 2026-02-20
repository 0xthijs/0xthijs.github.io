export type Department = 'Engineering' | 'Sales' | 'Marketing' | 'HR' | 'Finance' | 'Operations';

export interface Employee {
    id: string; // UUID
    name: string;
    department: Department;
    role: string;
    age: number;
    gender: 'Male' | 'Female' | 'Non-binary';
    tenure: number; // Years
    salary: number; // Annual USD
    performanceRating: 1 | 2 | 3 | 4 | 5; // 1 (Low) to 5 (High)
    // Optional: For future expansion
    skills?: string[];
}

export interface HistoricalTurnover {
    id?: number; // Auto-increment
    year: number;
    department: Department;
    totalEmployees: number;
    leavers: number;
    turnoverRate: number; // Javascript float 0.0 to 1.0
}
