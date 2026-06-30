import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PricingCard from '@/components/PricingCard';
import { getLocaleFromSearchParams, getMessages } from '@/lib/i18n';
import { eurPricingTiers } from '@/lib/pricing';

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function PricingPage({ searchParams }: Props) {
  const locale = getLocaleFromSearchParams(searchParams);
  const messages = getMessages(locale);

  return (
    <main>
      <Header locale={locale} messages={messages} path="/pricing" />
      <section className="panel">
        <h1>{messages.pricing.title}</h1>
        <p>{messages.pricing.subtitle}</p>
      </section>
      <section className="grid four">
        {eurPricingTiers.map((tier) => (
          <PricingCard key={tier.slug} tier={tier} />
        ))}
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}
