export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST() {
  const supabase = createSupabaseServerClient();
  try {
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Logout fehlgeschlagen' },
      { status: 500 }
    );
  }
}
