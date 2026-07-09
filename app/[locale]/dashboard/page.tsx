import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const PRODUCT_STATUS = [
  { name: 'Y2Flex',      status: 'Running', revenue: 4200,  workers: 18, icon: '👷' },
  { name: '100 Sites',   status: 'Running', revenue: 1850,  workers: 0,  icon: '🌐' },
  { name: 'AI Agent',    status: 'Running', revenue: 600,   workers: 0,  icon: '🤖' },
  { name: 'Marketing',   status: 'Paused',  revenue: 0,     workers: 0,  icon: '📢' },
  { name: 'Students',    status: 'Running', revenue: 950,   workers: 0,  icon: '🎓' },
  { name: 'Legal',       status: 'Running', revenue: 1200,  workers: 0,  icon: '⚖️' },
  { name: 'Store',       status: 'Pending', revenue: 0,     workers: 0,  icon: '🛍️' },
];

const ALERTS = [
  { type: 'warning', msg: 'Y2Flex: 3 unsigned contracts awaiting worker confirmation' },
  { type: 'info',    msg: '100 Sites: 12 articles scheduled for today' },
  { type: 'success', msg: 'AI Agent: 47 queries handled automatically in last 24h' },
];

const BUDGET = { total: 3000, spent: 1240, domains: 420, ads: 620, design: 200 };

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <DashboardContent locale={locale} />;
}

function DashboardContent({ locale }: { locale: string }) {
  const t = useTranslations('dashboard');

  const totalRevenue = PRODUCT_STATUS.reduce((a, p) => a + p.revenue, 0);
  const activeWorkers = PRODUCT_STATUS.reduce((a, p) => a + p.workers, 0);

  return (
    <AppShell locale={locale} title={t('title')}>
      {/* Welcome bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black">{t('welcome')} 👋</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">📊 {t('view_report')}</button>
          <button className="btn-primary text-sm">📧 {t('send_report')}</button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('revenue_month')}  value={formatCurrency(totalRevenue)}  icon="💶" color="bg-green-600"  trend={12} />
        <StatCard title={t('active_workers')} value={activeWorkers}                  icon="👷" color="bg-blue-600"   trend={5}  />
        <StatCard title={t('sites_live')}     value="87 / 100"                       icon="🌐" color="bg-purple-600" trend={8}  />
        <StatCard title={t('pending_tasks')}  value="5"                              icon="⏳" color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products status table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5">
            <h3 className="section-title">{t('products_status')}</h3>
            <div className="space-y-3">
              {PRODUCT_STATUS.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xl">{p.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-gray-400">{formatCurrency(p.revenue)} / month</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Revenue target */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">{t('revenue_target')}</h3>
              <span className="text-sm font-bold text-green-500">{formatCurrency(totalRevenue)} / €50,000</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-primary to-orange-500 h-2.5 rounded-full transition-all"
                style={{ width: `${Math.min((totalRevenue / 50000) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{((totalRevenue / 50000) * 100).toFixed(1)}% of monthly target reached</p>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Alerts */}
          <div className="card p-5">
            <h3 className="section-title">{t('alerts')}</h3>
            {ALERTS.length === 0 ? (
              <p className="text-sm text-gray-400">{t('no_alerts')}</p>
            ) : (
              <div className="space-y-2">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`text-xs rounded-lg px-3 py-2 leading-relaxed
                    ${a.type === 'warning' ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                      a.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                      'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'}`}>
                    {a.msg}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget */}
          <div className="card p-5">
            <h3 className="section-title">{t('budget_overview')}</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: t('budget_total'),     value: formatCurrency(BUDGET.total),   bold: true },
                { label: t('budget_spent'),      value: formatCurrency(BUDGET.spent),   color: 'text-red-500' },
                { label: t('budget_remaining'),  value: formatCurrency(BUDGET.total - BUDGET.spent), color: 'text-green-500' },
                { label: 'Domains',              value: formatCurrency(BUDGET.domains) },
                { label: 'Ads',                  value: formatCurrency(BUDGET.ads) },
                { label: 'Design',               value: formatCurrency(BUDGET.design) },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className={`text-gray-500 ${row.bold ? 'font-bold text-current' : ''}`}>{row.label}</span>
                  <span className={`font-semibold ${row.color ?? ''}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${(BUDGET.spent / BUDGET.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{((BUDGET.spent / BUDGET.total) * 100).toFixed(0)}% of budget used</p>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="section-title">{t('quick_actions')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '+ Worker', href: '/y2flex/workers' },
                { label: '+ Job',    href: '/y2flex/jobs' },
                { label: '+ Site',   href: '/sites' },
                { label: '+ Task',   href: '/dashboard' },
              ].map((a) => (
                <button key={a.label} className="btn-secondary text-xs py-2 px-3 text-center">
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
