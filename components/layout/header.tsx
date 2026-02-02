'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import LanguageSwitcher from './language-switcher';
import { useLanguage } from './language-provider';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  const nav = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/book', label: t('nav.book') },
    { href: '/login', label: t('nav.login') }
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="container-width flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            AK
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Anna Kosar</p>
            <p className="font-heading text-xl text-charcoal">Psychologische Beratung</p>
          </div>
        </Link>

        <button
          className="md:hidden rounded-full border border-neutral-200 p-2 text-charcoal"
          onClick={() => setOpen((v) => !v)}
          aria-label="Navigation umschalten"
        >
          <span className="block h-0.5 w-5 bg-charcoal" />
          <span className="mt-1 block h-0.5 w-5 bg-charcoal" />
          <span className="mt-1 block h-0.5 w-5 bg-charcoal" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <nav
            className={clsx(
              'absolute left-0 right-0 top-full bg-white shadow-md md:static md:block md:shadow-none',
              open ? 'block' : 'hidden'
            )}
          >
            <ul className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center md:gap-6 md:px-0 md:py-0">
              <li className="md:hidden">
                <LanguageSwitcher />
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center justify-between gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors md:text-base',
                      pathname === item.href
                        ? 'bg-gold/10 text-gold'
                        : 'text-charcoal hover:text-gold'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="md:ml-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:shadow-subtle"
                  onClick={() => setOpen(false)}
                >
                  {t('nav.cta')}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-neutral-200 px-4 py-2 text-sm font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
