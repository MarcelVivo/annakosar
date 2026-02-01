import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { translations, normalizeLanguage } from '@/lib/i18n';
import { getSupabaseServerComponentClient } from '@/lib/supabase-server';

export const metadata = {
  title: 'Meine Termine | Anna Kosar'
};

export default async function DashboardPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].dashboard;
  const timeSuffix = translations[lang].bookingForm.timeSuffix || '';
  const hasSupabaseEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasSupabaseEnv) {
    return (
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.eyebrow}</p>
        <h1 className="font-heading text-4xl text-charcoal">{t.title}</h1>
        <p className="text-neutral-700">
          {t.envMissing}
        </p>
      </div>
    );
  }

  const supabase = getSupabaseServerComponentClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', session.user.id)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.eyebrow}</p>
        <h1 className="font-heading text-4xl text-charcoal">{t.title}</h1>
        <p className="text-neutral-700">{t.subtitle}</p>
      </div>

      <div className="space-y-4">
        {appointments && appointments.length > 0 ? (
          appointments.map((appt) => (
            <div key={appt.id} className="card flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-gold">
                  {appt.appointment_type === 'free_intro'
                    ? t.appointmentLabels.intro
                    : t.appointmentLabels.session}
                </p>
                <p className="font-heading text-xl text-charcoal">
                  {format(new Date(`${appt.date}T${appt.time}`), 'dd.MM.yyyy')} · {appt.time}{timeSuffix ? ` ${timeSuffix}` : ''}
                </p>
                <p className="text-sm text-neutral-600">{t.status}: {appt.status}</p>
              </div>
              <div className="text-sm text-neutral-700">
                <p className="font-semibold text-charcoal">{t.meetingLink}</p>
                {appt.meeting_link ? (
                  <a className="text-gold underline" href={appt.meeting_link} target="_blank" rel="noreferrer">
                    {t.openMeeting}
                  </a>
                ) : (
                  <p className="text-neutral-500">{t.pendingLink}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card p-6 text-neutral-700">{t.none}</div>
        )}
      </div>
    </div>
  );
}
