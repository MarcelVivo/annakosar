'use client';

import { useEffect, useState } from 'react';

type Appointment = {
  id: string;
  date: string;
  time: string;
  type: string;
};

export default function MyAppointments({ userId }: { userId: string }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = async () => {
    const res = await fetch('/api/appointments/mine', {
      headers: { 'x-user-id': userId },
    });
    const data = await res.json();
    setAppointments(data.appointments || []);
  };

  const cancelAppointment = async (id: string) => {
    await fetch('/api/appointments/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentId: id, userId }),
    });
    loadAppointments();
  };

  useEffect(() => {
    loadAppointments();
  }, []);

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
            onClick={() => cancelAppointment(a.id)}
            className="text-red-600"
          >
            Stornieren
          </button>
        </div>
      ))}
    </div>
  );
}
