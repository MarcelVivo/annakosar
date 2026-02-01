import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { generateSlotsForDate } from '@/lib/appointments';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Datum fehlt' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Supabase-Umgebungsvariablen fehlen. Bitte konfigurieren.' },
      { status: 503 }
    );
  }

  const cookieStore = cookies();
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 });
        }
      },
      headers: {
        get(name) {
          return headers().get(name) ?? undefined;
        }
      }
    }
  );

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
