import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const WORKERS = [
  { name: 'Mohamed Al-Saidi',  skill: 'Logistics',     status: 'Active',   rate: 14.5, hours: 40 },
  { name: 'Ali Hassan',         skill: 'Warehouse',     status: 'Active',   rate: 13.8, hours: 32 },
  { name: 'Ibrahim Nasser',    skill: 'Construction',  status: 'Pending',  rate: 15.0, hours: 40 },
  { name: 'Fatima Al-Amin',    skill: 'Admin',         status: 'Active',   rate: 14.0, hours: 24 },
  { name: 'Omar Saleh',        skill: 'Driving',       status: 'Inactive', rate: 16.0, hours: 0  },
];

const JOBS = [
  { title: 'Warehouse Worker',    company: 'LogiNL BV',    location: 'Rotterdam', rate: 13.5, hours: 40, start: '2025-08-01' },
  { title: 'Truck Driver',        company: 'TransEU NL',   location: 'Amsterdam', rate: 16.5, hours: 40, start: '2025-08-05' },
  { title: 'Construction Helper', company: 'BouwGroep BV', location: 'Utrecht',   rate: 14.8, hours: 32, start: '2025-08-10' },
];

export default async function Y2FlexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <Y2FlexContent locale={locale} />;
}

function Y2FlexContent({ locale }: { locale: string }) {
  const t = useTranslations('y2flex');

  const placedWorkers = WORKERS.filter((w) => w.status === 'Active').length;
  const monthlyMargin = WORKERS.filter((w) => w.status === 'Active')
    .reduce((a, w) => a + w.rate * w.hours * 4 * 2.5, 0); // €2.5/hr margin

  return (
    <AppShell locale={locale} title={t('title')}>
      <div className="page-header">
        <h1 className="page-title">{t('title')}</h1>
        <p className="page-subtitle">{t('subtitle')}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('total_workers')}   value={WORKERS.length}       icon="👥" color="bg-blue-600" />
        <StatCard title={t('placed_workers')}  value={placedWorkers}        icon="✅" color="bg-green-600" />
        <StatCard title={t('open_positions')}  value={JOBS.length}          icon="📋" color="bg-orange-500" />
        <StatCard title={t('monthly_margin')}  value={formatCurrency(monthlyMargin)} icon="💶" color="bg-purple-600" />
      </div>

      {/* Sub-nav */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { label: t('workers'),   href: 'workers'   },
          { label: t('jobs'),      href: 'jobs'       },
          { label: t('contracts'), href: 'contracts'  },
          { label: t('schedules'), href: 'schedules'  },
        ].map((item) => (
          <Link key={item.href} href={`/${locale}/y2flex/${item.href}`} className="btn-secondary text-sm">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workers */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">{t('workers')}</h3>
            <button className="btn-primary text-xs">+ {t('add_worker')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="table-head">
                  <th className="table-th">{t('worker_name')}</th>
                  <th className="table-th">{t('worker_skill')}</th>
                  <th className="table-th">{t('job_rate')}</th>
                  <th className="table-th">{t('worker_status')}</th>
                </tr>
              </thead>
              <tbody>
                {WORKERS.map((w) => (
                  <tr key={w.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="table-td font-medium">{w.name}</td>
                    <td className="table-td text-gray-500">{w.skill}</td>
                    <td className="table-td">€{w.rate}/hr</td>
                    <td className="table-td"><StatusBadge status={w.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Jobs */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">{t('jobs')}</h3>
            <button className="btn-primary text-xs">+ {t('add_job')}</button>
          </div>
          <div className="space-y-3">
            {JOBS.map((j) => (
              <div key={j.title} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{j.title}</p>
                    <p className="text-xs text-gray-500">{j.company} · {j.location}</p>
                  </div>
                  <span className="text-sm font-bold text-green-600">€{j.rate}/hr</span>
                </div>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>⏱ {j.hours}h/wk</span>
                  <span>📅 {j.start}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="btn-primary text-xs py-1">Match Worker</button>
                  <button className="btn-secondary text-xs py-1">📧 Notify</button>
                  <button className="btn-secondary text-xs py-1">💬 WhatsApp</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification info */}
      <div className="mt-6 card p-4 flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <span className="text-xl">💡</span>
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <strong>IND Compliance:</strong> All contracts are issued under your personal name as a self-employed intermediary (ZZP). 
          Workers receive contracts in Arabic &amp; English. Compliant with Dutch CAO, WTTA, and GDPR.
        </div>
      </div>
    </AppShell>
  );
}
