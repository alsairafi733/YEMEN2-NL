'use client';

type BadgeVariant = 'green' | 'red' | 'yellow' | 'blue' | 'gray';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant = 'gray', children }: BadgeProps) {
  return <span className={`badge-${variant}`}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    active: 'green',
    running: 'green',
    live: 'green',
    signed: 'green',
    paid: 'green',
    completed: 'green',
    pending: 'yellow',
    paused: 'yellow',
    awaiting: 'yellow',
    inactive: 'gray',
    draft: 'gray',
    error: 'red',
    failed: 'red',
    cancelled: 'red',
    open: 'blue',
    new: 'blue',
  };
  const lower = status.toLowerCase();
  const variant = map[lower] ?? 'gray';
  return <Badge variant={variant}>{status}</Badge>;
}
