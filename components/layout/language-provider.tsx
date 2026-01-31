'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '@/lib/i18n';
import { getTranslation, normalizeLanguage } from '@/lib/i18n';

type LanguageContextValue = {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: <T = string>(path: string) => T;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  initialLang,
  children
}: {
  initialLang: Language;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [lang, setLang] = useState<Language>(initialLang);

  const setLanguage = useCallback(
    (code: Language) => {
      const next = normalizeLanguage(code);
      setLang(next);

      if (typeof document !== 'undefined') {
        document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lang', next);
      }
      router.refresh();
    },
    [router]
  );

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    if (stored) {
      const normalized = normalizeLanguage(stored);
      if (normalized !== initialLang) {
        setLanguage(normalized);
      }
    }
  }, [initialLang, setLanguage]);

  const t = useCallback(<T,>(path: string): T => getTranslation<T>(lang, path), [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLanguage,
      t
    }),
    [lang, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
