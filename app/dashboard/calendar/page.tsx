'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

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

export default function AdminCalendarWeek() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [weekStart, setWeekStart] = useState(dayjs().startOf('isoWeek'));

  const weekEnd = weekStart.endOf('isoWeek');

  const loadAppointments = async () => {
    const res = await fetch(
      `/api/admin/calendar?from=${weekStart.format('YYYY-MM-DD')}&to=${weekEnd.format('YYYY-MM-DD')}`
    );
    const data = await res.json();
    setAppointments(data.appointments || []);
  };

  useEffect(() => {
    loadAppointments();
  }, [weekStart]);

  const days = Array.from({ length: 5 }, (_, i) =>
    weekStart.add(i, 'day')
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Kalender – Woche {weekStart.isoWeek()}
        </h1>
        <div className="space-x-2">
          <button
            onClick={() => setWeekStart(weekStart.subtract(1, 'week'))}
            className="px-3 py-1 border rounded"
          >
            ←
          </button>
          <button
            onClick={() => setWeekStart(weekStart.add(1, 'week'))}
            className="px-3 py-1 border rounded"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {days.map((day) => (
          <div key={day.toString()} className="border rounded p-3">
            <h2 className="font-semibold mb-2">
              {day.format('dddd DD.MM')}
            </h2>

            {appointments
              .filter((a) => a.date === day.format('YYYY-MM-DD'))
              .map((a) => (
                <div
                  key={a.id}
                  className="mb-2 rounded bg-neutral-100 p-2 text-sm"
                >
                  <div className="font-semibold">
                    {a.time} – {a.user.first_name} {a.user.last_name}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {a.type}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
