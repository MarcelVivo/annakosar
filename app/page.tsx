import Link from 'next/link';
import { cookies } from 'next/headers';
import { translations, normalizeLanguage } from '@/lib/i18n';

export default function HomePage() {
  const lang = normalizeLanguage(cookies().get('lang')?.value);
  const t = translations[lang].home;

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-[#f7f2e8] border border-neutral-100 shadow-subtle">
        <div className="absolute inset-0 opacity-60" aria-hidden>
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="relative grid gap-10 px-8 py-12 md:grid-cols-[1.2fr_1fr] md:items-center md:px-12 md:py-16">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p>
            <h1 className="font-heading text-4xl leading-tight text-charcoal md:text-5xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-lg text-neutral-700">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book"
                className="rounded-full bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t.ctas.book}
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal transition hover:border-gold hover:text-gold"
              >
                {t.ctas.services}
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-neutral-700">
              {t.bullets.map((item: string) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="card relative overflow-hidden p-8">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/15 blur-2xl" aria-hidden />
              <p className="text-sm uppercase tracking-[0.2em] text-gold">{t.profile.eyebrow}</p>
              <h2 className="mt-3 font-heading text-3xl text-charcoal">{t.profile.title}</h2>
              <p className="mt-3 text-neutral-700">
                {t.profile.text}
              </p>
              <div className="mt-6 space-y-3 text-sm text-neutral-700">
                {t.profile.bullets.map((item: string) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-neutral-200 bg-white/80 p-4 text-sm text-neutral-700">
                <p className="font-semibold text-charcoal">{t.profile.freeIntroTitle}</p>
                <p className="text-neutral-700">{t.profile.freeIntroText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding grid gap-10 md:grid-cols-3">
        {t.pillars.map((item: { title: string; text: string }) => (
          <div key={item.title} className="card h-full p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-gold">{item.title}</p>
            <p className="mt-3 text-base text-neutral-700">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="section-padding grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.steps.eyebrow}</p>
          <h2 className="font-heading text-3xl text-charcoal">{t.steps.title}</h2>
          <ol className="space-y-4 text-neutral-700">
            {t.steps.items.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="card p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-gold">{t.actionCard.eyebrow}</p>
          <h3 className="mt-3 font-heading text-2xl text-charcoal">{t.actionCard.title}</h3>
          <p className="mt-2 text-neutral-700">
            {t.actionCard.text}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-black"
            >
              {t.actionCard.ctas.book}
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal"
            >
              {t.actionCard.ctas.login}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
