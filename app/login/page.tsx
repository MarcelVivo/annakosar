'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const resetMessages = () => setError(null);

  // --------------------
  // LOGIN
  // --------------------
  const handleLogin = async () => {
    resetMessages();

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setError('Login fehlgeschlagen.');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError) {
      setError(profileError.message);
      return;
    }

    router.push(profile?.role === 'admin' ? '/dashboard' : '/book');
  };

  // --------------------
  // REGISTRIERUNG
  // --------------------
  const handleSignup = async () => {
    resetMessages();

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://www.annakosar.com/login',
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setError('Registrierung fehlgeschlagen.');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        role: 'customer',
        first_name: firstName,
        last_name: lastName,
      });

    if (profileError) {
      setError(profileError.message);
      return;
    }

    router.push('/book');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      mode === 'login' ? await handleLogin() : await handleSignup();
    });
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.18em] text-gold">
          Kunden-Login
        </p>
        <h1 className="font-heading text-4xl text-charcoal">
          Sicherer Zugang zu Ihren Terminen.
        </h1>
        <p className="text-lg text-neutral-700">
          Melden Sie sich mit E-Mail und Passwort an oder erstellen Sie ein
          Konto, um Termine zu buchen.
        </p>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex gap-2 rounded-full bg-neutral-100 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold ${
              mode === 'login'
                ? 'bg-white shadow text-charcoal'
                : 'text-neutral-600'
            }`}
          >
            Einloggen
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold ${
              mode === 'signup'
                ? 'bg-white shadow text-charcoal'
                : 'text-neutral-600'
            }`}
          >
            Registrieren
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm">
            <span className="font-semibold">E-Mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </label>

          {mode === 'signup' && (
            <>
              <label className="block space-y-2 text-sm">
                <span className="font-semibold">Vorname</span>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-semibold">Nachname</span>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </label>
            </>
          )}

          <label className="block space-y-2 text-sm">
            <span className="font-semibold">Passwort</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </label>

          {mode === 'signup' && (
            <label className="block space-y-2 text-sm">
              <span className="font-semibold">Passwort bestätigen</span>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              />
            </label>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-gold py-3 font-semibold uppercase"
          >
            {isPending
              ? 'Bitte warten…'
              : mode === 'login'
              ? 'Einloggen'
              : 'Registrieren'}
          </button>
        </form>
      </div>
    </div>
  );
}