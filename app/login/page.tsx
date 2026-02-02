'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async () => {
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setError(error?.message ?? 'Login fehlgeschlagen');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    router.push(profile?.role === 'admin' ? '/dashboard' : '/book');
  };

  const handleSignup = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://www.annakosar.com/login',
      },
    });

    if (error || !data.user) {
      setError(error?.message ?? 'Registrierung fehlgeschlagen');
      return;
    }

    await supabase.from('profiles').insert({
      id: data.user.id,
      role: 'customer',
      first_name: firstName,
      last_name: lastName,
    });

    router.push('/book');
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        {/* LEFT TEXT */}
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gold mb-4">
            Kunden-Login
          </p>
          <h1 className="font-heading text-4xl text-charcoal mb-4">
            Sicherer Zugang zu Ihren Terminen
          </h1>
          <p className="text-lg text-neutral-700">
            Melden Sie sich an oder erstellen Sie ein Konto, um Termine zu buchen.
          </p>
        </div>

        {/* CARD */}
        <div className="rounded-2xl bg-white shadow-xl p-8">
          <div className="flex mb-6 bg-neutral-100 rounded-full p-1">
            <button
              className={`flex-1 rounded-full py-2 text-sm font-semibold ${
                mode === 'login'
                  ? 'bg-white shadow text-charcoal'
                  : 'text-neutral-600'
              }`}
              onClick={() => setMode('login')}
            >
              Einloggen
            </button>
            <button
              className={`flex-1 rounded-full py-2 text-sm font-semibold ${
                mode === 'signup'
                  ? 'bg-white shadow text-charcoal'
                  : 'text-neutral-600'
              }`}
              onClick={() => setMode('signup')}
            >
              Registrieren
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTransition(() =>
                mode === 'login' ? handleLogin() : handleSignup()
              );
            }}
            className="space-y-4"
          >
            <input
              className="w-full rounded-lg border px-4 py-3"
              placeholder="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {mode === 'signup' && (
              <>
                <input
                  className="w-full rounded-lg border px-4 py-3"
                  placeholder="Vorname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="w-full rounded-lg border px-4 py-3"
                  placeholder="Nachname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </>
            )}

            <input
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            {mode === 'signup' && (
              <input
                className="w-full rounded-lg border px-4 py-3"
                placeholder="Passwort bestätigen"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              disabled={isPending}
              className="w-full rounded-full bg-gold py-4 font-semibold uppercase tracking-wider text-black hover:opacity-90"
            >
              {mode === 'login' ? 'Einloggen' : 'Registrieren'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}