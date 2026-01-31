import { cookies } from 'next/headers';
import { translations, normalizeLanguage } from '@/lib/i18n';

export const metadata = {
  title: 'Über mich | Anna Kosar'
};

export default function AboutPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].about;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.eyebrow}</p>
        <h1 className="font-heading text-4xl text-charcoal">{t.title}</h1>
        <p className="max-w-3xl text-lg text-neutral-700">
          {t.intro}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-heading text-2xl text-charcoal">{t.cards.workingStyle.title}</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            {t.cards.workingStyle.bullets.map((item: string) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="font-heading text-2xl text-charcoal">{t.cards.attitude.title}</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            {t.cards.attitude.bullets.map((item: string) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-heading text-2xl text-charcoal">{t.focusTitle}</h2>
        <p className="mt-3 text-neutral-700">
          {t.focusText}
        </p>
      </div>
    </div>
  );
}
