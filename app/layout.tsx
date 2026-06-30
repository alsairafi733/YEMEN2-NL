import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/dashboard.css';

export const metadata: Metadata = {
  title: 'YEMEN2 NL',
  description: 'Dutch-first workforce and recruitment platform for EU markets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
