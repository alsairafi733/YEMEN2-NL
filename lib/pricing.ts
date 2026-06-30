export type PricingTier = {
  slug: 'flex-workforce' | 'recruitment' | 'managed-teams' | 'ai-automation';
  title: string;
  price: string;
  description: string;
};

export const eurPricingTiers: PricingTier[] = [
  {
    slug: 'flex-workforce',
    title: 'Flex Workforce',
    price: '€2.50 / hour margin per worker',
    description: 'Scale staffing up or down while staying compliant with EU labor standards.',
  },
  {
    slug: 'recruitment',
    title: 'Recruitment',
    price: '12% annual salary or €1500 per hire',
    description: 'Outcome-based recruitment pricing focused on quality hires.',
  },
  {
    slug: 'managed-teams',
    title: 'Managed Teams',
    price: '€2500+ / month',
    description: 'Managed operations, team performance and reporting for growing employers.',
  },
  {
    slug: 'ai-automation',
    title: 'AI + Automation Add-on',
    price: '€299+ / month',
    description: 'Automated matching, forecasts and multilingual workflow assistance.',
  },
];
