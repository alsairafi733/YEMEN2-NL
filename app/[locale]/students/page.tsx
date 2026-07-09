import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

const STUDENTS = [
  { name: 'Khalid Al-Rashid', email: 'k@ex.com', country: '🇸🇦 Saudi', service: 'Uni Admission', fee: 350, status: 'Active'   },
  { name: 'Layla Hassan',      email: 'l@ex.com', country: '🇾🇪 Yemen', service: 'Visa Help',     fee: 200, status: 'Active'   },
  { name: 'Tariq Mansoor',    email: 't@ex.com', country: '🇮🇶 Iraq',  service: 'Job Placement', fee: 150, status: 'Completed'},
  { name: 'Nadia Salim',      email: 'n@ex.com', country: '🇲🇦 Morocco',service: 'Accommodation', fee: 100, status: 'Active'   },
];

const COURSES = [
  { name: 'Arabic for Turkish Students', students: 45, price: 99,  market: '🇹🇷 Turkey' },
  { name: 'UK University Guide 2025',    students: 28, price: 149, market: '🇬🇧 UK'     },
  { name: 'IELTS Preparation — Arabic',  students: 62, price: 79,  market: '🌍 Both'    },
];

export default async function StudentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <StudentsContent locale={locale} />;
}

function StudentsContent({ locale }: { locale: string }) {
  const t = useTranslations('students');

  const totalRevenue = STUDENTS.reduce((a, s) => a + s.fee, 0) + COURSES.reduce((a, c) => a + c.students * c.price, 0);

  return (
    <AppShell locale={locale} title={t('title')}>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">{t('title')}</h1>
          <p className="page-subtitle">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm">+ {t('add_course')}</button>
          <button className="btn-primary text-sm">+ {t('add_student')}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title={t('total_students')}  value={STUDENTS.length}           icon="🎓" color="bg-cyan-600"   />
        <StatCard title={t('active_courses')}  value={COURSES.length}            icon="📚" color="bg-blue-600"   />
        <StatCard title={t('monthly_revenue')} value={formatCurrency(totalRevenue)} icon="💶" color="bg-green-600" trend={20} />
      </div>

      {/* Markets */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { flag: '🇹🇷', label: t('turkey_market'), students: 68, rev: 9800 },
          { flag: '🇬🇧', label: t('uk_market'),      students: 41, rev: 7200 },
        ].map((m) => (
          <div key={m.label} className="card p-4 flex items-center gap-4">
            <span className="text-4xl">{m.flag}</span>
            <div>
              <p className="font-bold">{m.label}</p>
              <p className="text-sm text-gray-500">{m.students} students</p>
              <p className="font-black text-green-600">{formatCurrency(m.rev)}/mo</p>
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
              <span className="text-green-500">✓</span>
              <span className="text-gray-600 dark:text-gray-400">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Courses */}
        <div className="card p-5">
          <h3 className="section-title">{t('active_courses')}</h3>
          <div className="space-y-3">
            {COURSES.map((c) => (
              <div key={c.name} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.market} · {c.students} enrolled</p>
                </div>
                <span className="font-bold text-green-600">€{c.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Students table */}
        <div className="card p-5">
          <h3 className="section-title">{t('total_students')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="table-head">
                <th className="table-th">{t('student_name')}</th>
                <th className="table-th">Country</th>
                <th className="table-th">Service</th>
                <th className="table-th">Status</th>
              </tr></thead>
              <tbody>
                {STUDENTS.map((s) => (
                  <tr key={s.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="table-td font-medium">{s.name}</td>
                    <td className="table-td text-xs">{s.country}</td>
                    <td className="table-td text-xs text-gray-500">{s.service}</td>
                    <td className="table-td"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
