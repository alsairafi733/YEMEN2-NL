import { analyzeCv } from '@/lib/cv-parser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as { text?: string };

  if (!body?.text || typeof body.text !== 'string') {
    return NextResponse.json({ ok: false, error: 'CV text is required' }, { status: 400 });
  }

  const analysis = analyzeCv(body.text);
  return NextResponse.json({ ok: true, analysis });
}
