import EmailLogin from '@/components/ui/email-login';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { translations, normalizeLanguage } from '@/lib/i18n';

export const metadata = {
  title: 'Login | Anna Kosar'
};

export default function LoginPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].login;

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.eyebrow}</p>
        <h1 className="font-heading text-4xl text-charcoal">{t.title}</h1>
        <p className="text-lg text-neutral-700">
          {t.intro}
        </p>
        <Link href="/book" className="text-sm font-semibold text-gold hover:text-charcoal">
          {t.cta}
        </Link>
      </div>
      <div className="card p-6">
        <h2 className="font-heading text-2xl text-charcoal">{t.cardTitle}</h2>
        <p className="mt-2 text-sm text-neutral-600">{t.cardSubtitle}</p>
        <div className="mt-4">
          <EmailLogin />
        </div>
      </div>
    </div>
  );
}
