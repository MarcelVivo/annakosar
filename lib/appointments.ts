import { isBefore, parseISO, setHours, setMinutes } from 'date-fns';
import { z } from 'zod';
import { getSupabaseServiceRoleClient } from './supabase-server';
import { Session, SupabaseClient } from '@supabase/supabase-js';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Bitte vollständigen Namen angeben'),
  email: z.string().email('Bitte gültige Email-Adresse angeben'),
  appointmentType: z.enum(['free_intro', 'session']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  channel: z.enum(['zoom', 'teams'])
});

export type BookingPayload = z.infer<typeof bookingSchema>;
export type Slot = { time: string; available: boolean };

const START_HOUR = 8;
const END_HOUR = 18;
const INTERVAL_MINUTES = 60;

export const generateSlotsForDate = (date: string, bookedTimes: string[] = []): Slot[] => {
  const day = parseISO(date);
  const now = new Date();
  const slots: Slot[] = [];

  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    const slotDate = setMinutes(setHours(day, hour), 0);
    const time = slotDate.toTimeString().slice(0, 5);
    const isPast = isBefore(slotDate, now);
    const isTaken = bookedTimes.includes(time);

    slots.push({
      time,
      available: !isPast && !isTaken
    });
  }

  return slots;
};

export const ensureProfile = async (
  supabase: SupabaseClient,
  session: Session,
  name: string,
  email: string
) => {
  await supabase.from('users').upsert({
    id: session.user.id,
    email,
    name
  });
};

export const sendConfirmationEmail = async (payload: {
  appointmentId: string;
  email: string;
  name: string;
  date: string;
  time: string;
  appointmentType: string;
  meetingLink: string | null;
}) => {
  const client = getSupabaseServiceRoleClient();
  if (!client) return;

  try {
    await client.functions.invoke('send-confirmation', {
      body: payload
    });
  } catch (error) {
    console.error('Email confirmation failed', error);
  }
};
