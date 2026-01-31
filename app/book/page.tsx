import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import BookingForm from '@/components/booking/booking-form';
import { translations, normalizeLanguage } from '@/lib/i18n';

export const metadata = {
  title: 'Termin buchen | Anna Kosar'
};

export default async function BookPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].book;
  const hasSupabaseEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let session = null;
  let profile: { data: { name?: string | null; email?: string | null } | null } | null = null;

  if (hasSupabaseEnv) {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session: s }
    } = await supabase.auth.getSession();
    session = s;
    profile = session
      ? await supabase.from('users').select('name, email').eq('id', session.user.id).maybeSingle()
      : null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.eyebrow}</p>
        <h1 className="font-heading text-4xl text-charcoal">{t.title}</h1>
        <p className="max-w-3xl text-lg text-neutral-700">
          {t.intro}
        </p>
      </div>

      {!hasSupabaseEnv && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t.envWarning}
        </div>
      )}

      <BookingForm session={session} profile={profile?.data ?? null} />
    </div>
  );
}
