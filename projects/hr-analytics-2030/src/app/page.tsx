'use client';

import { useEffect, useState } from 'react';
import { useWorkforcePlan } from '@/hooks/useWorkforcePlan'; // Correction: hooks imports
import { useEmployees as useEmployeesHook } from '@/hooks/useEmployees';
import { seedDatabase } from '@/lib/seed';
import KPICard from '@/components/dashboard/KPICard';
import DepartmentalRiskChart from '@/components/charts/DepartmentalRisk';
import { FaUsers, FaUserClock, FaSuitcaseRolling, FaChartLine } from 'react-icons/fa';

export default function DashboardPage() {
  const { employees, isLoading, count } = useEmployeesHook();
  const plan = useWorkforcePlan(employees);
  const [isSeeding, setIsSeeding] = useState(false);

  // Auto-seed on first load if empty
  useEffect(() => {
    if (!isLoading && count === 0 && !isSeeding) {
      setIsSeeding(true);
      seedDatabase().then(() => {
        window.location.reload(); // Simple reload to refresh liveQuery
      });
    }
  }, [isLoading, count, isSeeding]);

  if (isLoading || !plan) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Transform plan data for the chart
  const chartData = plan.departmentalPlans.map(d => ({
    name: d.department,
    highRisk: Math.ceil(d.replacementNeed * 0.4), // Approximation for visual demo from the aggregate
    retiring: Math.ceil(d.replacementNeed * 0.6), // Approximation
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Workforce Overview</h1>
        <p className="text-slate-500 mt-2">Real-time analysis of your 2030 workforce trajectory.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Employees"
          value={plan.totalEmployees}
          icon={FaUsers}
          color="blue"
        />
        <KPICard
          title="Projected retirements (2030)"
          value={plan.totalRetirements}
          icon={FaUserClock}
          color="amber"
          trend="+12% vs last year"
          trendUp={false} // Trend is bad
        />
        <KPICard
          title="High Attrition Risk"
          value={plan.highRiskAttrition}
          icon={FaSuitcaseRolling}
          color="red"
          trend="Critical"
          trendUp={false}
        />
        <KPICard
          title="Net Hiring Need (2030)"
          value={plan.departmentalPlans.reduce((acc, curr) => acc + curr.totalHiringTarget, 0)}
          icon={FaChartLine}
          color="green"
          trend="Growth Target: 5%"
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Risk & Retirement by Department</h2>
          <DepartmentalRiskChart data={chartData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Strategic Insight</h2>
          <div className="prose prose-slate bg-slate-50 p-4 rounded-lg">
            <p className="text-sm">
              {plan.summary}
            </p>
            <ul className="text-sm mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>Engineering faces the highest replacement need due to market attrition factors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Sales growth targets require aggressive hiring starting Q3 2026.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
