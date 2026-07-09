import { AppShell } from '@/components/layout/AppShell';

export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SettingsContent locale={locale} />;
}

function SettingsContent({ locale }: { locale: string }) {
  return (
    <AppShell locale={locale} title="Settings">
      <div className="page-header">
        <h1 className="page-title">⚙️ Settings</h1>
        <p className="page-subtitle">Profile, security, notifications, and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="section-title">👤 Profile</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-black">أح</div>
              <div>
                <p className="font-bold text-lg">Ahmed Abdulrahman</p>
                <p className="text-sm text-gray-500">Founder — YEMEN Group 🇳🇱</p>
                <p className="text-xs text-gray-400">ahmed@yemen2.nl</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: 'Ahmed Abdulrahman', type: 'text' },
                { label: 'Email',     value: 'ahmed@yemen2.nl',   type: 'email' },
                { label: 'Phone',     value: '+31 6 ...',          type: 'tel' },
                { label: 'Company',   value: 'YEMEN Group',        type: 'text' },
                { label: 'Location',  value: 'Netherlands 🇳🇱',    type: 'text' },
                { label: 'Language',  value: 'Arabic / English',  type: 'text' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                  <input className="input" type={f.type} defaultValue={f.value} />
                </div>
              ))}
            </div>
            <button className="btn-primary mt-4">💾 Save Profile</button>
          </div>

          {/* Notifications */}
          <div className="card p-6">
            <h3 className="section-title">🔔 Notifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Daily report at 07:00 AM',          sub: 'Revenue summary + alerts',           on: true  },
                { label: 'New worker application',            sub: 'Y2Flex — auto-screened first',        on: true  },
                { label: 'Contract unsigned (after 48h)',     sub: 'Reminder sent to worker',             on: true  },
                { label: 'Site revenue drop (>20%)',          sub: 'Immediate alert',                     on: true  },
                { label: 'Weekly financial report (Sunday)',  sub: 'Full P&L sent by email',              on: true  },
                { label: 'New customer inquiry',             sub: 'Handled by AI Agent first',           on: false },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-gray-500">{n.sub}</p>
                  </div>
                  <button className={`relative w-11 h-6 rounded-full transition-colors ${n.on ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${n.on ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Daily schedule */}
          <div className="card p-6">
            <h3 className="section-title">⏱️ Automation Schedule</h3>
            <p className="text-sm text-gray-500 mb-4">Your 30-min/day workflow — fully automated</p>
            <div className="space-y-2">
              {[
                { time: '00:00', task: 'AI publishes articles across 100 sites',              auto: true },
                { time: '06:30', task: 'AI Agent handles overnight messages',                  auto: true },
                { time: '07:00', task: '📧 Daily report sent to ahmed@yemen2.nl',             auto: true },
                { time: '07:15', task: '👁️ YOU: Review dashboard (10 min)',                   auto: false },
                { time: '07:25', task: '✍️ YOU: Give 1–2 instructions to AI Agent',           auto: false },
                { time: '07:30', task: '✅ Done — rest of day fully automated',               auto: true },
                { time: '12:00', task: 'n8n checks ad performance and auto-adjusts budgets',  auto: true },
                { time: '18:00', task: 'Y2Flex schedules synced with workers via WhatsApp',   auto: true },
                { time: '23:00', task: 'Weekly report generated (Sundays only)',              auto: true },
              ].map((item) => (
                <div key={item.time} className="flex items-center gap-3 text-sm py-1.5">
                  <span className="text-xs font-mono text-gray-400 w-12">{item.time}</span>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.auto ? 'bg-green-500' : 'bg-primary'}`} />
                  <span className={item.auto ? 'text-gray-600 dark:text-gray-400' : 'font-semibold'}>{item.task}</span>
                  <span className="ms-auto text-xs">{item.auto ? '🤖 Auto' : '👤 You'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="section-title">🔐 Security</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Current Password</label>
                <input className="input" type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">New Password</label>
                <input className="input" type="password" placeholder="••••••••" />
              </div>
              <button className="btn-primary w-full text-sm">Update Password</button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Two-Factor Auth</p>
                <span className="badge-red">Disabled</span>
              </div>
              <button className="btn-secondary text-xs w-full">Enable 2FA</button>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="section-title">🌙 Preferences</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Interface Language</span>
                <select className="input py-1 px-2 w-28 text-xs">
                  <option>العربية</option>
                  <option>English</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Dark Mode</span>
                <button className="btn-secondary text-xs px-3 py-1">Toggle</button>
              </div>
              <div className="flex justify-between items-center">
                <span>Report Email</span>
                <span className="text-xs text-gray-400">ahmed@yemen2.nl</span>
              </div>
            </div>
          </div>

          <div className="card p-5 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <p className="text-sm font-bold text-green-800 dark:text-green-300 mb-2">☪️ Islamic Principles</p>
            <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
              <li>✓ No interest-based products</li>
              <li>✓ No gambling or adult content ads</li>
              <li>✓ Fair worker contracts</li>
              <li>✓ Transparent pricing</li>
              <li>✓ GDPR compliant data handling</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
