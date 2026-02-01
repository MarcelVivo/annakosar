import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { generateSlotsForDate } from '@/lib/appointments';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Datum fehlt' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('appointments')
    .select('time, status')
    .eq('date', date)
    .neq('status', 'cancelled');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const bookedTimes = (data ?? []).map((a) => a.time.slice(0, 5));
  const slots = generateSlotsForDate(date, bookedTimes);

  return NextResponse.json({ slots });
}
