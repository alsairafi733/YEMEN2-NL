import { validateEmail, validatePassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: 'Login accepted' });
}
