import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const sendEmail = async (payload: any) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-booking-email`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
};

export async function POST(req: NextRequest) {
  const { userId, date, time, type, customerEmail } = await req.json();

  const { error } = await supabase.from('appointments').insert({
    user_id: userId,
    date,
    time,
    type,
  });

  if (error) {
    return NextResponse.json({ error: 'Buchung fehlgeschlagen' }, { status: 500 });
  }

  await sendEmail({
    to: customerEmail,
    subject: 'Terminbestätigung',
    html: `<p>Ihr Termin am <strong>${date}</strong> um <strong>${time}</strong> wurde erfolgreich gebucht.</p>`,
  });

  await sendEmail({
    to: 'anna@annakosar.com',
    subject: 'Neuer Termin gebucht',
    html: `<p>Neuer Termin am <strong>${date}</strong> um <strong>${time}</strong>.</p>`,
  });

  return NextResponse.json({ success: true });
}
