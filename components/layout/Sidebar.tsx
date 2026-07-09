'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const NAV = [
  { href: '/dashboard',    icon: '🏠', key: 'dashboard' },
  { href: '/y2flex',       icon: '👷', key: 'y2flex' },
  { href: '/jobs-yemen',   icon: '🇾🇪', key: 'jobs_yemen' },
  { href: '/sites',        icon: '🌐', key: 'sites' },
  { href: '/agent',        icon: '🤖', key: 'agent' },
  { href: '/marketing',    icon: '📢', key: 'marketing' },
  { href: '/students',     icon: '🎓', key: 'students' },
  { href: '/legal',        icon: '⚖️', key: 'legal' },
  { href: '/store',        icon: '🛍️', key: 'store' },
];

const BOTTOM_NAV = [
  { href: '/domains',      icon: '🌍', key: 'domains' },
  { href: '/identity',     icon: '🪪', key: 'identity' },
  { href: '/team',         icon: '👥', key: 'team' },
  { href: '/reports',      icon: '📊', key: 'reports' },
  { href: '/billing',      icon: '💳', key: 'billing' },
  { href: '/pricing',      icon: '💰', key: 'pricing' },
  { href: '/integrations', icon: '🔗', key: 'integrations' },
  { href: '/settings',     icon: '⚙️', key: 'settings' },
];

interface SidebarProps {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ locale, isOpen, onClose }: SidebarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href);

  const NavItem = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
    <Link
      href={`/${locale}${href}`}
      onClick={onClose}
      className={cn('sidebar-link', isActive(href) && 'active')}
    >
      <span className="text-base leading-none">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <aside
      className={cn(
        'fixed inset-y-0 start-0 w-60 card border-e border-s-0 rounded-none flex flex-col',
        'transition-transform duration-300 ease-in-out',
        /* Desktop: always visible; Mobile: slide in/out (RTL-aware) */
        'z-30 lg:translate-x-0',
        isOpen
          ? 'translate-x-0'
          : '-translate-x-full rtl:translate-x-full lg:translate-x-0 lg:rtl:translate-x-0',
      )}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
            Y2
          </div>
          <div>
            <p className="font-black text-sm leading-tight">YEMEN Group</p>
            <p className="text-xs text-gray-400">Control Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Products</p>
        {NAV.map((item) => (
          <NavItem key={item.key} href={item.href} icon={item.icon} label={t(item.key as Parameters<typeof t>[0])} />
        ))}

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Management</p>
        {BOTTOM_NAV.map((item) => (
          <NavItem key={item.key} href={item.href} icon={item.icon} label={t(item.key as Parameters<typeof t>[0])} />
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            أح
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Ahmed A.</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
