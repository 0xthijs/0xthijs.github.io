import { Layout } from './components/layout/Layout';
import { MarketVisualization } from './components/dashboard/MarketVisualization';

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium cursor-pointer shadow-lg shadow-blue-600/20">
            New Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-white">$45,231.89</p>
            <div className="mt-2 text-sm text-emerald-500">+20.1% from last month</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Active Users</h3>
            <p className="mt-2 text-3xl font-bold text-white">+2350</p>
            <div className="mt-2 text-sm text-emerald-500">+180.1% from last month</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Sales</h3>
            <p className="mt-2 text-3xl font-bold text-white">+12,234</p>
            <div className="mt-2 text-sm text-emerald-500">+19% from last month</div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-sm p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <span className="font-bold">U{i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">User {i} updated profile</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-500">Completed</span>
              </div>
            ))}
          </div>
        </div>

        <MarketVisualization />
      </div>
    </Layout>
  );
}

export default App;
