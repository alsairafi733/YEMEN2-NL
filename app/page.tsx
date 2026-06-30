import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function HomePage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/" />
      <section className="hero">
        <h1>{messages.hero.title}</h1>
        <p>{messages.hero.subtitle}</p>
        <a href={`/register?lang=${locale}`} className="button">
          {messages.hero.cta}
        </a>
      </section>

      <section className="grid four">
        {messages.features.items.map((item) => (
          <article className="card" key={item}>
            <p>{item}</p>
          </article>
        ))}
      </section>

      <Footer locale={locale} messages={messages} />
    </main>
  );
}
