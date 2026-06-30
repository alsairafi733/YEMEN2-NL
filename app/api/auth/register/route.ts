import { normalizeInput, validateEmail, validatePassword } from '@/lib/auth';
import { getSupabaseClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = normalizeInput(String(formData.get('name') ?? ''));
  const email = normalizeInput(String(formData.get('email') ?? ''));
  const password = String(formData.get('password') ?? '');

  if (!name || !validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid registration data' }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'Authentication service unavailable' }, { status: 503 });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, userId: data.user?.id ?? null }, { status: 201 });
}
