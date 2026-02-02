'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import clsx from 'clsx';
import { useLanguage } from '@/components/layout/language-provider';

interface Props {
  session: Session | null;
  profile: { name?: string | null; email?: string | null } | null;
}

const todayIso = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export default function BookingForm({ session, profile }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const [appointmentType, setAppointmentType] = useState<'free_intro' | 'session'>('session');
  const [channel, setChannel] = useState<'zoom' | 'teams'>('zoom');
  const [selectedDate, setSelectedDate] = useState<string>(todayIso());
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>(profile?.name ?? '');
  const [email, setEmail] = useState<string>(profile?.email ?? session?.user.email ?? '');
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const timeSuffix = t<string>('bookingForm.timeSuffix');

  const minDate = useMemo(() => todayIso(), []);

  const fetchSlots = async (date: string) => {
    setLoadingSlots(true);
    setError('');
    try {
      const res = await fetch(`/api/appointments/slots?date=${date}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Slots konnten nicht geladen werden');
      setSlots(Array.isArray(data.slots) ? data.slots : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!session) {
      setError(t('bookingForm.errors.login'));
      return;
    }

    if (!selectedTime) {
      setError(t('bookingForm.errors.selectTime'));
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/appointments/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: session.user.id,
            date: selectedDate,
            time: selectedTime,
            type: appointmentType,
            customerEmail: email
          })
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || t('bookingForm.errors.bookingFailed'));
          return;
        }
        setSuccess(t('bookingForm.success'));
        setTimeout(() => router.push('/dashboard'), 1200);
      } catch (err: any) {
        setError(err.message || t('bookingForm.errors.bookingFailed'));
      }
    });
  };

  return (
    <div className="card p-6">
      {!session && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t('bookingForm.loginNotice')}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-neutral-700">
            <span className="font-semibold text-charcoal">{t('bookingForm.labels.appointmentType')}</span>
            <select
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value as 'free_intro' | 'session')}
            >
              <option value="free_intro">{t('bookingForm.appointmentOptions.freeIntro')}</option>
              <option value="session">{t('bookingForm.appointmentOptions.session')}</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-neutral-700">
            <span className="font-semibold text-charcoal">{t('bookingForm.labels.video')}</span>
            <select
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
              value={channel}
              onChange={(e) => setChannel(e.target.value as 'zoom' | 'teams')}
            >
              <option value="zoom">{t('bookingForm.channels.zoom')}</option>
              <option value="teams">{t('bookingForm.channels.teams')}</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <label className="space-y-2 text-sm text-neutral-700">
            <span className="font-semibold text-charcoal">{t('bookingForm.labels.date')}</span>
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
              required
            />
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-charcoal">{t('bookingForm.labels.availableTimes')}</span>
              {loadingSlots && <span className="text-xs text-neutral-500">{t('bookingForm.loading')}</span>}
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
              {slots.length === 0 && !loadingSlots && (
                <p className="col-span-3 text-sm text-neutral-600">{t('bookingForm.noSlots')}</p>
              )}
              {slots.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={clsx(
                    'rounded-lg border px-3 py-2 text-sm transition',
                    'border-neutral-300 text-charcoal hover:border-gold hover:text-gold',
                    selectedTime === time && 'border-gold bg-gold/10 text-gold'
                  )}
                >
                  {time}{timeSuffix ? ` ${timeSuffix}` : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-neutral-700">
            <span className="font-semibold text-charcoal">{t('bookingForm.labels.name')}</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
              placeholder={t('bookingForm.labels.name')}
            />
          </label>
          <label className="space-y-2 text-sm text-neutral-700">
            <span className="font-semibold text-charcoal">{t('bookingForm.labels.email')}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
              placeholder="name@email.com"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">{success}</p>}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!session || isPending}
            className="rounded-full bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? t('bookingForm.actions.booking') : t('bookingForm.actions.confirm')}
          </button>
          <p className="text-sm text-neutral-600">
            {t('bookingForm.inlineNote')}
          </p>
        </div>
      </form>
    </div>
  );
}
