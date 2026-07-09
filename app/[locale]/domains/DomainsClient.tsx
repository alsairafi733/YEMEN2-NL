'use client';
import { useState, useEffect, useCallback } from 'react';

interface Domain {
  name: string;
  verified: boolean;
  redirect?: string;
}

export function DomainsClient() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDomain, setNewDomain] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const fetchDomains = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/domains');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load domains');
      setDomains((data.domains ?? []) as Domain[]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      // Fall back to demo data when API is not configured
      setDomains([
        { name: 'yemen-group.com',        verified: true  },
        { name: 'y2flex.nl',              verified: true  },
        { name: 'sites.sa.yemen2.nl',     verified: false },
        { name: 'students.yemen2.nl',     verified: false },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDomains(); }, [fetchDomains]);

  const handleAdd = async () => {
    if (!newDomain.trim()) return;
    setAdding(true);
    setAddError(null);
    try {
      const res = await fetch('/api/domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newDomain.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to add domain');
      setNewDomain('');
      await fetchDomains();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setAddError(msg);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (domain: string) => {
    if (!confirm(`Remove domain "${domain}"?`)) return;
    try {
      const res = await fetch(`/api/domains?domain=${encodeURIComponent(domain)}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) {
        const data = await res.json();
        alert(data.error ?? 'Failed to remove domain');
        return;
      }
      await fetchDomains();
    } catch {
      alert('Network error — please try again');
    }
  };

  return (
    <div className="space-y-6">
      {/* Add domain */}
      <div className="card p-5">
        <h3 className="font-bold text-sm mb-3">➕ Add New Domain</h3>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="e.g. mysite.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            className="btn-primary text-sm px-5"
            onClick={handleAdd}
            disabled={adding || !newDomain.trim()}
          >
            {adding ? '⏳' : 'Add'}
          </button>
        </div>
        {addError && <p className="text-xs text-red-500 mt-2">⚠️ {addError}</p>}
      </div>

      {/* Domain list */}
      <div className="card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-bold text-sm">🌍 Connected Domains</h3>
          <button
            onClick={fetchDomains}
            className="text-xs btn-secondary py-1 px-3"
            disabled={loading}
          >
            {loading ? '⏳' : '🔄 Refresh'}
          </button>
        </div>

        {error && (
          <div className="px-5 py-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-xs">
            ⚠️ API not configured — showing demo data. Set VERCEL_API_TOKEN, VERCEL_PROJECT_ID in your .env.
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Loading domains…</div>
        ) : domains.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No domains found. Add your first domain above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-500">Domain</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500">DNS</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((d) => (
                <tr key={d.name} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-5 py-3 font-medium">{d.name}</td>
                  <td className="px-5 py-3">
                    {d.verified
                      ? <span className="badge-green">✓ Verified</span>
                      : <span className="badge-yellow">⏳ Pending</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">
                    {d.verified
                      ? 'CNAME → cname.vercel-dns.com'
                      : 'Add CNAME record to verify'
                    }
                  </td>
                  <td className="px-5 py-3 text-end">
                    <button
                      onClick={() => handleRemove(d.name)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DNS guide */}
      <div className="card p-5">
        <h3 className="font-bold text-sm mb-3">📋 DNS Setup Guide</h3>
        <p className="text-xs text-gray-500 mb-3">To connect a domain, add the following records at your registrar (GoDaddy, Namecheap, Cloudflare, etc.):</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                <th className="py-2 pe-4 text-gray-500 font-sans font-semibold">Type</th>
                <th className="py-2 pe-4 text-gray-500 font-sans font-semibold">Name</th>
                <th className="py-2 text-gray-500 font-sans font-semibold">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="py-2 pe-4 text-blue-500">CNAME</td>
                <td className="py-2 pe-4">www</td>
                <td className="py-2">cname.vercel-dns.com</td>
              </tr>
              <tr>
                <td className="py-2 pe-4 text-blue-500">A</td>
                <td className="py-2 pe-4">@</td>
                <td className="py-2">76.76.21.21</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">DNS propagation can take 1–48 hours. After adding records, click Refresh to check verification status.</p>
      </div>
    </div>
  );
}
