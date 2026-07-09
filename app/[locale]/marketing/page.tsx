import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const CAMPAIGNS = [
  { name: 'Y2Flex Saudi — Google',  market: '🇸🇦 Saudi',  platform: 'Google Ads', budget: 15, spend: 310, revenue: 1200, roas: 3.9, status: 'Active'  },
  { name: 'Students Turkey — Meta', market: '🇹🇷 Turkey', platform: 'Meta Ads',   budget: 10, spend: 220, revenue: 680,  roas: 3.1, status: 'Active'  },
  { name: 'Legal NL — Google',      market: '🇳🇱 NL',     platform: 'Google Ads', budget: 8,  spend: 180, revenue: 540,  roas: 3.0, status: 'Active'  },
  { name: 'Store UK — Meta',        market: '🇬🇧 UK',     platform: 'Meta Ads',   budget: 12, spend: 0,   revenue: 0,    roas: 0,   status: 'Paused'  },
];

export default async function MarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <MarketingContent locale={locale} />;
}

function MarketingContent({ locale }: { locale: string }) {
  const t = useTranslations('marketing');

  const totalSpend   = CAMPAIGNS.reduce((a, c) => a + c.spend, 0);
  const totalRevenue = CAMPAIGNS.reduce((a, c) => a + c.revenue, 0);
  const avgROAS      = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(1) : '0';

  return (
    <AppShell locale={locale} title={t('title')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('title')}</h1>
          <p className="page-subtitle">{t('subtitle')}</p>
        </div>
        <button className="btn-primary text-sm">+ {t('create_campaign')}</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('total_spend')}      value={formatCurrency(totalSpend)}   icon="💸" color="bg-red-500"    />
        <StatCard title={t('total_revenue')}    value={formatCurrency(totalRevenue)} icon="💶" color="bg-green-600"  />
        <StatCard title={t('roas')}             value={`${avgROAS}x`}                icon="📈" color="bg-blue-600"   />
        <StatCard title={t('active_campaigns')} value={CAMPAIGNS.filter((c) => c.status === 'Active').length} icon="📢" color="bg-purple-600" />
      </div>

      {/* Market breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { flag: '🇸🇦', label: t('saudi'), rev: 1200 },
          { flag: '🇹🇷', label: t('turkey'), rev: 680 },
          { flag: '🇬🇧', label: t('uk'), rev: 540 },
        ].map((m) => (
          <div key={m.label} className="card p-4 text-center">
            <p className="text-3xl mb-1">{m.flag}</p>
            <p className="font-bold text-sm">{m.label}</p>
            <p className="text-lg font-black text-green-600 mt-1">{formatCurrency(m.rev)}</p>
            <p className="text-xs text-gray-400">this month</p>
          </div>
        ))}
      </div>

      {/* Campaigns table */}
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">{t('campaign_name')}</th>
              <th className="table-th">Market</th>
              <th className="table-th">{t('platform')}</th>
              <th className="table-th">{t('budget_daily')}</th>
              <th className="table-th">Spend (MTD)</th>
              <th className="table-th">Revenue</th>
              <th className="table-th">ROAS</th>
              <th className="table-th">Status</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CAMPAIGNS.map((c) => (
              <tr key={c.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-semibold">{c.name}</td>
                <td className="table-td">{c.market}</td>
                <td className="table-td text-gray-500">{c.platform}</td>
                <td className="table-td">€{c.budget}/day</td>
                <td className="table-td">{formatCurrency(c.spend)}</td>
                <td className="table-td text-green-600 font-medium">{formatCurrency(c.revenue)}</td>
                <td className="table-td">
                  <span className={c.roas >= 3 ? 'text-green-600 font-bold' : 'text-gray-400'}>
                    {c.roas > 0 ? `${c.roas}x` : '—'}
                  </span>
                </td>
                <td className="table-td"><StatusBadge status={c.status} /></td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">✏️ Edit</button>
                    <button className="text-xs text-orange-500 hover:underline">⏸ Pause</button>
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
