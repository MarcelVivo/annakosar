export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id,
      date,
      time,
      type,
      created_at,
      user:profiles (
        first_name,
        last_name
      )
    `)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: 'Termine konnten nicht geladen werden' },
      { status: 500 }
    );
  }

  return NextResponse.json({ appointments: data });
}
