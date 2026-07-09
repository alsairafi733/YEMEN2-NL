'use client';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  sub?: string;
  icon?: string;
  trend?: number;
  color?: string;
}

export function StatCard({ title, value, sub, icon, trend, color = 'bg-primary' }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</p>}
        </div>
        {icon && (
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg', color)}>
            {icon}
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className={cn('text-xs font-semibold mt-1', trend >= 0 ? 'text-green-600' : 'text-red-500')}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
        </div>
      )}
    </div>
  );
}
