'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaChartPie,
    FaFileUpload,
    FaChess
} from 'react-icons/fa';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();

    const NAV_ITEMS = [
        { label: t('nav.dashboard'), href: '/', icon: FaChartPie },
        { label: t('nav.upload'), href: '/upload', icon: FaFileUpload },
        { label: t('nav.plan'), href: '/plan', icon: FaChess },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white flex flex-col shadow-xl z-50">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    HR Analytics <span className="font-light">2030</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">Local-First Predictive Engine</p>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-slate-500")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-4">
                {/* Language Toggle */}
                {/* Language Toggle */}
                <div className="bg-slate-800 rounded-lg p-1 flex">
                    <button
                        onClick={() => setLanguage('en')}
                        className={clsx(
                            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                            language === 'en'
                                ? "bg-slate-600 text-white shadow-sm"
                                : "text-slate-400 hover:text-white"
                        )}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLanguage('nl')}
                        className={clsx(
                            "flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                            language === 'nl'
                                ? "bg-slate-600 text-white shadow-sm"
                                : "text-slate-400 hover:text-white"
                        )}
                    >
                        Nederlands
                    </button>
                </div>

                <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-400">Environment</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-slate-300">Browser Native</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
