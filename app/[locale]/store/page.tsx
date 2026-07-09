import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const PRODUCTS = [
  { id: 'P-001', title: 'Complete Guide to Working in Netherlands (Arabic)',  type: 'Book',     price: 29,  sales: 142, status: 'Active' },
  { id: 'P-002', title: 'Freelancing in Europe — Arabic Course',              type: 'Course',   price: 99,  sales: 58,  status: 'Active' },
  { id: 'P-003', title: 'Business Registration Netherlands — Template Pack', type: 'Template', price: 49,  sales: 34,  status: 'Active' },
  { id: 'P-004', title: 'IND Application Guide 2025',                        type: 'Book',     price: 39,  sales: 89,  status: 'Active' },
  { id: 'P-005', title: 'Y2Flex Worker Handbook',                            type: 'Template', price: 19,  sales: 27,  status: 'Draft'  },
];

export default async function StorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <StoreContent locale={locale} />;
}

function StoreContent({ locale }: { locale: string }) {
  const totalRevenue = PRODUCTS.reduce((a, p) => a + p.price * p.sales, 0);
  const totalSales = PRODUCTS.reduce((a, p) => a + p.sales, 0);

  return (
    <AppShell locale={locale} title="Digital Products Store">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">🛍️ Digital Products Store</h1>
          <p className="page-subtitle">Books, courses & templates — automated delivery</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">🔗 Store Link</button>
          <button className="btn-primary text-sm">+ Add Product</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Products"  value={PRODUCTS.length}             icon="📦" color="bg-pink-600"   />
        <StatCard title="Total Sales"     value={totalSales}                  icon="🛒" color="bg-blue-600"   />
        <StatCard title="Total Revenue"   value={formatCurrency(totalRevenue)} icon="💶" color="bg-green-600" trend={22} />
        <StatCard title="Avg. Per Product" value={formatCurrency(totalRevenue / PRODUCTS.length)} icon="📊" color="bg-purple-600" />
      </div>

      {/* Payment providers */}
      <div className="card p-5 mb-6">
        <h3 className="section-title">💳 Payment Providers</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Stripe',  icon: '💳', status: 'Connected', color: 'text-blue-600'   },
            { name: 'PayPal',  icon: '🅿️', status: 'Connected', color: 'text-blue-800'   },
            { name: 'iDEAL',   icon: '🏦', status: 'Connected', color: 'text-green-600'  },
          ].map((p) => (
            <div key={p.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center gap-3">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <p className="font-semibold text-sm">{p.name}</p>
                <p className={`text-xs font-medium ${p.color}`}>{p.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">ID</th>
              <th className="table-th">Product</th>
              <th className="table-th">Type</th>
              <th className="table-th">Price</th>
              <th className="table-th">Sales</th>
              <th className="table-th">Revenue</th>
              <th className="table-th">Status</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-mono text-xs text-gray-400">{p.id}</td>
                <td className="table-td font-semibold max-w-xs truncate">{p.title}</td>
                <td className="table-td">
                  <span className="badge-blue">{p.type}</span>
                </td>
                <td className="table-td font-medium">{formatCurrency(p.price)}</td>
                <td className="table-td">{p.sales}</td>
                <td className="table-td text-green-600 font-bold">{formatCurrency(p.price * p.sales)}</td>
                <td className="table-td"><StatusBadge status={p.status} /></td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">✏️</button>
                    <button className="text-xs text-green-500 hover:underline">🔗 Link</button>
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
