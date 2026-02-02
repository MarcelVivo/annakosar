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

  const handleLogin = async () => {
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/book');
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

    if (error) {
      setError(error.message);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      mode === 'login' ? await handleLogin() : await handleSignup();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('login')}>
          Einloggen
        </button>
        <button type="button" onClick={() => setMode('signup')}>
          Registrieren
        </button>
      </div>

      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {mode === 'signup' && (
        <>
          <input
            type="text"
            placeholder="Vorname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nachname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </>
      )}

      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {mode === 'signup' && (
        <input
          type="password"
          placeholder="Passwort bestätigen"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isPending}>
        {mode === 'login' ? 'Einloggen' : 'Registrieren'}
      </button>
    </form>
  );
}