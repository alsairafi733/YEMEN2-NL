import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';

const TEAM = [
  { name: 'Ahmed Abdulrahman', email: 'ahmed@yemen2.nl',  role: 'Admin',      access: 'Full',    status: 'Active', last: 'Today 07:25' },
  { name: 'Sara Al-Amin',      email: 'sara@yemen2.nl',   role: 'Supervisor', access: 'Limited', status: 'Active', last: 'Today 06:00' },
  { name: 'Khalid Nasser',     email: 'khalid@yemen2.nl', role: 'Viewer',     access: 'Read',    status: 'Active', last: 'Yesterday'   },
];

const ROLE_PERMS: Record<string, string[]> = {
  Admin:      ['Dashboard', 'Y2Flex', 'Sites', 'Agent', 'Marketing', 'Students', 'Legal', 'Store', 'Team', 'Billing', 'Settings'],
  Supervisor: ['Dashboard', 'Y2Flex', 'Sites', 'Agent', 'Marketing', 'Students', 'Legal', 'Store'],
  Viewer:     ['Dashboard'],
};

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TeamContent locale={locale} />;
}

function TeamContent({ locale }: { locale: string }) {
  return (
    <AppShell locale={locale} title="Team Management">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">👥 Team Management</h1>
          <p className="page-subtitle">YEMEN Group — Admin / Supervisor / Viewer roles</p>
        </div>
        <button className="btn-primary text-sm">+ Invite Member</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Members" value={TEAM.length}                                icon="👥" color="bg-blue-600"   />
        <StatCard title="Admins"        value={TEAM.filter((t) => t.role === 'Admin').length}       icon="👑" color="bg-red-500"    />
        <StatCard title="Active Now"    value={TEAM.filter((t) => t.status === 'Active').length}    icon="🟢" color="bg-green-600"  />
      </div>

      {/* Role permissions */}
      <div className="card p-5 mb-6">
        <h3 className="section-title">Access Permissions by Role</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(ROLE_PERMS).map(([role, perms]) => (
            <div key={role} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span>{role === 'Admin' ? '👑' : role === 'Supervisor' ? '🔧' : '👁️'}</span>
                <p className="font-bold">{role}</p>
              </div>
              <ul className="space-y-1">
                {perms.map((p) => (
                  <li key={p} className="text-xs flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <span className="text-green-500">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Team table */}
      <div className="table-wrapper overflow-x-auto">
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
                    {m.role}
                  </span>
                </td>
                <td className="table-td text-gray-500">{m.access}</td>
                <td className="table-td"><StatusBadge status={m.status} /></td>
                <td className="table-td text-gray-400 text-xs">{m.last}</td>
                <td className="table-td">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-500 hover:underline">✏️ Edit</button>
                    <button className="text-xs text-red-500 hover:underline">🗑️</button>
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
