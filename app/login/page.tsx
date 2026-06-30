import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/login" />
      <section className="panel">
        <h1>{messages.auth.loginTitle}</h1>
        <form className="form" action="/api/auth/login" method="post">
          <label>
            {messages.auth.email}
            <input name="email" type="email" required />
          </label>
          <label>
            {messages.auth.password}
            <input name="password" type="password" required minLength={8} />
          </label>
          <button type="submit">{messages.auth.loginAction}</button>
        </form>
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}
