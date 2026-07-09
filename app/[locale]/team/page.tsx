import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';

const TEAM = [
  { name: 'Ahmed Abdulrahman', email: 'ahmed@yemen2.nl',  role: 'Admin',      access: 'Full',    status: 'Active', last: 'Today 07:25' },
  { name: 'Sara Al-Amin',      email: 'sara@yemen2.nl',   role: 'Supervisor', access: 'Limited', status: 'Active', last: 'Today 06:00' },
  { name: 'Khalid Nasser',     email: 'khalid@yemen2.nl', role: 'Viewer',     access: 'Read',    status: 'Active', last: 'Yesterday'   },
];

const ROLE_PERMS: Record<string, { pages: string[]; actions: string[] }> = {
  Admin: {
    pages: ['Dashboard', 'Y2Flex', 'Sites', 'Agent', 'Marketing', 'Students', 'Legal', 'Store', 'Domains', 'Team', 'Billing', 'Settings', 'Integrations'],
    actions: ['Add / Edit / Delete users', 'Manage domains & DNS', 'Full billing access', 'All API integrations', 'Export reports', 'System settings'],
  },
  Supervisor: {
    pages: ['Dashboard', 'Y2Flex', 'Sites', 'Agent', 'Marketing', 'Students', 'Legal', 'Store', 'Reports'],
    actions: ['View & edit workers', 'Manage jobs & contracts', 'View reports', 'Moderate content'],
  },
  Viewer: {
    pages: ['Dashboard', 'Reports'],
    actions: ['Read-only access', 'View stats & KPIs'],
  },
};

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TeamContent locale={locale} />;
}

function TeamContent({ locale }: { locale: string }) {
  return (
    <AppShell locale={locale} title="Team & Access Control">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">👥 Team & Permissions</h1>
          <p className="page-subtitle">Role-Based Access Control (RBAC) — Admin / Supervisor / Viewer</p>
        </div>
        <button className="btn-primary text-sm">+ Invite Member</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Members" value={TEAM.length}                                         icon="👥" color="bg-blue-600"   />
        <StatCard title="Admins"        value={TEAM.filter((t) => t.role === 'Admin').length}       icon="👑" color="bg-red-500"    />
        <StatCard title="Active Now"    value={TEAM.filter((t) => t.status === 'Active').length}    icon="🟢" color="bg-green-600"  />
      </div>

      {/* RBAC matrix */}
      <div className="card p-5 mb-6">
        <h3 className="section-title">🔐 Role Permissions Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(ROLE_PERMS).map(([role, { pages, actions }]) => (
            <div key={role} className={`border rounded-xl p-4 ${
              role === 'Admin' ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
              : role === 'Supervisor' ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10'
              : 'border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{role === 'Admin' ? '👑' : role === 'Supervisor' ? '🔧' : '👁️'}</span>
                <p className="font-bold">{role}</p>
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Pages</p>
              <ul className="space-y-0.5 mb-3">
                {pages.map((p) => (
                  <li key={p} className="text-xs flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <span className="text-green-500">✓</span> {p}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Actions</p>
              <ul className="space-y-0.5">
                {actions.map((a) => (
                  <li key={a} className="text-xs flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <span className="text-blue-500">→</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Team table */}
      <div className="table-wrapper overflow-x-auto">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-bold text-sm">Team Members</h3>
          <span className="text-xs text-gray-400">{TEAM.length} members</span>
        </div>
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="table-th">Name</th>
              <th className="table-th">Email</th>
              <th className="table-th">Role</th>
              <th className="table-th">Access Level</th>
              <th className="table-th">Status</th>
              <th className="table-th">Last Active</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {TEAM.map((m) => (
              <tr key={m.email} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="table-td">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {m.name.charAt(0)}
                    </div>
                    <span className="font-semibold">{m.name}</span>
                  </div>
                </td>
                <td className="table-td text-gray-500">{m.email}</td>
                <td className="table-td">
                  <span className={`badge ${m.role === 'Admin' ? 'badge-red' : m.role === 'Supervisor' ? 'badge-blue' : 'badge-gray'}`}>
                    {m.role === 'Admin' ? '👑 ' : m.role === 'Supervisor' ? '🔧 ' : '👁️ '}{m.role}
                  </span>
                </td>
                <td className="table-td text-gray-500">{m.access}</td>
                <td className="table-td"><StatusBadge status={m.status} /></td>
                <td className="table-td text-gray-400 text-xs">{m.last}</td>
                <td className="table-td">
                  <div className="flex gap-2">
                    <button className="text-xs text-blue-500 hover:underline">✏️ Edit</button>
                    {m.role !== 'Admin' && (
                      <button className="text-xs text-red-500 hover:underline">🗑️ Remove</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security notice */}
      <div className="mt-6 card p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <p className="text-xs text-yellow-800 dark:text-yellow-300">
          ⚠️ <strong>Security Reminder:</strong> Admin role grants full system access including domain management,
          billing, and API keys. Only assign Admin to trusted team members. All role changes are logged.
        </p>
      </div>
    </AppShell>
  );
}
