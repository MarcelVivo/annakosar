import { cookies } from 'next/headers';
import { translations, normalizeLanguage } from '@/lib/i18n';

export const metadata = {
  title: 'Leistungen | Anna Kosar'
};

export default function ServicesPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].services;

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
        {t.items.map((service: { title: string; desc: string; detail: string }) => (
          <div key={service.title} className="card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-gold">{service.title}</p>
            <p className="mt-3 text-neutral-700">{service.desc}</p>
            <p className="mt-2 text-sm text-neutral-600">{service.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
