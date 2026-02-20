'use client';

import { useState } from 'react';
import { useWorkforcePlan } from '@/hooks/useWorkforcePlan'; // Correction: hooks imports
import { useEmployees as useEmployeesHook } from '@/hooks/useEmployees';
import { FaDownload, FaLeaf } from 'react-icons/fa';

export default function PlanPage() {
    const { employees, isLoading } = useEmployeesHook();
    const [growthRate, setGrowthRate] = useState(0.05); // 5% default
    const plan = useWorkforcePlan(employees, growthRate);

    if (isLoading || !plan) return null;

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">2030 Workforce Plan</h1>
                    <p className="text-slate-500 mt-2">Strategic hiring roadmap based on predictive modeling.</p>
                </div>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                    <FaDownload className="w-4 h-4" />
                    Export PDF
                </button>
            </div>

            {/* Scenario Controls */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Scenario Planning</h3>
                <div className="flex items-center gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Desired Headcount Growth (Year-over-Year): <span className="text-blue-600 font-bold">{(growthRate * 100).toFixed(1)}%</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded border border-slate-100 italic">
                            Positive % = Expanding the team. Negative % = Downsizing.
                        </p>
                        <input
                            type="range"
                            min="-0.05"
                            max="0.20"
                            step="0.01"
                            value={growthRate}
                            onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                            <span>Contraction (-5%)</span>
                            <span>High Growth Mode (20%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured Report */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">

                {/* Executive Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 print:shadow-none print:border-0">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Executive Summary</h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            {plan.summary}
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            This forecast assumes a consistent <strong className="text-slate-900">{(growthRate * 100).toFixed(1)}%</strong> year-over-year
                            growth rate. Key risk areas include <strong className="text-red-600">Engineering</strong> (high attrition probability) and
                            <strong className="text-amber-600"> Operations</strong> (retirement wave in 2028).
                        </p>

                        <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                            <h4 className="font-bold text-blue-900 mb-1">Recommendation</h4>
                            <p className="text-blue-800 text-sm">
                                Initiate a "Knowledge Transfer" program immediately for the <strong>{plan.totalRetirements}</strong> senior employees identified
                                as retiring within the strategic window.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden print:shadow-none print:border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Department</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">Current</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">Replacement Need</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">Growth Need</th>
                                    <th className="px-6 py-4 font-semibold text-slate-900 text-right">Total Hiring (2030)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {plan.departmentalPlans.map((dept) => (
                                    <tr key={dept.department} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{dept.department}</td>
                                        <td className="px-6 py-4 text-slate-500 text-right">{dept.currentHeadcount}</td>
                                        <td className="px-6 py-4 text-slate-500 text-right text-red-600">+{dept.replacementNeed}</td>
                                        <td className="px-6 py-4 text-slate-500 text-right text-green-600">+{dept.projectedGrowthNeed}</td>
                                        <td className="px-6 py-4 font-bold text-slate-900 text-right bg-slate-50">+{dept.totalHiringTarget}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Total Impact</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-slate-400 text-xs uppercase mb-1">Net Hiring Volume</p>
                                <p className="text-4xl font-bold">{plan.departmentalPlans.reduce((acc, curr) => acc + curr.totalHiringTarget, 0)}</p>
                                <p className="text-green-400 text-xs mt-1">Positions to fill by 2030</p>
                            </div>

                            <div className="border-t border-slate-700 pt-6">
                                <p className="text-slate-400 text-xs uppercase mb-1">Cost of Attrition (Est.)</p>
                                <p className="text-2xl font-bold text-red-300">${(plan.highRiskAttrition * 45000).toLocaleString()}</p>
                                <p className="text-slate-500 text-xs mt-1">Recruitment & Training</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
