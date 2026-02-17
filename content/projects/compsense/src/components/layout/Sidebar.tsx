import { LayoutDashboard, BarChart2, Settings, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '#' },
        { name: 'Market Data', icon: BarChart2, href: '#' },
        { name: 'Settings', icon: Settings, href: '#' },
    ];

    return (
        <aside
            className={cn(
                "bg-slate-900 text-slate-400 flex flex-col h-screen transition-all duration-300 border-r border-slate-800",
                isOpen ? "w-64" : "w-20"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
                {isOpen && (
                    <span className="text-2xl font-bold tracking-tight text-white font-heading">
                        CompSense
                    </span>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-white"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                    >
                        <item.icon size={20} className="text-emerald-500 group-hover:text-emerald-400" />
                        {isOpen && <span>{item.name}</span>}
                    </a>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        U
                    </div>
                    {isOpen && (
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">User Name</span>
                            <span className="text-xs text-slate-500">Admin</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
