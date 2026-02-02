export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://www.annakosar.com/login',
      },
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || 'Registrierung fehlgeschlagen' },
        { status: 400 }
      );
    }

    const userId = data.user.id;

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        role: 'customer',
        first_name: firstName,
        last_name: lastName,
      });

    if (profileError) {
      return NextResponse.json(
        { error: 'Profil konnte nicht erstellt werden' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Serverfehler bei Registrierung' },
      { status: 500 }
    );
  }
}
