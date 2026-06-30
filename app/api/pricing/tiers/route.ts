import { eurPricingTiers } from '@/lib/pricing';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ currency: 'EUR', tiers: eurPricingTiers });
}
