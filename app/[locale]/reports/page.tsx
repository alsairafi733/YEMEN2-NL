import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { formatCurrency } from '@/lib/utils';

const DAILY = [
  { date: '2025-07-09', y2flex: 850, sites: 62, store: 145, students: 90, legal: 200, total: 1347 },
  { date: '2025-07-08', y2flex: 820, sites: 58, store: 110, students: 75, legal: 250, total: 1313 },
  { date: '2025-07-07', y2flex: 900, sites: 71, store: 160, students: 120, legal: 0,  total: 1251 },
  { date: '2025-07-06', y2flex: 780, sites: 55, store: 95,  students: 60,  legal: 400, total: 1390 },
  { date: '2025-07-05', y2flex: 870, sites: 66, store: 130, students: 80,  legal: 200, total: 1346 },
];

export default async function ReportsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ReportsContent locale={locale} />;
}

function ReportsContent({ locale }: { locale: string }) {
  const weekTotal = DAILY.reduce((a, d) => a + d.total, 0);
  const avgDay    = Math.round(weekTotal / DAILY.length);

  return (
    <AppShell locale={locale} title="Reports">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">📊 Reports</h1>
          <p className="page-subtitle">Daily · Weekly · Monthly — auto-generated at 07:00</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">📥 Export CSV</button>
          <button className="btn-primary text-sm">📧 Send Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today"         value={formatCurrency(DAILY[0].total)}  icon="📅" color="bg-blue-600"   />
        <StatCard title="This Week"     value={formatCurrency(weekTotal)}        icon="📆" color="bg-green-600"  />
        <StatCard title="Daily Average" value={formatCurrency(avgDay)}           icon="📊" color="bg-purple-600" />
        <StatCard title="Monthly Target" value="€50,000"                         icon="🎯" color="bg-orange-500" />
      </div>

      {/* Revenue by product */}
      <div className="card p-5 mb-6">
        <h3 className="section-title">Revenue by Product (This Month)</h3>
        <div className="space-y-3">
          {[
            { name: 'Y2Flex',    icon: '👷', rev: 4200,  target: 8000,  color: 'bg-blue-500' },
            { name: '100 Sites', icon: '🌐', rev: 1850,  target: 3000,  color: 'bg-green-500' },
            { name: 'AI Agent',  icon: '🤖', rev: 600,   target: 2000,  color: 'bg-purple-500' },
            { name: 'Marketing', icon: '📢', rev: 2420,  target: 5000,  color: 'bg-orange-500' },
            { name: 'Students',  icon: '🎓', rev: 950,   target: 2000,  color: 'bg-cyan-500' },
            { name: 'Legal',     icon: '⚖️', rev: 1200,  target: 2000,  color: 'bg-yellow-500' },
            { name: 'Store',     icon: '🛍️', rev: 8740,  target: 10000, color: 'bg-pink-500' },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="text-lg w-7">{p.icon}</span>
              <span className="text-sm font-medium w-24">{p.name}</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className={`${p.color} h-2 rounded-full`} style={{ width: `${Math.min((p.rev / p.target) * 100, 100)}%` }} />
              </div>
              <span className="text-sm font-bold w-20 text-end">{formatCurrency(p.rev)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily table */}
      <div className="table-wrapper overflow-x-auto">
        <h3 className="section-title p-5 pb-0">Daily Revenue Breakdown</h3>
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">Date</th>
              <th className="table-th">Y2Flex</th>
              <th className="table-th">Sites</th>
              <th className="table-th">Store</th>
              <th className="table-th">Students</th>
              <th className="table-th">Legal</th>
              <th className="table-th font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {DAILY.map((d) => (
              <tr key={d.date} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td text-gray-500">{d.date}</td>
                <td className="table-td">{formatCurrency(d.y2flex)}</td>
                <td className="table-td">{formatCurrency(d.sites)}</td>
                <td className="table-td">{formatCurrency(d.store)}</td>
                <td className="table-td">{formatCurrency(d.students)}</td>
                <td className="table-td">{formatCurrency(d.legal)}</td>
                <td className="table-td font-black text-green-600">{formatCurrency(d.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
