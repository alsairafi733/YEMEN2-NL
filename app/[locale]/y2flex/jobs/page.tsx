import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatusBadge } from '@/components/ui/Badge';

const JOBS = [
  { title: 'Warehouse Worker',    company: 'LogiNL BV',    location: 'Rotterdam', rate: 13.5, hours: 40, start: '2025-08-01', status: 'Open' },
  { title: 'Truck Driver',        company: 'TransEU NL',   location: 'Amsterdam', rate: 16.5, hours: 40, start: '2025-08-05', status: 'Open' },
  { title: 'Construction Helper', company: 'BouwGroep BV', location: 'Utrecht',   rate: 14.8, hours: 32, start: '2025-08-10', status: 'Open' },
  { title: 'Cleaner',             company: 'SchoonBV',     location: 'Den Haag',  rate: 12.5, hours: 20, start: '2025-07-15', status: 'Filled' },
];

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <JobsContent locale={locale} />;
}

function JobsContent({ locale }: { locale: string }) {
  const t = useTranslations('y2flex');

  return (
    <AppShell locale={locale} title={t('jobs')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('jobs')}</h1>
          <p className="page-subtitle">{JOBS.filter((j) => j.status === 'Open').length} open positions</p>
        </div>
        <button className="btn-primary text-sm">+ {t('add_job')}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {JOBS.map((j) => (
          <div key={j.title} className="card p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold">{j.title}</h3>
              <StatusBadge status={j.status} />
            </div>
            <p className="text-sm text-gray-500 mb-3">{j.company} · 📍 {j.location}</p>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <p className="text-xs text-gray-400">Hourly Rate</p>
                <p className="font-bold text-green-600">€{j.rate}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                <p className="text-xs text-gray-400">Hours/Week</p>
                <p className="font-bold">{j.hours}h</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">📅 Start: {j.start}</p>
            <div className="flex gap-2">
              {j.status === 'Open' && (
                <>
                  <button className="btn-primary text-xs flex-1">Match Worker</button>
                  <button className="btn-secondary text-xs">✏️</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
