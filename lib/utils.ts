export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en').format(n);
}

export function formatDate(date: string | Date, locale = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export const PRODUCTS = [
  { id: 'y2flex',    key: 'Y2Flex',      color: 'bg-blue-500',   href: '/y2flex' },
  { id: 'sites',     key: '100 Sites',   color: 'bg-green-500',  href: '/sites' },
  { id: 'agent',     key: 'AI Agent',    color: 'bg-purple-500', href: '/agent' },
  { id: 'marketing', key: 'Marketing',   color: 'bg-orange-500', href: '/marketing' },
  { id: 'students',  key: 'Students',    color: 'bg-cyan-500',   href: '/students' },
  { id: 'legal',     key: 'Legal',       color: 'bg-yellow-500', href: '/legal' },
  { id: 'store',     key: 'Store',       color: 'bg-pink-500',   href: '/store' },
] as const;

export const BUDGET = {
  total: 3000,
  domains: 600,
  ads: 1000,
  design: 200,
  marketing: 1000,
  emergency: 200,
} as const;
