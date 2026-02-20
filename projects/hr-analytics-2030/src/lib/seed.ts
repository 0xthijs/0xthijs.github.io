import { db } from './db';
import { Employee, Department } from '@/types';

const DEPARTMENTS: Department[] = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
const ROLES: Record<Department, string[]> = {
    Engineering: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Engineering Manager'],
    Sales: ['Sales Representative', 'Account Executive', 'Sales Manager', 'SDR'],
    Marketing: ['Content Strategist', 'SEO Specialist', 'Marketing Manager', 'Growth Hacker'],
    HR: ['HR Specialist', 'Recruiter', 'People Ops Manager', 'HR BP'],
    Finance: ['Accountant', 'Financial Analyst', 'Controller', 'CFO'],
    Operations: ['Operations Manager', 'Project Manager', 'Supply Chain Analyst']
};

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a random UUID-like string
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function generateMockData(count: number = 250): Employee[] {
    const employees: Employee[] = [];

    for (let i = 0; i < count; i++) {
        const dept = randomChoice(DEPARTMENTS);
        const role = randomChoice(ROLES[dept]);
        const age = randomInt(22, 64);

        // Heuristic: Tenure correlates slightly with Age, but not strictly
        const maxTenure = Math.max(0, age - 22);
        const tenure = Math.min(randomInt(0, 15), maxTenure);

        // Heuristic: Salary based on dept and role tiers (simplified)
        let baseSalary = 50000;
        if (dept === 'Engineering' || dept === 'Finance') baseSalary = 80000;
        if (role.includes('Manager') || role.includes('CFO')) baseSalary *= 1.5;
        const salary = Math.floor(baseSalary + (tenure * 2000) + randomInt(-5000, 15000));

        employees.push({
            id: generateUUID(),
            name: `Employee ${i + 1}`, // Clean for demo, can use faker if requested
            department: dept,
            role: role,
            age: age,
            gender: randomChoice(['Male', 'Female', 'Non-binary']),
            tenure: tenure,
            salary: salary,
            performanceRating: randomChoice([1, 2, 3, 3, 3, 4, 4, 5]) as 1 | 2 | 3 | 4 | 5, // Weighted towards average
        });
    }
    return employees;
}

export async function seedDatabase() {
    const count = await db.employees.count();
    if (count === 0) {
        console.log('Seeding database with mock data...');
        const data = generateMockData(250);
        await db.employees.bulkAdd(data);
        console.log('Database seeded successfully.');
    } else {
        console.log(`Database already contains ${count} records.`);
    }
}
