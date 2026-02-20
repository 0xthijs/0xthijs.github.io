import { generateMockData } from './seed';
import { Employee } from '@/types';

// Helper to convert Employee[] to CSV string
function employeesToCSV(employees: Employee[]): string {
    const header = 'id,name,department,role,age,gender,tenure,salary,performanceRating\n';
    const rows = employees.map(e =>
        `${e.id},"${e.name}",${e.department},"${e.role}",${e.age},${e.gender},${e.tenure},${e.salary},${e.performanceRating}`
    ).join('\n');
    return header + rows;
}

// Log the CSV content so I can write it to file
const data = generateMockData(250);
console.log(employeesToCSV(data));
