import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const SUBSCRIPTIONS = [
  { id: 'SUB-001', plan: 'Y2Flex Pro',      customer: 'Self',          amount: 0,    billing: 'Internal',  status: 'Active',  next: '—' },
  { id: 'SUB-002', plan: 'Sites Hosting',   customer: 'Self',          amount: 89,   billing: 'Monthly',   status: 'Active',  next: '2025-08-01' },
  { id: 'SUB-003', plan: 'n8n Cloud',       customer: 'Self',          amount: 20,   billing: 'Monthly',   status: 'Active',  next: '2025-07-15' },
  { id: 'SUB-004', plan: 'Anthropic API',   customer: 'Self',          amount: 50,   billing: 'Monthly',   status: 'Active',  next: '2025-07-20' },
  { id: 'PAY-001', plan: 'Client Invoice',  customer: 'Salem Al-Otiabi',amount: 800, billing: 'One-time',  status: 'Paid',    next: '—' },
  { id: 'PAY-002', plan: 'Client Invoice',  customer: 'Rania Khaled',  amount: 600,  billing: 'One-time',  status: 'Pending', next: '2025-07-15' },
];

export default async function BillingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BillingContent locale={locale} />;
}

function BillingContent({ locale }: { locale: string }) {
  const totalMonthly    = SUBSCRIPTIONS.filter((s) => s.billing === 'Monthly').reduce((a, s) => a + s.amount, 0);
  const totalReceivable = SUBSCRIPTIONS.filter((s) => s.status === 'Pending').reduce((a, s) => a + s.amount, 0);

  return (
    <AppShell locale={locale} title="Billing & Payments">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">💳 Billing & Payments</h1>
          <p className="page-subtitle">Subscriptions, invoices, payment gateways</p>
        </div>
        <button className="btn-primary text-sm">+ Create Invoice</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Monthly Expenses"  value={formatCurrency(totalMonthly)}    icon="📤" color="bg-red-500"   />
        <StatCard title="Receivable"        value={formatCurrency(totalReceivable)} icon="⏳" color="bg-yellow-500" />
        <StatCard title="Stripe Balance"    value="€3,240"                           icon="💳" color="bg-blue-600"  />
        <StatCard title="PayPal Balance"    value="€890"                             icon="🅿️" color="bg-indigo-600" />
      </div>

      {/* Payment providers */}
      <div className="card p-5 mb-6">
        <h3 className="section-title">Payment Gateways</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Stripe',  icon: '💳', status: 'Connected', color: 'text-blue-600',  desc: 'Cards, SEPA, iDEAL' },
            { name: 'PayPal',  icon: '🅿️', status: 'Connected', color: 'text-blue-800',  desc: 'PayPal, Cards' },
            { name: 'iDEAL',   icon: '🏦', status: 'Connected', color: 'text-green-600', desc: 'Dutch bank transfer' },
          ].map((p) => (
            <div key={p.name} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p className={`text-xs font-semibold ${p.color}`}>● {p.status}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{p.desc}</p>
              <button className="text-xs text-blue-500 hover:underline mt-2">Configure →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriptions & invoices */}
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">ID</th>
              <th className="table-th">Description</th>
              <th className="table-th">Customer / Service</th>
              <th className="table-th">Amount</th>
              <th className="table-th">Billing</th>
              <th className="table-th">Status</th>
              <th className="table-th">Next Due</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SUBSCRIPTIONS.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-mono text-xs text-gray-400">{s.id}</td>
                <td className="table-td font-semibold">{s.plan}</td>
                <td className="table-td text-gray-500">{s.customer}</td>
                <td className="table-td font-medium">{s.amount > 0 ? formatCurrency(s.amount) : '—'}</td>
                <td className="table-td text-gray-500">{s.billing}</td>
                <td className="table-td"><StatusBadge status={s.status} /></td>
                <td className="table-td text-gray-400 text-xs">{s.next}</td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">📄</button>
                    {s.status === 'Pending' && (
                      <button className="text-xs text-green-500 hover:underline">💸 Charge</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
