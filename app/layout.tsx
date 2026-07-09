import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'YEMEN Group — Control Dashboard',
  description: 'Unified control dashboard for YEMEN Group digital products',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
