import { validateEmail, validatePassword } from '@/lib/auth';
import { getSupabaseClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid email or password' }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'Authentication service unavailable' }, { status: 503 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ ok: false, error: 'Invalid email or password' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, userId: data.user.id });
}
