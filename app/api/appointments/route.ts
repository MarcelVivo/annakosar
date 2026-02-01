import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const bookingSchema = z.object({
  appointmentType: z.enum(['free_intro', 'session']),
  channel: z.enum(['zoom', 'teams']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  name: z.string().min(2),
  email: z.string().email()
});

export async function GET() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) return NextResponse.json({ error: sessionError.message }, { status: 500 });
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });

  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', session.user.id)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ appointments: data });
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) return NextResponse.json({ error: sessionError.message }, { status: 500 });
  if (!session) return NextResponse.json({ error: 'Bitte loggen Sie sich ein.' }, { status: 401 });

  const parsed = bookingSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Eingabe', issues: parsed.error.issues }, { status: 400 });
  }

  const { appointmentType, channel, date, time, name, email } = parsed.data;

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
      channel,
      name,
      email,
      meeting_link: meetingLink,
      status: 'confirmed'
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ appointment: created }, { status: 201 });
}
