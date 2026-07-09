import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { IDENTITY } from '@/lib/identity';

export default async function IdentityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <IdentityContent locale={locale} />;
}

function ProgressBar({ percent, color = 'bg-primary' }: { percent: number; color?: string }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all`}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active:       'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'In Progress':'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Planning:     'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? map.Planning}`}>
      {status}
    </span>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <h3 className="section-title mb-4">{title}</h3>
      {children}
    </div>
  );
}

function IdentityContent({ locale }: { locale: string }) {
  const t = useTranslations('identity');
  const { founder, assets, community, services, roadmap, principles, goals, progress } = IDENTITY;

  return (
    <AppShell locale={locale} title={t('title')}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center text-2xl font-black text-white">
          Y2
        </div>
        <div>
          <h2 className="text-xl font-black">YEMEN GROUP</h2>
          <p className="text-sm text-gray-500">{founder.country} · {founder.employment}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Founder */}
          <SectionCard title={t('founder')}>
            <p className="font-bold text-base mb-1">{founder.name}</p>
            <p className="text-sm text-gray-500 mb-3">{founder.religion} · {founder.country}</p>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{t('values')}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {founder.values.map((v) => (
                <span key={v} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{v}</span>
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{t('skills')}</p>
            <div className="flex flex-wrap gap-1.5">
              {founder.skills.map((s) => (
                <span key={s} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
          </SectionCard>

          {/* Principles */}
          <SectionCard title={t('principles')}>
            <ul className="space-y-2">
              {principles.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Goals */}
          <SectionCard title={t('goals')}>
            <ol className="space-y-1.5">
              {goals.map((g, i) => (
                <li key={g} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold w-5 shrink-0">{i + 1}.</span>
                  <span>{g}</span>
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>

        {/* Middle column */}
        <div className="space-y-6">
          {/* Community */}
          <SectionCard title={t('community')}>
            <div className="text-center mb-4">
              <p className="text-4xl font-black text-primary">{community.totalMembers}</p>
              <p className="text-sm text-gray-500">{t('total_members')}</p>
            </div>
            <div className="space-y-2">
              {community.groups.map((g) => (
                <div key={g.name} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{g.name}</span>
                  <span className="font-bold">{g.members}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Assets */}
          <SectionCard title={t('assets')}>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{t('domains')}</p>
                <p className="font-bold text-primary">{assets.domains.length} domains registered</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {assets.domains.slice(0, 8).map((d) => (
                    <span key={d} className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{d}</span>
                  ))}
                  {assets.domains.length > 8 && (
                    <span className="text-xs text-gray-400">+{assets.domains.length - 8} more</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-1">{t('servers')}</p>
                {Object.entries(assets.servers).map(([country, role]) => (
                  <div key={country} className="flex justify-between text-xs py-0.5">
                    <span className="text-gray-500">{country}</span>
                    <span className="font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Services */}
          <SectionCard title={t('services')}>
            <div className="space-y-3">
              {services.map((cat) => (
                <div key={cat.category}>
                  <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-1">
                    <span>{cat.icon}</span> {cat.category}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item) => (
                      <span key={item} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Roadmap */}
          <SectionCard title={t('roadmap')}>
            <div className="space-y-4">
              {roadmap.map((entry) => {
                const currentYear = new Date().getFullYear();
                const isActive = entry.year === currentYear;
                const isPast = entry.year < currentYear;
                return (
                  <div key={entry.year} className={`border-l-2 pl-3 ${isActive ? 'border-primary' : isPast ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    <p className={`text-sm font-bold mb-1 ${isActive ? 'text-primary' : isPast ? 'text-green-500' : 'text-gray-500'}`}>
                      {entry.year} {isActive && '← Now'}
                    </p>
                    <ul className="space-y-0.5">
                      {entry.milestones.map((m) => (
                        <li key={m} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                          <span className="mt-0.5">{isPast ? '✓' : '·'}</span> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Progress */}
          <SectionCard title={t('progress')}>
            <div className="space-y-3">
              {progress.map((p) => (
                <div key={p.project}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold flex items-center gap-1">
                      {p.icon} {p.project}
                    </span>
                    <div className="flex items-center gap-2">
                      <StatusPill status={p.status} />
                      <span className="text-xs font-bold text-gray-500">{p.percent}%</span>
                    </div>
                  </div>
                  <ProgressBar
                    percent={p.percent}
                    color={p.status === 'Active' ? 'bg-green-500' : p.status === 'In Progress' ? 'bg-primary' : 'bg-gray-400'}
                  />
                  {p.notes && <p className="text-xs text-gray-400 mt-0.5">{p.notes}</p>}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
