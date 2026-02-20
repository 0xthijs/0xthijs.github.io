import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Employee } from '@/types';

export function useEmployees() {
    const employees = useLiveQuery(
        () => db.employees.toArray(),
        []
    );

    const isLoading = employees === undefined;

    return {
        employees: employees || [],
        isLoading,
        count: employees?.length || 0
    };
}

export function useAddEmployees() {
    const addEmployees = async (newEmployees: Employee[]) => {
        try {
            await db.employees.bulkAdd(newEmployees);
            return true;
        } catch (error) {
            console.error('Failed to add employees:', error);
            return false;
        }
    };

    const clearEmployees = async () => {
        try {
            await db.employees.clear();
            return true;
        } catch (error) {
            console.error('Failed to clear employees:', error);
            return false;
        }
    };

    return { addEmployees, clearEmployees };
}
