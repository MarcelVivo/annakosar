'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

type Appointment = {
  id: string;
  date: string;
  time: string;
  type: string;
};

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const loadAppointments = async (uid: string) => {
    const res = await fetch('/api/appointments/mine', {
      headers: { 'x-user-id': uid },
    });
    const data = await res.json();
    setAppointments(data.appointments || []);
  };

  const cancelAppointment = async (id: string, uid: string) => {
    await fetch('/api/appointments/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentId: id, userId: uid }),
    });
    loadAppointments(uid);
  };

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id;
      if (uid) {
        setUserId(uid);
        loadAppointments(uid);
      }
    });
  }, []);

  if (!userId) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Meine Termine</h2>
        <p className="text-sm text-neutral-600">Bitte einloggen, um Termine zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Meine Termine</h2>

      {appointments.map((a) => (
        <div
          key={a.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <div>
            {a.date} – {a.time} ({a.type})
          </div>
          <button
            onClick={() => cancelAppointment(a.id, userId)}
            className="text-red-600"
          >
            Stornieren
          </button>
        </div>
      ))}
    </div>
  );
}
