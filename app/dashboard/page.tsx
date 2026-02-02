'use client';

import { useEffect, useState } from 'react';

type Appointment = {
  id: string;
  date: string;
  time: string;
  type: string;
  user: {
    first_name: string;
    last_name: string;
  };
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    const res = await fetch('/api/admin/appointments');
    const data = await res.json();
    setAppointments(data.appointments || []);
    setLoading(false);
  };

  const deleteAppointment = async (id: string) => {
    await fetch('/api/admin/appointments/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadAppointments();
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  if (loading) return <p>Lade Termine…</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Terminübersicht</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-neutral-100">
            <th className="p-2 border">Datum</th>
            <th className="p-2 border">Zeit</th>
            <th className="p-2 border">Kunde</th>
            <th className="p-2 border">Typ</th>
            <th className="p-2 border">Aktion</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td className="p-2 border">{a.date}</td>
              <td className="p-2 border">{a.time}</td>
              <td className="p-2 border">
                {a.user.first_name} {a.user.last_name}
              </td>
              <td className="p-2 border">{a.type}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteAppointment(a.id)}
                  className="text-red-600"
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
