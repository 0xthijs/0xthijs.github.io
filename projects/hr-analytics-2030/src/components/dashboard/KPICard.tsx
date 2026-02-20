import { IconType } from 'react-icons';
import { clsx } from 'clsx';

interface KPICardProps {
    title: string;
    value: string | number;
    icon: IconType;
    trend?: string;
    trendUp?: boolean;
    color?: 'blue' | 'green' | 'red' | 'amber';
}

export default function KPICard({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    color = 'blue'
}: KPICardProps) {

    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        red: 'bg-red-50 text-red-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className={clsx("p-3 rounded-lg", colorStyles[color])}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <div className={clsx(
                        "text-xs font-semibold px-2 py-1 rounded-full",
                        trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            </div>
        </div>
    );
}
