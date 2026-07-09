import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatusBadge } from '@/components/ui/Badge';

const CONTRACTS = [
  { id: 'C-001', worker: 'Mohamed Al-Saidi', employer: 'LogiNL BV',    type: 'Uitzendkracht', start: '2025-07-01', end: '2025-12-31', hours: 40, rate: 14.5, status: 'Signed'  },
  { id: 'C-002', worker: 'Ali Hassan',        employer: 'LogiNL BV',    type: 'Uitzendkracht', start: '2025-07-01', end: '2025-09-30', hours: 32, rate: 13.8, status: 'Signed'  },
  { id: 'C-003', worker: 'Ibrahim Nasser',   employer: 'BouwGroep BV', type: 'Payroll',       start: '2025-08-01', end: '2025-12-31', hours: 40, rate: 15.0, status: 'Pending' },
  { id: 'C-004', worker: 'Fatima Al-Amin',   employer: 'SchoonBV',     type: 'Uitzendkracht', start: '2025-03-15', end: '2025-12-31', hours: 24, rate: 14.0, status: 'Signed'  },
];

export default async function ContractsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ContractsContent locale={locale} />;
}

function ContractsContent({ locale }: { locale: string }) {
  const t = useTranslations('y2flex');

  return (
    <AppShell locale={locale} title={t('contracts')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('contracts')}</h1>
          <p className="page-subtitle">{CONTRACTS.length} contracts · {CONTRACTS.filter((c) => c.status === 'Pending').length} awaiting signature</p>
        </div>
        <button className="btn-primary text-sm">+ {t('create_contract')}</button>
      </div>

      {/* Pending alert */}
      {CONTRACTS.some((c) => c.status === 'Pending') && (
        <div className="mb-4 card p-4 flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <span className="text-xl">⚠️</span>
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            {CONTRACTS.filter((c) => c.status === 'Pending').length} contract(s) pending signature.
            <button className="underline ms-2 font-semibold">Send reminder →</button>
          </p>
        </div>
      )}

      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">ID</th>
              <th className="table-th">{t('contract_worker')}</th>
              <th className="table-th">{t('contract_employer')}</th>
              <th className="table-th">{t('contract_type')}</th>
              <th className="table-th">Period</th>
              <th className="table-th">{t('job_rate')}</th>
              <th className="table-th">Status</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CONTRACTS.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-mono text-xs text-gray-400">{c.id}</td>
                <td className="table-td font-semibold">{c.worker}</td>
                <td className="table-td">{c.employer}</td>
                <td className="table-td text-gray-500">{c.type}</td>
                <td className="table-td text-xs">{c.start} → {c.end}</td>
                <td className="table-td text-green-600 font-medium">€{c.rate}/hr · {c.hours}h</td>
                <td className="table-td"><StatusBadge status={c.status} /></td>
                <td className="table-td">
                  <div className="flex gap-1 flex-wrap">
                    <button className="text-xs text-blue-500 hover:underline">📄 PDF</button>
                    {c.status === 'Pending' && (
                      <>
                        <button className="text-xs text-green-500 hover:underline">📧 Email</button>
                        <button className="text-xs text-purple-500 hover:underline">💬 WhatsApp</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Language note */}
      <div className="mt-4 text-xs text-gray-400 card p-3">
        📋 All contracts are auto-generated in <strong>Arabic + English</strong>. Dutch version available on request. 
        Compliant with <strong>Dutch labor law (CAO Flex)</strong>.
      </div>
    </AppShell>
  );
}
