export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const supabase = createSupabaseServerClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return NextResponse.json(
      { error: 'Zeitraum fehlt' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id,
      date,
      time,
      type,
      user:profiles (
        first_name,
        last_name
      )
    `)
    .gte('date', from)
    .lte('date', to)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: 'Kalenderdaten konnten nicht geladen werden' },
      { status: 500 }
    );
  }

  return NextResponse.json({ appointments: data });
}
