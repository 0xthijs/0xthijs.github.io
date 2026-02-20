import Dexie, { type EntityTable } from 'dexie';
import { Employee, HistoricalTurnover } from '@/types';

// Define the database schema
const db = new Dexie('HRAnalyticsDB') as Dexie & {
    employees: EntityTable<Employee, 'id'>,
    historical_turnover: EntityTable<HistoricalTurnover, 'id'>
};

// Schema declaration:
// We only index properties we intend to query by in where() clauses.
db.version(1).stores({
    employees: 'id, department, role, age, tenure, performanceRating',
    historical_turnover: '++id, year, department'
});

export { db };
