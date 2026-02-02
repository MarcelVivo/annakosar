export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { appointmentId, userId } = await req.json();

  if (!appointmentId || !userId) {
    return NextResponse.json(
      { error: 'Unvollständige Daten' },
      { status: 400 }
    );
  }

  const { data: appointment } = await supabase
    .from('appointments')
    .select('id')
    .eq('id', appointmentId)
    .eq('user_id', userId)
    .maybeSingle();

  if (!appointment) {
    return NextResponse.json(
      { error: 'Termin nicht gefunden oder keine Berechtigung' },
      { status: 403 }
    );
  }

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId);

  if (error) {
    return NextResponse.json(
      { error: 'Termin konnte nicht storniert werden' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
