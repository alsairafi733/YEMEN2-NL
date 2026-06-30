import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function PrivacyPage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/privacy" />
      <section className="panel">
        <h1>{messages.legal.privacyTitle}</h1>
        <p>{messages.legal.privacyBody}</p>
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}
