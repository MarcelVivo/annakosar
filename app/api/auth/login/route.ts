export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-Mail und Passwort sind erforderlich' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json(
        { error: 'Login fehlgeschlagen' },
        { status: 401 }
      );
    }

    const userId = data.user.id;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: 'Profil konnte nicht geladen werden' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      role: profile.role,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Serverfehler beim Login' },
      { status: 500 }
    );
  }
}
