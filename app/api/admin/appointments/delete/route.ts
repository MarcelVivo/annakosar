import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: 'Termin-ID fehlt' },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json(
      { error: 'Termin konnte nicht gelöscht werden' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
