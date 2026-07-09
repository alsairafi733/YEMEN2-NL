'use client';
import { ReactNode, useState, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  locale: string;
  title?: string;
  children: ReactNode;
}

export function AppShell({ locale, title, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

  return (
    <div className="flex min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Mobile overlay — closes sidebar when clicking outside */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar locale={locale} isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 lg:ms-60 flex flex-col min-h-screen">
        <Header locale={locale} title={title} onMenuToggle={toggleSidebar} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
