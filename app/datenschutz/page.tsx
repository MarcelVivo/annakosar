import { cookies } from 'next/headers';
import { translations, normalizeLanguage } from '@/lib/i18n';

export const metadata = { title: 'Datenschutz | Anna Kosar' };

export default function DatenschutzPage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].legal.privacy;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl text-charcoal">{t.title}</h1>
      {t.paragraphs.map((text: string) => (
        <p key={text} className="text-neutral-700">
          {text}
        </p>
      ))}
    </div>
  );
}
