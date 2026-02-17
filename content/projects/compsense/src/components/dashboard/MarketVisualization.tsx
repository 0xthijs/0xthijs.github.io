import { useState, useMemo } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea,
    type TooltipProps,
    Cell,
} from 'recharts';
import { generateEmployees, type Employee, type Role } from '../../lib/mockData';
import { DollarSign, TrendingUp, Filter } from 'lucide-react';

const ROLE_COLORS: Record<Role, string> = {
    Junior: '#10b981',   // Emerald-500
    Senior: '#3b82f6',   // Blue-500
    Staff: '#8b5cf6',    // Violet-500
    Principal: '#f97316' // Orange-500
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomTooltipProps extends TooltipProps<number, string> {
    meritIncrease: number;
    payload?: any[];
}

const CustomTooltip = ({ active, payload, meritIncrease }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = payload[0].payload as any as Employee;
        const projectedSalary = data.salary * (1 + meritIncrease / 100);
        const newCompaRatio = (data.compaRatio * (1 + meritIncrease / 100)).toFixed(2);

        return (
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-sm z-50">
                <p className="font-bold text-white max-w-[200px] truncate">{data.name}</p>
                <div className="flex items-center gap-2 mb-2">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: ROLE_COLORS[data.role] }}
                    />
                    <p className="text-slate-400">{data.role} • {data.department}</p>
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-2">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <span className="text-slate-500 text-xs">Current Salary</span>
                        <span className="text-slate-300 text-right text-xs">New Salary (+{meritIncrease}%)</span>

                        <span className="text-white font-medium">
                            ${data.salary.toLocaleString()}
                        </span>
                        <span className="text-emerald-400 font-bold text-right">
                            ${projectedSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <span className="text-slate-500 text-xs">Current Compa</span>
                        <span className="text-slate-300 text-right text-xs">New Compa</span>

                        <span className="text-white">
                            {data.compaRatio}
                        </span>
                        <span className="text-blue-400 text-right">
                            {newCompaRatio}
                        </span>
                    </div>

                    <p className="text-slate-600 text-xs pt-1">
                        Exp: {data.experience} yrs
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export const MarketVisualization = () => {
    // Generate data once
    const data = useMemo(() => generateEmployees(50), []);
    const [meritIncrease, setMeritIncrease] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

    // Get unique departments
    const departments = useMemo(() => {
        const depts = Array.from(new Set(data.map(e => e.department))).sort();
        return ['All', ...depts];
    }, [data]);

    // Filter data
    const filteredData = useMemo(() => {
        return selectedDepartment === 'All'
            ? data
            : data.filter(e => e.department === selectedDepartment);
    }, [data, selectedDepartment]);

    // Calculate details
    const totalPayroll = useMemo(() => filteredData.reduce((acc, emp) => acc + emp.salary, 0), [filteredData]);
    const budgetImpact = (totalPayroll * meritIncrease) / 100;
    const newTotalPayroll = totalPayroll + budgetImpact;

    return (
        <div className="space-y-6">
            {/* Controls Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp className="text-emerald-500" size={24} />
                            Pay Raise Simulator
                        </h2>

                        {/* Department Filter */}
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-slate-400" />
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="bg-slate-950 text-white border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Slider Control */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Merit Increase</span>
                                    <span className="text-white font-medium">{meritIncrease}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="0.5"
                                    value={meritIncrease}
                                    onChange={(e) => setMeritIncrease(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>0%</span>
                                    <span>10%</span>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 text-xs pt-2">
                                {(Object.keys(ROLE_COLORS) as Role[]).map(role => (
                                    <div key={role} className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ROLE_COLORS[role] }} />
                                        <span className="text-slate-400">{role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Cards */}
                        <div className="flex gap-4 min-w-[300px]">
                            <div className="flex-1 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <DollarSign size={16} />
                                    <span className="text-sm font-medium">Budget Impact</span>
                                </div>
                                <div className="text-2xl font-bold text-emerald-400">
                                    +${budgetImpact.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>

                            <div className="flex-1 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <DollarSign size={16} />
                                    <span className="text-sm font-medium">New Total</span>
                                </div>
                                <div className="text-xl font-bold text-white">
                                    ${newTotalPayroll.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                    {filteredData.length} employees
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scatter Plot Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Market Position Analysis</h3>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis
                                type="number"
                                dataKey="experience"
                                name="Experience"
                                unit=" yrs"
                                stroke="#94a3b8"
                                tick={{ fill: '#94a3b8' }}
                                domain={[0, 16]}
                            />
                            <YAxis
                                type="number"
                                dataKey="salary"
                                name="Salary"
                                unit="$"
                                stroke="#94a3b8"
                                tick={{ fill: '#94a3b8' }}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip
                                content={<CustomTooltip meritIncrease={meritIncrease} />}
                                cursor={{ strokeDasharray: '3 3' }}
                                isAnimationActive={false}
                            />

                            {/* Reference Areas for Salary Bands */}
                            <ReferenceArea y1={0} y2={135000} fill="rgba(239, 68, 68, 0.05)" />
                            <ReferenceArea y1={135000} y2={250000} fill="rgba(16, 185, 129, 0.05)" />
                            <ReferenceArea y1={250000} fill="rgba(99, 102, 241, 0.05)" />

                            <Scatter name="Employees" data={filteredData} shape="circle">
                                {filteredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={ROLE_COLORS[entry.role]} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Employee Data Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h3 className="text-lg font-semibold text-white">Employee Impact Analysis</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400">
                            <tr>
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Department</th>
                                <th className="p-4 font-medium text-right">Current Salary</th>
                                <th className="p-4 font-medium text-right">Increase</th>
                                <th className="p-4 font-medium text-right">New Salary</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredData.slice(0, 10).map((employee) => (
                                <tr key={employee.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 text-white font-medium">{employee.name}</td>
                                    <td className="p-4">
                                        <span
                                            className="px-2 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: `${ROLE_COLORS[employee.role]}20`,
                                                color: ROLE_COLORS[employee.role]
                                            }}
                                        >
                                            {employee.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-400">{employee.department}</td>
                                    <td className="p-4 text-slate-300 text-right">
                                        ${employee.salary.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-emerald-400 text-right">
                                        +${((employee.salary * meritIncrease) / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </td>
                                    <td className="p-4 text-white text-right font-medium">
                                        ${(employee.salary * (1 + meritIncrease / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData.length > 10 && (
                        <div className="p-4 text-center text-xs text-slate-500 bg-slate-950/30">
                            Showing 10 of {filteredData.length} employees
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
