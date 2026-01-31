import Link from 'next/link';
import { translations, type Language } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Language }) {
  const year = new Date().getFullYear();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-width flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-charcoal">Anna Kosar</p>
          <p className="text-sm text-neutral-600">{t.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <Link href="/datenschutz">{t.privacy}</Link>
          <Link href="/impressum">{t.imprint}</Link>
          <span className="text-neutral-500">{t.copyrightPrefix} {year} Anna Kosar</span>
        </div>
      </div>
    </footer>
  );
}
