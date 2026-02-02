export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
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
