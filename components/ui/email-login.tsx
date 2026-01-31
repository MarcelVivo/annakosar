'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';
import { useLanguage } from '@/components/layout/language-provider';

export default function EmailLogin() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    startTransition(async () => {
      const redirectTo = `${window.location.origin}/api/auth/callback`;
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo }
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      setMessage(t('login.sentMessage'));
      setTimeout(() => router.push('/book'), 1500);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2 text-sm text-neutral-700">
        <span className="font-semibold text-charcoal">{t('login.emailLabel')}</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2"
          placeholder={t('login.emailPlaceholder')}
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}
      <button
        type="submit"
        className="rounded-full bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-subtle transition hover:-translate-y-0.5 hover:shadow-lg"
        disabled={isPending}
      >
        {isPending ? t('login.sending') : t('login.send')}
      </button>
    </form>
  );
}
