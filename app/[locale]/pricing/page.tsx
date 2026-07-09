import { AppShell } from '@/components/layout/AppShell';
import { formatCurrency } from '@/lib/utils';

const PLANS = [
  {
    product: 'Y2Flex',
    icon: '👷',
    desc: 'Workforce placement platform',
    tiers: [
      { name: 'Per-Worker Margin',  price: '€2.50/hr',      desc: 'Per active worker hour billed to employer' },
      { name: 'Placement Fee',      price: '8%',             desc: 'Of annual salary for permanent placements' },
      { name: 'Managed Payroll',    price: '€99/worker/mo',  desc: 'Full payroll & scheduling management' },
    ],
  },
  {
    product: '100 Sites',
    icon: '🌐',
    desc: 'Arabic content network',
    tiers: [
      { name: 'AdSense Revenue',    price: 'Auto',           desc: 'Google AdSense — target €30/site/month' },
      { name: 'Affiliate (Bol.com)', price: '8% commission', desc: 'Per sale from affiliate links' },
      { name: 'Sponsored Posts',    price: '€150/post',      desc: 'Per sponsored article placed' },
    ],
  },
  {
    product: 'AI Agent',
    icon: '🤖',
    desc: 'Customer service automation',
    tiers: [
      { name: 'Starter',   price: '€99/mo',  desc: 'Up to 500 automated responses/month' },
      { name: 'Pro',       price: '€249/mo', desc: 'Unlimited responses + WhatsApp integration' },
      { name: 'White-label', price: '€499/mo', desc: 'Custom branding for your clients' },
    ],
  },
  {
    product: 'Arab Students',
    icon: '🎓',
    desc: 'Student services platform',
    tiers: [
      { name: 'Admission Consulting', price: '€350/student', desc: 'University application assistance' },
      { name: 'Visa Package',         price: '€200/case',    desc: 'Full visa & residence support' },
      { name: 'Course Access',        price: '€79–149',      desc: 'Per online course enrollment' },
    ],
  },
  {
    product: 'Legal & Translation',
    icon: '⚖️',
    desc: 'Legal advisory & document translation',
    tiers: [
      { name: 'IND / Residence',     price: '€600/case',    desc: 'Full IND application support' },
      { name: 'Business Setup',      price: '€800/case',    desc: 'KVK registration + contracts' },
      { name: 'Document Translation', price: '€0.12/word',  desc: 'Certified Arabic ↔ English ↔ Dutch' },
    ],
  },
  {
    product: 'Digital Store',
    icon: '🛍️',
    desc: 'Books, courses, templates',
    tiers: [
      { name: 'E-Book',    price: '€19–49',   desc: 'PDF guides — instant delivery' },
      { name: 'Course',    price: '€79–149',  desc: 'Video courses — lifetime access' },
      { name: 'Templates', price: '€19–99',   desc: 'Contract & doc templates' },
    ],
  },
];

const BUDGET_PLAN = [
  { category: 'Domains (100 sites + main)',  allocated: 600,  spent: 420,  remaining: 180  },
  { category: 'Paid Advertising (test)',      allocated: 1000, spent: 620,  remaining: 380  },
  { category: 'Design & Branding',           allocated: 200,  spent: 200,  remaining: 0    },
  { category: 'Marketing & Launch',          allocated: 1000, spent: 0,    remaining: 1000 },
  { category: 'Emergency Reserve',           allocated: 200,  spent: 0,    remaining: 200  },
];

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PricingContent locale={locale} />;
}

function PricingContent({ locale }: { locale: string }) {
  const totalAllocated = BUDGET_PLAN.reduce((a, b) => a + b.allocated, 0);
  const totalSpent     = BUDGET_PLAN.reduce((a, b) => a + b.spent, 0);

  return (
    <AppShell locale={locale} title="Pricing Management">
      <div className="page-header">
        <h1 className="page-title">💰 Pricing Management</h1>
        <p className="page-subtitle">Pricing tiers for all 5 products + budget tracker (€3,000 capital)</p>
      </div>

      {/* Budget tracker */}
      <div className="card p-5 mb-8">
        <h3 className="section-title">💼 Startup Budget — €3,000</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="table-head">
              <tr>
                <th className="table-th">Category</th>
                <th className="table-th">Allocated</th>
                <th className="table-th">Spent</th>
                <th className="table-th">Remaining</th>
                <th className="table-th">Progress</th>
              </tr>
            </thead>
            <tbody>
              {BUDGET_PLAN.map((row) => (
                <tr key={row.category} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="table-td font-medium">{row.category}</td>
                  <td className="table-td">{formatCurrency(row.allocated)}</td>
                  <td className="table-td text-red-500">{formatCurrency(row.spent)}</td>
                  <td className="table-td text-green-600 font-semibold">{formatCurrency(row.remaining)}</td>
                  <td className="table-td w-36">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${(row.spent / row.allocated) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{((row.spent / row.allocated) * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50 dark:bg-gray-800">
                <td className="table-td">Total</td>
                <td className="table-td">{formatCurrency(totalAllocated)}</td>
                <td className="table-td text-red-500">{formatCurrency(totalSpent)}</td>
                <td className="table-td text-green-600">{formatCurrency(totalAllocated - totalSpent)}</td>
                <td className="table-td">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(totalSpent / totalAllocated) * 100}%` }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Product pricing */}
      <h3 className="section-title">📦 Product Pricing Tiers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div key={plan.product} className="card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{plan.icon}</span>
              <div>
                <p className="font-black text-base">{plan.product}</p>
                <p className="text-xs text-gray-500">{plan.desc}</p>
              </div>
            </div>
            <div className="space-y-3">
              {plan.tiers.map((tier) => (
                <div key={tier.name} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm">{tier.name}</p>
                    <span className="text-primary font-black text-sm">{tier.price}</span>
                  </div>
                  <p className="text-xs text-gray-500">{tier.desc}</p>
                </div>
              ))}
            </div>
            <button className="btn-secondary text-xs w-full mt-4">✏️ Edit Pricing</button>
          </div>
        ))}
      </div>

      {/* Halal compliance notice */}
      <div className="mt-6 card p-4 flex items-start gap-3 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <span className="text-xl">☪️</span>
        <div className="text-sm text-green-800 dark:text-green-300">
          <strong>حلال Compliance:</strong> All pricing is interest-free (no Riba). Services are transparent with no Gharar (deception).
          Advertising is limited to permissible products only. Every contract is fair and clearly defined.
        </div>
      </div>
    </AppShell>
  );
}
