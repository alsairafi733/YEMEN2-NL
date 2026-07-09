'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition-all duration-150',
  ghost: 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-2 rounded-lg transition-colors',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
};

export function Button({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(variants[variant], sizes[size], className)}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? '⏳' : children}
    </button>
  );
}
