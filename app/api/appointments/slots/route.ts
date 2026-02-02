export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Datum fehlt' }, { status: 400 });
  }

  const { data } = await supabase
    .from('appointments')
    .select('time')
    .eq('date', date);

  const booked = data?.map((d) => d.time) ?? [];

  const allSlots = [
    '09:00','10:00','11:00','13:00','14:00','15:00','16:00'
  ];

  const available = allSlots.filter((t) => !booked.includes(t));

  return NextResponse.json({ slots: available });
}
