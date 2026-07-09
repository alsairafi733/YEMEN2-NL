import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { formatCurrency } from '@/lib/utils';

const ALLOCATION_RATE = 0.05; // 5% من كل منصة

const PLATFORMS = [
  { name: 'Y2Flex',     icon: '👷', revenue: 4200  },
  { name: '100 Sites',  icon: '🌐', revenue: 1850  },
  { name: 'AI Agent',   icon: '🤖', revenue: 600   },
  { name: 'Marketing',  icon: '📢', revenue: 0     },
  { name: 'Students',   icon: '🎓', revenue: 950   },
  { name: 'Legal',      icon: '⚖️', revenue: 1200  },
  { name: 'Store',      icon: '🛍️', revenue: 0     },
];

const CATEGORIES = [
  'cat_construction',
  'cat_tech',
  'cat_admin',
  'cat_health',
  'cat_education',
  'cat_trade',
] as const;

const SAMPLE_JOBS = [
  { title: 'مهندس مدني', company: 'شركة الإعمار اليمنية', location: 'صنعاء', type: 'دوام كامل' },
  { title: 'مبرمج ويب',  company: 'تك يمن',               location: 'عدن',    type: 'عن بُعد'   },
  { title: 'محاسب',      company: 'مجموعة التجارة',        location: 'تعز',    type: 'دوام كامل' },
  { title: 'معلم رياضيات', company: 'مدارس النور',          location: 'إب',     type: 'دوام جزئي' },
];

export default async function JobsYemenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <JobsYemenContent locale={locale} />;
}

function JobsYemenContent({ locale }: { locale: string }) {
  const t = useTranslations('jobs_yemen');

  const monthlyContribution = PLATFORMS.reduce((a, p) => a + p.revenue * ALLOCATION_RATE, 0);
  const accumulated = monthlyContribution * 3; // 3 months so far
  const spent = 850;
  const available = accumulated - spent;

  return (
    <AppShell locale={locale} title={t('title')}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇾🇪</span>
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            ✅ {t('status_free')}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            🔧 {t('status_building')}
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('monthly_contribution')} value={formatCurrency(monthlyContribution)} icon="💶" color="bg-primary" trend={5} />
        <StatCard title={t('fund_available')}        value={formatCurrency(available)}            icon="🏦" color="bg-green-600" />
        <StatCard title={t('jobs_posted')}           value="24"                                   icon="📋" color="bg-blue-600" />
        <StatCard title={t('hired')}                 value="7"                                    icon="✅" color="bg-purple-600" trend={40} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform allocations */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5">
            <h3 className="section-title">{t('fund_title')}</h3>
            <p className="text-xs text-gray-500 mb-4">{t('fund_desc')}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="table-head">
                    <th className="table-th">{t('platform')}</th>
                    <th className="table-th text-end">{t('monthly_revenue')}</th>
                    <th className="table-th text-end">{t('contribution_pct')}</th>
                    <th className="table-th text-end">{t('contribution_amount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {PLATFORMS.map((p) => {
                    const contrib = p.revenue * ALLOCATION_RATE;
                    return (
                      <tr key={p.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                        <td className="table-td">
                          <span className="me-2">{p.icon}</span>
                          <span className="font-medium">{p.name}</span>
                        </td>
                        <td className="table-td text-end text-gray-500">{formatCurrency(p.revenue)}</td>
                        <td className="table-td text-end text-primary font-bold">5%</td>
                        <td className="table-td text-end font-semibold text-green-600">
                          {contrib > 0 ? formatCurrency(contrib) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-gray-200 dark:border-gray-700 font-bold">
                    <td className="table-td" colSpan={3}>{t('monthly_contribution')}</td>
                    <td className="table-td text-end text-green-600">{formatCurrency(monthlyContribution)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fund balance */}
          <div className="card p-5">
            <h3 className="section-title">{t('total_fund')}</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: t('fund_accumulated'), value: accumulated, color: 'text-blue-600' },
                { label: t('fund_used'),         value: spent,        color: 'text-red-500'  },
                { label: t('fund_available'),    value: available,    color: 'text-green-600' },
              ].map((row) => (
                <div key={row.label} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className={`text-xl font-black ${row.color}`}>{formatCurrency(row.value)}</p>
                  <p className="text-xs text-gray-500 mt-1">{row.label}</p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${Math.min((spent / accumulated) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {((spent / accumulated) * 100).toFixed(0)}% {t('fund_used')}
            </p>
          </div>

          {/* Sample jobs */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0">{t('jobs_posted')}</h3>
              <button className="btn-primary text-xs">+ {t('post_job')}</button>
            </div>
            <div className="space-y-3">
              {SAMPLE_JOBS.map((job) => (
                <div key={job.title} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <div>
                    <p className="font-semibold text-sm">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.company} · {job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      {job.type}
                    </span>
                    <button className="btn-secondary text-xs py-1">{t('find_job')}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Vision */}
          <div className="card p-5 bg-gradient-to-br from-primary/5 to-orange-500/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌟</span>
              <h3 className="font-black text-sm text-primary">{t('vision')}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{t('vision_desc')}</p>
          </div>

          {/* Sectors */}
          <div className="card p-5">
            <h3 className="section-title">{t('categories')}</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="w-full text-start text-sm px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors text-gray-700 dark:text-gray-300"
                >
                  → {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <div className="space-y-2">
              <button className="btn-primary w-full text-sm">🔍 {t('find_job')}</button>
              <button className="btn-secondary w-full text-sm">📋 {t('post_job')}</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
