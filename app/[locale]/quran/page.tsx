import { QuranClient } from './QuranClient';

export default async function QuranPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <QuranClient locale={locale} />;
}
