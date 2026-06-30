import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function AboutPage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/about" />
      <section className="panel">
        <h1>{messages.about.title}</h1>
        <p>{messages.about.body}</p>
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}
