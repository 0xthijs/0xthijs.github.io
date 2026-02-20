'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { useAddEmployees } from '@/hooks/useEmployees';
import { Employee } from '@/types';
import { FaCloudUploadAlt, FaCheckCircle, FaExclamationCircle, FaUndo } from 'react-icons/fa';

export default function UploadPage() {
    const { addEmployees, clearEmployees } = useAddEmployees();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: async (results) => {
                if (results.data && results.data.length > 0) {
                    // Helper to normalize keys (remove spaces, lowercase)
                    const normalizeKey = (key: string) => key.trim().toLowerCase().replace(/\s+/g, '');

                    // Map of normalized CSV headers to Schema keys
                    const keyMap: Record<string, keyof Employee> = {
                        'id': 'id', 'employeeid': 'id',
                        'name': 'name', 'employeename': 'name', 'fullname': 'name',
                        'department': 'department', 'dept': 'department',
                        'role': 'role', 'jobtitle': 'role', 'position': 'role',
                        'age': 'age',
                        'gender': 'gender',
                        'tenure': 'tenure', 'yearsofservice': 'tenure',
                        'salary': 'salary', 'annualsalary': 'salary',
                        'performancerating': 'performanceRating', 'rating': 'performanceRating', 'perf': 'performanceRating'
                    };

                    // Sanitize and Map Data
                    const validData: Employee[] = results.data
                        .map((rawRow: any) => {
                            const newRow: any = {};
                            Object.keys(rawRow).forEach(csvKey => {
                                const cleanKey = normalizeKey(csvKey);
                                const schemaKey = keyMap[cleanKey];
                                if (schemaKey) {
                                    newRow[schemaKey] = rawRow[csvKey];
                                }
                            });
                            return newRow;
                        })
                        .filter((row: any) => {
                            // Strict Validation: Must have at least ID, Name, Department
                            return row.id && row.name && row.department;
                        }) as Employee[];

                    if (validData.length > 0) {
                        await addEmployees(validData);
                        setStatus('success');
                        setMessage(`Successfully imported ${validData.length} records.`);
                    } else {
                        setStatus('error');
                        setMessage('No valid records found. Please check your CSV headers (e.g., "id", "name", "department").');
                    }
                }
            },
            error: (error) => {
                setStatus('error');
                setMessage(`Parse error: ${error.message}`);
            }
        });
    };

    const handleReset = async () => {
        if (confirm('Are you sure you want to delete all local data? This cannot be undone.')) {
            await clearEmployees();
            setStatus('idle');
            setMessage('Database cleared.');
            window.location.reload();
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Upload Data</h1>
                <p className="text-slate-500 mt-2">Import your HRIS export (CSV) to run the predictive engines.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="mb-6">
                    <a
                        href="/projects/hr-analytics-2030/dummy_employees.csv"
                        download
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        <FaCloudUploadAlt className="w-4 h-4" />
                        Download Sample CSV (Complex Dataset)
                    </a>
                    <p className="text-xs text-slate-400 mt-1">Use this file to test retirement and attrition scenarios.</p>
                </div>

                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaCloudUploadAlt className="w-12 h-12 text-slate-400 mb-4" />
                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500">CSV (MAX. 10MB)</p>
                    </div>
                    <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>

            {status === 'success' && (
                <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5" />
                    {message}
                </div>
            )}

            {status === 'error' && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3">
                    <FaExclamationCircle className="w-5 h-5" />
                    {message}
                </div>
            )}

            <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Danger Zone</h2>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                >
                    <FaUndo className="w-4 h-4" />
                    Reset Database & Clear All Data
                </button>
            </div>
        </div>
    );
}
