export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const supabase = createSupabaseServerClient();

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
