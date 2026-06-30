import { parseLocale } from '@/lib/i18n';
import { NextRequest, NextResponse } from 'next/server';

const jobs = [
  { id: 1, title: 'Warehouse Operator', locales: ['en', 'nl'] },
  { id: 2, title: 'Logistiek Medewerker', locales: ['nl'] },
  { id: 3, title: 'Recruitment Specialist', locales: ['en', 'nl', 'tr'] },
  { id: 4, title: 'مشرف عمليات', locales: ['ar'] },
];

export function GET(request: NextRequest) {
  const locale = parseLocale(request.nextUrl.searchParams.get('lang'));
  const query = (request.nextUrl.searchParams.get('q') ?? '').toLowerCase();

  const results = jobs.filter(
    (job) =>
      job.locales.includes(locale) && (query.length === 0 || job.title.toLowerCase().includes(query)),
  );

  return NextResponse.json({ ok: true, locale, results });
}
