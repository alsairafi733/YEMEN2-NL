import { sanitizeInput, validateEmail, validatePassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = sanitizeInput(String(formData.get('name') ?? ''));
  const email = sanitizeInput(String(formData.get('email') ?? ''));
  const password = String(formData.get('password') ?? '');

  if (!name || !validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid registration data' }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: 'Registration accepted' });
}
