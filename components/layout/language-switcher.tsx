'use client';

import clsx from 'clsx';
import { languageOptions } from '@/lib/i18n';
import { useLanguage } from './language-provider';

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 px-1 py-1 shadow-subtle">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          className={clsx(
            'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
            lang === option.code
              ? 'bg-gold text-black shadow-sm'
              : 'text-neutral-700 hover:text-gold'
          )}
          aria-label={`Sprache ${option.label}`}
        >
          {option.short}
        </button>
      ))}
    </div>
  );
}
