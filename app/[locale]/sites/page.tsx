import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency, formatNumber } from '@/lib/utils';

const SITES = [
  { name: 'YemenNews.net',    niche: 'News',         revenue: 320,  traffic: 42000, status: 'Live',    posts: 3  },
  { name: 'ArabRecipes.co',   niche: 'Food',         revenue: 210,  traffic: 28000, status: 'Live',    posts: 2  },
  { name: 'TechArab.io',      niche: 'Tech',         revenue: 440,  traffic: 65000, status: 'Live',    posts: 5  },
  { name: 'ArabTravel.me',    niche: 'Travel',       revenue: 185,  traffic: 22000, status: 'Live',    posts: 2  },
  { name: 'IslamicGuide.net', niche: 'Religion',     revenue: 390,  traffic: 55000, status: 'Live',    posts: 4  },
  { name: 'ArabBusiness.co',  niche: 'Business',     revenue: 125,  traffic: 15000, status: 'Pending', posts: 0  },
  { name: 'DutchArab.nl',     niche: 'Immigration',  revenue: 270,  traffic: 35000, status: 'Live',    posts: 3  },
  { name: 'ArabHealth.net',   niche: 'Health',       revenue: 195,  traffic: 24000, status: 'Live',    posts: 2  },
];

export default async function SitesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SitesContent locale={locale} />;
}

function SitesContent({ locale }: { locale: string }) {
  const t = useTranslations('sites');

  const liveSites = SITES.filter((s) => s.status === 'Live').length;
  const totalRevenue = SITES.reduce((a, s) => a + s.revenue, 0);
  const totalTraffic = SITES.reduce((a, s) => a + s.traffic, 0);
  const postsToday = SITES.reduce((a, s) => a + s.posts, 0);

  return (
    <AppShell locale={locale} title={t('title')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('title')}</h1>
          <p className="page-subtitle">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">🤖 {t('bulk_publish')}</button>
          <button className="btn-primary text-sm">+ {t('add_site')}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t('total_sites')}   value="100"                    icon="🌐" color="bg-green-600" />
        <StatCard title={t('live_sites')}     value={`${liveSites} / 100`}  icon="✅" color="bg-blue-600"  />
        <StatCard title={t('total_revenue')}  value={formatCurrency(totalRevenue)} icon="💶" color="bg-purple-600" trend={15} />
        <StatCard title={t('avg_daily')}      value={formatCurrency(totalRevenue / 30)} icon="📈" color="bg-orange-500" />
      </div>

      {/* Content engine */}
      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">🤖 {t('content_engine')}</h3>
          <span className="badge-green">Active — AI Powered</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('posts_today')}</p>
            <p className="font-bold text-2xl">{postsToday}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">Monthly Visitors</p>
            <p className="font-bold text-2xl">{formatNumber(totalTraffic)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('adsense_status')}</p>
            <p className="font-bold text-green-500">Connected ✓</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">{t('ezoic_status')}</p>
            <p className="font-bold text-yellow-500">Setup Needed</p>
          </div>
        </div>
      </div>

      {/* Sites table */}
      <div className="table-wrapper overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">{t('site_name')}</th>
              <th className="table-th">{t('site_niche')}</th>
              <th className="table-th">{t('site_traffic')}</th>
              <th className="table-th">{t('site_revenue')}</th>
              <th className="table-th">Posts Today</th>
              <th className="table-th">{t('site_status')}</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SITES.map((s) => (
              <tr key={s.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td font-semibold text-blue-600">{s.name}</td>
                <td className="table-td text-gray-500">{s.niche}</td>
                <td className="table-td">{formatNumber(s.traffic)}</td>
                <td className="table-td font-medium text-green-600">{formatCurrency(s.revenue)}/mo</td>
                <td className="table-td text-center">{s.posts}</td>
                <td className="table-td"><StatusBadge status={s.status} /></td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">✏️</button>
                    <button className="text-xs text-green-500 hover:underline">📝 Post</button>
                    <button className="text-xs text-gray-400 hover:underline">🔗 Open</button>
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
