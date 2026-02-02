export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  const redirectTo = requestUrl.searchParams.get('next') ?? '/dashboard';
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
}
