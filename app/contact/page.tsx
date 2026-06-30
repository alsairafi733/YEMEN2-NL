import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ContactPage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/contact" />
      <section className="panel">
        <h1>{messages.contact.title}</h1>
        <p>{messages.contact.body}</p>
        <p>{messages.footer.contact}</p>
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}
