import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { bookingSchema, ensureProfile } from '@/lib/appointments';
import { getSupabaseServiceRoleClient } from '@/lib/supabase-server';

export async function GET() {
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
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', session.user.id)
    .neq('status', 'cancelled')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ appointments: data });
}

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Supabase-Umgebungsvariablen fehlen. Bitte konfigurieren.' },
      { status: 503 }
    );
  }

  const body = await req.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Eingabe', issues: parsed.error.issues }, { status: 400 });
  }

  const { name, email, appointmentType, date, time, channel } = parsed.data;

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
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Bitte loggen Sie sich ein.' }, { status: 401 });
  }

  await ensureProfile(supabase, session, name, email);

  // 1) Free intro only once per user
  if (appointmentType === 'free_intro') {
    const { data: existingIntro, error: introError } = await supabase
      .from('appointments')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('appointment_type', 'free_intro')
      .neq('status', 'cancelled');

    if (introError)
      return NextResponse.json({ error: introError.message }, { status: 500 });

    if (existingIntro && existingIntro.length > 0) {
      return NextResponse.json(
        { error: 'Kostenloses Kennenlerngespräch wurde bereits genutzt.' },
        { status: 409 }
      );
    }
  }

  // 2) Prevent slot collisions
  const { data: existingSlot, error: slotError } = await supabase
    .from('appointments')
    .select('id')
    .eq('date', date)
    .eq('time', time)
    .neq('status', 'cancelled');

  if (slotError) return NextResponse.json({ error: slotError.message }, { status: 500 });
  if (existingSlot && existingSlot.length > 0) {
    return NextResponse.json({ error: 'Dieser Termin ist bereits vergeben.' }, { status: 409 });
  }

  const meetingLink =
    channel === 'zoom' ? process.env.ZOOM_ROOM_URL ?? null : process.env.TEAMS_ROOM_URL ?? null;

  const { data: created, error } = await supabase
    .from('appointments')
    .insert({
      user_id: session.user.id,
      appointment_type: appointmentType,
      date,
      time,
      meeting_link: meetingLink,
      status: 'confirmed'
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Optional: trigger confirmation email via Edge Function if configured
  const serviceClient = getSupabaseServiceRoleClient();
  if (serviceClient) {
    try {
      await serviceClient.functions.invoke('send-confirmation', {
        body: {
          appointmentId: created.id,
          email,
          name,
          date,
          time,
          appointmentType,
          meetingLink
        }
      });
    } catch (err) {
      console.error('Bestätigungsmail fehlgeschlagen', err);
    }
  }

  return NextResponse.json({ appointment: created }, { status: 201 });
}
