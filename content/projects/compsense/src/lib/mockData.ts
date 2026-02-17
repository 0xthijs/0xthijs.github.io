import { faker } from '@faker-js/faker';

export type Role = 'Junior' | 'Senior' | 'Staff' | 'Principal';

export interface Employee {
    id: string;
    name: string;
    role: Role;
    department: string;
    experience: number;
    salary: number;
    compaRatio: number;
}

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Sales', 'Marketing'];
const ROLES: Role[] = ['Junior', 'Senior', 'Staff', 'Principal'];

// Salary bands (Midpoints) - 2025 Market Rates
const SALARY_BANDS = {
    Junior: 112500,
    Senior: 165000,
    Staff: 230000,
    Principal: 300000,
};

export function generateEmployees(count: number): Employee[] {
    return Array.from({ length: count }).map(() => {
        const role = faker.helpers.arrayElement(ROLES);
        let experience: number;
        let minSalary: number;
        let maxSalary: number;

        // Correlate experience and salary ranges with role (2025 Benchmarks)
        switch (role) {
            case 'Junior':
                experience = faker.number.int({ min: 0, max: 3 });
                minSalary = 95000;
                maxSalary = 130000;
                break;
            case 'Senior':
                experience = faker.number.int({ min: 4, max: 8 });
                minSalary = 140000;
                maxSalary = 190000;
                break;
            case 'Staff':
                experience = faker.number.int({ min: 8, max: 12 });
                minSalary = 200000;
                maxSalary = 260000;
                break;
            case 'Principal':
                experience = faker.number.int({ min: 12, max: 15 });
                minSalary = 250000;
                maxSalary = 350000;
                break;
        }

        // Add some randomness but generally correlate salary with experience within the band
        // A simplified logic: base + (experience_in_band * consistency) + random_variance
        const salary = faker.number.int({ min: minSalary, max: maxSalary });

        // Calculate Compa-Ratio (Salary / Midpoint)
        const compaRatio = Number((salary / SALARY_BANDS[role]).toFixed(2));

        return {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            role,
            department: faker.helpers.arrayElement(DEPARTMENTS),
            experience,
            salary,
            compaRatio,
        };
    });
}
