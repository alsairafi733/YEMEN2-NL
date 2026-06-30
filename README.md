# Yemen2 Netherlands

**Global Workforce Platform — Dutch-First Edition**

Yemen2-NL is a modern, multilingual workforce management and recruitment platform built for European markets, with a focus on the Netherlands.

## Features

- 🇳🇱 **Dutch-First** interface (English, Arabic, Turkish as secondary languages)
- 💶 **EUR Pricing Only** — No multi-currency complexity
- 👥 **Workforce Management** — Scheduling, payroll, contracts
- 🔍 **Smart Recruitment** — CV matching, candidate shortlisting
- 🤖 **AI & Automation** — Intelligent workflows and notifications
- 📊 **Analytics & Reporting** — Real-time dashboards and KPIs
- 🌍 **4 Languages** — Dutch, English, Arabic, Turkish

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl (multilingual support)
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **AI**: OpenAI/Anthropic integration

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── lib/                 # Utilities and helpers
├── public/              # Static assets
├── messages/            # i18n translation files
└── styles/              # Global styles
```

## Development

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_OPENAI_KEY=your_openai_key
```

### Build for Production

```bash
npm run build
npm start
```

## Pricing Tiers (EUR)

1. **Flex Workforce** — From €2.50/hour margin per worker
2. **Recruitment** — 12% of annual salary or €1500 per hire
3. **Managed Teams** — From €2500/month
4. **AI + Automation Add-on** — From €299/month

## Contributing

Contributions welcome! Please read our contribution guidelines first.

## License

MIT

## Support

For help, contact: support@yemen2.nl
