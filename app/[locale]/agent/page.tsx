import { AgentClient } from './AgentClient';

export default async function AgentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AgentClient locale={locale} />;
}
