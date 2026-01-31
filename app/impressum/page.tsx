import { cookies } from 'next/headers';
import { translations, normalizeLanguage } from '@/lib/i18n';

export const metadata = { title: 'Impressum | Anna Kosar' };

export default function ImpressumPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].legal.imprint;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl text-charcoal">{t.title}</h1>
      <p className="text-neutral-700">{t.intro}</p>
      <div className="rounded-xl border border-neutral-200 bg-white p-4 text-neutral-700">
        <p className="font-semibold text-charcoal">Anna Kosar</p>
        <p>{t.role}</p>
        <p>E-Mail: kontakt@annakosar.com</p>
      </div>
      <p className="text-neutral-700">{t.hosting}</p>
    </div>
  );
}
