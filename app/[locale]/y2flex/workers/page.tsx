import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatusBadge } from '@/components/ui/Badge';

const WORKERS = [
  { name: 'Mohamed Al-Saidi', email: 'mo@example.com', phone: '+31 6 1111', skill: 'Logistics',    status: 'Active',   rate: 14.5, hours: 40, since: '2025-01-10' },
  { name: 'Ali Hassan',        email: 'ali@example.com',phone: '+31 6 2222', skill: 'Warehouse',    status: 'Active',   rate: 13.8, hours: 32, since: '2025-02-01' },
  { name: 'Ibrahim Nasser',   email: 'ibr@example.com',phone: '+31 6 3333', skill: 'Construction', status: 'Pending',  rate: 15.0, hours: 40, since: '2025-07-01' },
  { name: 'Fatima Al-Amin',   email: 'fat@example.com',phone: '+31 6 4444', skill: 'Admin',        status: 'Active',   rate: 14.0, hours: 24, since: '2025-03-15' },
  { name: 'Omar Saleh',       email: 'omr@example.com',phone: '+31 6 5555', skill: 'Driving',      status: 'Inactive', rate: 16.0, hours: 0,  since: '2025-05-01' },
];

export default async function WorkersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <WorkersContent locale={locale} />;
}

function WorkersContent({ locale }: { locale: string }) {
  const t = useTranslations('y2flex');

  return (
    <AppShell locale={locale} title={t('workers')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('workers')}</h1>
          <p className="page-subtitle">{WORKERS.length} workers registered</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">📥 Import CSV</button>
          <button className="btn-primary text-sm">+ {t('add_worker')}</button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-4">
        <input className="input max-w-xs" placeholder={`🔍 ${t('worker_name')}...`} />
        <select className="input max-w-xs">
          <option value="">All Statuses</option>
          <option value="active">{t('status_active')}</option>
          <option value="pending">{t('status_pending')}</option>
          <option value="inactive">{t('status_inactive')}</option>
        </select>
      </div>

      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">{t('worker_name')}</th>
              <th className="table-th">{t('worker_email')}</th>
              <th className="table-th">{t('worker_phone')}</th>
              <th className="table-th">{t('worker_skill')}</th>
              <th className="table-th">{t('job_rate')}</th>
              <th className="table-th">{t('job_hours')}</th>
              <th className="table-th">{t('worker_status')}</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {WORKERS.map((w) => (
              <tr key={w.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-semibold">{w.name}</td>
                <td className="table-td text-gray-500">{w.email}</td>
                <td className="table-td text-gray-500">{w.phone}</td>
                <td className="table-td">{w.skill}</td>
                <td className="table-td font-medium text-green-600">€{w.rate}/hr</td>
                <td className="table-td">{w.hours}h/wk</td>
                <td className="table-td"><StatusBadge status={w.status} /></td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">✏️</button>
                    <button className="text-xs text-green-500 hover:underline">📄 Contract</button>
                    <button className="text-xs text-purple-500 hover:underline">💬 Notify</button>
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
