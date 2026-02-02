export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
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
