import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const CASES = [
  { id: 'L-001', client: 'Salem Al-Otiabi',  country: '🇸🇦 Saudi', type: 'Business Setup',  fee: 800,  status: 'Open',      date: '2025-07-01' },
  { id: 'L-002', client: 'Rania Khaled',     country: '🇳🇱 NL',    type: 'IND Residence',   fee: 600,  status: 'Open',      date: '2025-07-03' },
  { id: 'L-003', client: 'Nasser Al-Yemeni', country: '🇾🇪 Yemen', type: 'Labor Law',        fee: 400,  status: 'Completed', date: '2025-06-15' },
  { id: 'L-004', client: 'Huda Mansoor',     country: '🇸🇦 Saudi', type: 'Contract Review',  fee: 250,  status: 'Open',      date: '2025-07-05' },
];

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalContent locale={locale} />;
}

function LegalContent({ locale }: { locale: string }) {
  const t = useTranslations('legal');

  const totalRevenue = CASES.reduce((a, c) => a + c.fee, 0);

  return (
    <AppShell locale={locale} title={t('title')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('title')}</h1>
          <p className="page-subtitle">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">+ {t('add_client')}</button>
          <button className="btn-primary text-sm">+ {t('new_case')}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title={t('total_clients')} value={CASES.length}           icon="👤" color="bg-yellow-600" />
        <StatCard title={t('open_cases')}    value={CASES.filter((c) => c.status === 'Open').length} icon="⚖️" color="bg-red-500" />
        <StatCard title={t('monthly_revenue')} value={formatCurrency(totalRevenue)} icon="💶" color="bg-green-600" trend={10} />
      </div>

      {/* Markets */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { flag: '🇸🇦', label: t('saudi_market'), cases: 2, rev: 1050 },
          { flag: '🇳🇱', label: t('nl_market'),     cases: 1, rev: 600  },
        ].map((m) => (
          <div key={m.label} className="card p-4 flex items-center gap-4">
            <span className="text-4xl">{m.flag}</span>
            <div>
              <p className="font-bold">{m.label}</p>
              <p className="text-sm text-gray-500">{m.cases} open cases</p>
              <p className="font-black text-green-600">{formatCurrency(m.rev)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="card p-5 mb-6">
        <h3 className="section-title">{t('services')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[t('service1'), t('service2'), t('service3'), t('service4'), t('service5')].map((s) => (
            <div key={s} className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">⚖️</span>
              <span className="text-gray-600 dark:text-gray-400">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cases table */}
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">ID</th>
              <th className="table-th">{t('client_name')}</th>
              <th className="table-th">Country</th>
              <th className="table-th">{t('case_type')}</th>
              <th className="table-th">{t('case_fee')}</th>
              <th className="table-th">{t('case_status')}</th>
              <th className="table-th">Date</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CASES.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-mono text-xs text-gray-400">{c.id}</td>
                <td className="table-td font-semibold">{c.client}</td>
                <td className="table-td">{c.country}</td>
                <td className="table-td text-gray-500">{c.type}</td>
                <td className="table-td font-medium text-green-600">{formatCurrency(c.fee)}</td>
                <td className="table-td"><StatusBadge status={c.status} /></td>
                <td className="table-td text-gray-400 text-xs">{c.date}</td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">✏️</button>
                    <button className="text-xs text-green-500 hover:underline">📧</button>
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
