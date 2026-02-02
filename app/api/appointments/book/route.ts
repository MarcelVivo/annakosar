import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { userId, date, time, type } = await req.json();

  if (!userId || !date || !time || !type) {
    return NextResponse.json(
      { error: 'Unvollständige Daten' },
      { status: 400 }
    );
  }

  const { data: existing } = await supabase
    .from('appointments')
    .select('id')
    .eq('date', date)
    .eq('time', time)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: 'Termin bereits vergeben' },
      { status: 409 }
    );
  }

  const { error } = await supabase.from('appointments').insert({
    user_id: userId,
    date,
    time,
    type,
  });

  if (error) {
    return NextResponse.json(
      { error: 'Termin konnte nicht gebucht werden' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
