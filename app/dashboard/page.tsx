import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';
import { UserRole } from '@/lib/auth';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const validRoles: UserRole[] = ['worker', 'manager', 'employer'];

function parseRole(role: string | string[] | undefined): UserRole {
  const value = Array.isArray(role) ? role[0] : role;
  return validRoles.includes(value as UserRole) ? (value as UserRole) : 'worker';
}

export default function DashboardPage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const role = parseRole(searchParams?.role);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/dashboard" />
      <section className="panel dashboard">
        <h1>{messages.dashboard.title}</h1>
        <p>{messages.dashboard[role]}</p>
        <ul>
          <li>{messages.dashboard.jobSearch}</li>
          <li>{messages.dashboard.teamManagement}</li>
          <li>{messages.dashboard.payroll}</li>
          <li>{messages.dashboard.reports}</li>
        </ul>
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}
