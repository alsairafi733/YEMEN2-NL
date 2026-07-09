import { AppShell } from '@/components/layout/AppShell';
import { StatusBadge } from '@/components/ui/Badge';

const INTEGRATIONS = [
  {
    category: '🗄️ Database & Backend',
    items: [
      { name: 'Supabase',      desc: 'PostgreSQL database + auth + storage',    status: 'Connected', icon: '🟢', docs: 'https://supabase.com/docs', setup: 'Set NEXT_PUBLIC_SUPABASE_URL + ANON_KEY in .env' },
      { name: 'PocketBase',    desc: 'Self-hosted backend (Turkey server)',      status: 'Pending',   icon: '🟡', docs: 'https://pocketbase.io',      setup: 'Deploy pocketbase on TR server, set PB_URL' },
    ],
  },
  {
    category: '🤖 AI & Automation',
    items: [
      { name: 'Anthropic Claude', desc: 'AI agent & content generation',        status: 'Connected', icon: '🟢', docs: 'https://docs.anthropic.com',  setup: 'Set ANTHROPIC_API_KEY in .env' },
      { name: 'Ollama (ALLaM-7B)',desc: 'Self-hosted Arabic AI (SA server)',     status: 'Pending',   icon: '🟡', docs: 'https://ollama.ai',           setup: 'Run: ollama pull allam on SA server' },
      { name: 'n8n',             desc: 'Workflow automation (self-hosted)',      status: 'Pending',   icon: '🟡', docs: 'https://n8n.io/docs',         setup: 'Deploy n8n on NL server, set N8N_URL' },
    ],
  },
  {
    category: '💳 Payments',
    items: [
      { name: 'Stripe',  desc: 'Cards, SEPA, iDEAL payments',                   status: 'Connected', icon: '🟢', docs: 'https://stripe.com/docs',     setup: 'Set STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET' },
      { name: 'PayPal',  desc: 'PayPal checkout for international clients',     status: 'Connected', icon: '🟢', docs: 'https://developer.paypal.com',setup: 'Set PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET' },
      { name: 'iDEAL',   desc: 'Dutch bank transfers via Stripe',               status: 'Connected', icon: '🟢', docs: 'https://stripe.com/docs/ideal',setup: 'Auto-enabled via Stripe Netherlands' },
    ],
  },
  {
    category: '📣 Communication',
    items: [
      { name: 'WhatsApp Business API', desc: 'Worker & client notifications',   status: 'Pending',   icon: '🟡', docs: 'https://developers.facebook.com/docs/whatsapp', setup: 'Set WHATSAPP_TOKEN + PHONE_NUMBER_ID' },
      { name: 'SMTP Email',           desc: 'Daily reports + contract emails',   status: 'Connected', icon: '🟢', docs: '',                            setup: 'Set SMTP_HOST + SMTP_USER + SMTP_PASS' },
      { name: 'DeepL Translation',    desc: 'Auto-translate AR ↔ EN ↔ NL',       status: 'Pending',   icon: '🟡', docs: 'https://www.deepl.com/docs-api',setup: 'Set DEEPL_API_KEY in .env' },
    ],
  },
  {
    category: '📝 Content & CMS',
    items: [
      { name: 'WordPress (100 Sites)', desc: 'CMS for all 100 Arabic sites',    status: 'Pending',   icon: '🟡', docs: 'https://developer.wordpress.org', setup: 'Deploy WP on SA server, set WP_API_URL' },
      { name: 'Google AdSense',       desc: 'Monetization for content sites',   status: 'Pending',   icon: '🟡', docs: 'https://support.google.com/adsense', setup: 'Apply per site after 100+ articles' },
    ],
  },
  {
    category: '🌍 Server Infrastructure',
    items: [
      { name: 'NL Server (Primary)',  desc: 'Main dashboard + Y2Flex (Vercel)', status: 'Connected', icon: '🟢', docs: 'https://vercel.com',          setup: 'Deployed via Vercel — github push auto-deploys' },
      { name: 'SA Server',           desc: '100 sites + Ollama AI',             status: 'Pending',   icon: '🟡', docs: '',                            setup: 'Configure SA_SERVER_IP in .env' },
      { name: 'TR Server',           desc: 'PocketBase + student platform',     status: 'Pending',   icon: '🟡', docs: '',                            setup: 'Configure TR_SERVER_IP in .env' },
      { name: 'UK Server',           desc: 'UK market services',                status: 'Pending',   icon: '🟡', docs: '',                            setup: 'Configure UK_SERVER_IP in .env' },
    ],
  },
];

export default async function IntegrationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <IntegrationsContent locale={locale} />;
}

function IntegrationsContent({ locale }: { locale: string }) {
  const allItems = INTEGRATIONS.flatMap((g) => g.items);
  const connected = allItems.filter((i) => i.status === 'Connected').length;
  const pending   = allItems.filter((i) => i.status === 'Pending').length;

  return (
    <AppShell locale={locale} title="Integrations">
      <div className="page-header">
        <h1 className="page-title">🔗 Integrations</h1>
        <p className="page-subtitle">Connect all services — Supabase, n8n, WordPress, Stripe, WhatsApp, AI</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-green-500">{connected}</p>
          <p className="text-sm text-gray-500 mt-1">Connected</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-yellow-500">{pending}</p>
          <p className="text-sm text-gray-500 mt-1">Setup Pending</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-black">{allItems.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Services</p>
        </div>
      </div>

      {/* Integration groups */}
      <div className="space-y-6">
        {INTEGRATIONS.map((group) => (
          <div key={group.category}>
            <h3 className="section-title">{group.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((item) => (
                <div key={item.name} className="card p-4 flex items-start gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-sm">{item.name}</p>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{item.desc}</p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                      {item.setup}
                    </div>
                    {item.docs && (
                      <a href={item.docs} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline mt-1 inline-block">
                        📖 Docs →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* .env template */}
      <div className="mt-6 card p-5">
        <h3 className="section-title">📋 .env Configuration Template</h3>
        <pre className="text-xs bg-gray-950 text-green-400 rounded-xl p-4 overflow-x-auto leading-relaxed">
{`# ===== YEMEN GROUP — .env.local =====

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=sk-your-key (optional)
DEEPL_API_KEY=your-deepl-key

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=your-paypal-id
PAYPAL_CLIENT_SECRET=your-paypal-secret

# Communication
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ahmed@yemen2.nl
SMTP_PASS=your-app-password
WHATSAPP_TOKEN=your-wa-token
WHATSAPP_PHONE_ID=your-phone-id

# Servers
N8N_URL=https://n8n.yemen2.nl
WP_API_URL=https://sites.sa.yemen2.nl/wp-json
SA_SERVER_IP=1.2.3.4
TR_SERVER_IP=5.6.7.8
UK_SERVER_IP=9.10.11.12

# App
NEXT_PUBLIC_APP_URL=https://yemen-group.com
ADMIN_EMAIL=ahmed@yemen2.nl`}
        </pre>
      </div>
    </AppShell>
  );
}
