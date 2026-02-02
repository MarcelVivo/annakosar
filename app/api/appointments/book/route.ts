export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { userId, date, time, type, customerEmail } = await req.json();

  const { error } = await supabase.from('appointments').insert({
    user_id: userId,
    date,
    time,
    type,
  });

  if (error) {
    return NextResponse.json({ error: 'Buchung fehlgeschlagen' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
