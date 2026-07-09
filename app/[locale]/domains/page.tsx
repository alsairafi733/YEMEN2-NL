import { AppShell } from '@/components/layout/AppShell';
import { DomainsClient } from './DomainsClient';

export default async function DomainsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <AppShell locale={locale} title="Domain Management">
      <div className="page-header">
        <h1 className="page-title">🌍 Domain Management</h1>
        <p className="page-subtitle">
          Connect and manage domains for all YEMEN Group products — powered by Vercel API
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-green-500">4</p>
          <p className="text-sm text-gray-500 mt-1">Connected</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-yellow-500">2</p>
          <p className="text-sm text-gray-500 mt-1">Pending Verification</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-black">6</p>
          <p className="text-sm text-gray-500 mt-1">Total Domains</p>
        </div>
      </div>

      <DomainsClient />

      {/* Security note */}
      <div className="mt-6 card p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          🔐 <strong>Security:</strong> Domain operations are executed through a secure server-side API route.
          Your <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">VERCEL_API_TOKEN</code> is never
          exposed to the browser. Set it in your Vercel Environment Variables (not in <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env.local</code> for production).
        </p>
      </div>
    </AppShell>
  );
}
