'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No data',
}: DataTableProps<T>) {
  return (
    <div className="table-wrapper overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="table-head">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className={cn('table-th', col.className)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-td text-center text-gray-400 py-8">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className={cn('table-td', col.className)}>
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
