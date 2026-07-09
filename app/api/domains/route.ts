import { NextRequest, NextResponse } from 'next/server';

// All Vercel API calls happen here — server-side only.
// VERCEL_API_TOKEN must be set as a server-side env variable (never exposed to the frontend).
const VERCEL_API = 'https://api.vercel.com';
const TOKEN = process.env.VERCEL_API_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const TEAM_ID = process.env.VERCEL_TEAM_ID; // optional

function vercelHeaders(): Record<string, string> {
  return {
    Authorization: 'Bearer ' + TOKEN,
    'Content-Type': 'application/json',
  };
}

function teamQuery() {
  return TEAM_ID ? `?teamId=${TEAM_ID}` : '';
}

// GET /api/domains — list all domains for the project
export async function GET() {
  if (!TOKEN || !PROJECT_ID) {
    return NextResponse.json({ error: 'Vercel credentials not configured' }, { status: 503 });
  }

  const res = await fetch(
    `${VERCEL_API}/v9/projects/${PROJECT_ID}/domains${teamQuery()}`,
    { headers: vercelHeaders(), cache: 'no-store' },
  );

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'Vercel API error' }, { status: res.status });
  return NextResponse.json(data);
}

// POST /api/domains — add a new domain
export async function POST(req: NextRequest) {
  if (!TOKEN || !PROJECT_ID) {
    return NextResponse.json({ error: 'Vercel credentials not configured' }, { status: 503 });
  }

  const body = await req.json();
  const { name } = body as { name?: string };
  if (!name) return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });

  const res = await fetch(
    `${VERCEL_API}/v9/projects/${PROJECT_ID}/domains${teamQuery()}`,
    { method: 'POST', headers: vercelHeaders(), body: JSON.stringify({ name }) },
  );

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'Vercel API error' }, { status: res.status });
  return NextResponse.json(data, { status: 201 });
}

// DELETE /api/domains — remove a domain
export async function DELETE(req: NextRequest) {
  if (!TOKEN || !PROJECT_ID) {
    return NextResponse.json({ error: 'Vercel credentials not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');
  if (!domain) return NextResponse.json({ error: 'domain query param is required' }, { status: 400 });

  const res = await fetch(
    `${VERCEL_API}/v9/projects/${PROJECT_ID}/domains/${domain}${teamQuery()}`,
    { method: 'DELETE', headers: vercelHeaders() },
  );

  if (res.status === 204) return new NextResponse(null, { status: 204 });
  const data = await res.json();
  return NextResponse.json({ error: data.error?.message ?? 'Vercel API error' }, { status: res.status });
}
