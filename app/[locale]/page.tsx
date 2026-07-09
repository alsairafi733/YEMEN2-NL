import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return <LandingContent locale={locale} />;
}

function LandingContent({ locale }: { locale: string }) {
  const t = useTranslations('home');

  const products = [
    { emoji: '👷', title: t('product1_title'), desc: t('product1_desc'), href: 'y2flex',    color: 'from-blue-500 to-blue-700' },
    { emoji: '🌐', title: t('product2_title'), desc: t('product2_desc'), href: 'sites',     color: 'from-green-500 to-green-700' },
    { emoji: '🤖', title: t('product3_title'), desc: t('product3_desc'), href: 'agent',     color: 'from-purple-500 to-purple-700' },
    { emoji: '📢', title: t('product4_title'), desc: t('product4_desc'), href: 'marketing', color: 'from-orange-500 to-orange-700' },
    { emoji: '🎓', title: t('product5_title'), desc: t('product5_desc'), href: 'students',  color: 'from-cyan-500 to-cyan-700' },
    { emoji: '⚖️', title: t('product6_title'), desc: t('product6_desc'), href: 'legal',     color: 'from-yellow-500 to-yellow-700' },
    { emoji: '🛍️', title: 'Digital Store',    desc: 'Books, courses & templates',          href: 'store',     color: 'from-pink-500 to-pink-700' },
  ];

  const stats = [
    { label: t('stats_revenue'), value: '€50k–100k', icon: '💶' },
    { label: t('stats_sites'),   value: '100',        icon: '🌐' },
    { label: t('stats_workers'), value: '50+',        icon: '👷' },
    { label: t('stats_time'),    value: '30',          icon: '⏱️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center font-black text-sm">Y2</div>
          <span className="font-black text-lg">YEMEN Group</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={locale === 'ar' ? '/en' : '/ar'} className="text-sm text-gray-400 hover:text-white transition-colors">
            {locale === 'ar' ? 'English' : 'عربي'}
          </Link>
          <Link
            href={`/${locale}/dashboard`}
            className="btn-primary text-sm"
          >
            {t('cta_dashboard')}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 text-gray-300">
          🇳🇱 Yemen Group · Netherlands
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-xl text-gray-300 mb-3">{t('hero_subtitle')}</p>
        <p className="text-gray-400 mb-10">{t('hero_desc')}</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href={`/${locale}/dashboard`} className="btn-primary px-8 py-3 text-base">
            {t('cta_dashboard')} →
          </Link>
          <Link href={`/${locale}/y2flex`} className="btn-secondary px-8 py-3 text-base text-white border-white/30 hover:bg-white/10">
            {t('cta_y2flex')}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 max-w-5xl mx-auto mb-20">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-3xl mb-1">{s.icon}</p>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Products */}
      <section className="px-8 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-10">7 Automated Digital Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link
              key={p.href}
              href={`/${locale}/${p.href}`}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all duration-200 hover:scale-105"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${p.color} rounded-lg flex items-center justify-center text-xl mb-3`}>
                {p.emoji}
              </div>
              <p className="font-bold mb-1">{p.title}</p>
              <p className="text-xs text-gray-400">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 text-center py-8 text-gray-500 text-sm">
        © 2025 YEMEN Group · Netherlands 🇳🇱 · MIT License · support@yemen2.nl
      </footer>
    </div>
  );
}
