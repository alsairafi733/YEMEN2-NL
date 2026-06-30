import { PricingTier } from '@/lib/pricing';

type Props = {
  tier: PricingTier;
};

export default function PricingCard({ tier }: Props) {
  return (
    <article className="card">
      <h3>{tier.title}</h3>
      <p className="price">{tier.price}</p>
      <p>{tier.description}</p>
    </article>
  );
}
