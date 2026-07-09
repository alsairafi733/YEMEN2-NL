'use client';
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  locale: string;
  title?: string;
  children: ReactNode;
}

export function AppShell({ locale, title, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar locale={locale} />
      <div className="flex-1 ms-60 flex flex-col min-h-screen">
        <Header locale={locale} title={title} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
