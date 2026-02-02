'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'signup';

export default function LoginPage() {
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

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Login fehlgeschlagen');
      return;
    }

    router.push(data.role === 'admin' ? '/dashboard' : '/book');
  };

  const handleSignup = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registrierung fehlgeschlagen');
      return;
    }

    router.push('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(mode === 'login' ? handleLogin : handleSignup);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">
        {mode === 'login' ? 'Login' : 'Registrieren'}
      </h1>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 py-2 rounded border ${
            mode === 'login' ? 'bg-gold text-white border-gold' : 'bg-white'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 rounded border ${
            mode === 'signup' ? 'bg-gold text-white border-gold' : 'bg-white'
          }`}
        >
          Registrieren
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </>
        )}

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        {mode === 'signup' && (
          <input
            type="password"
            placeholder="Passwort bestätigen"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gold py-3 rounded font-semibold"
        >
          {isPending
            ? 'Bitte warten…'
            : mode === 'login'
            ? 'Einloggen'
            : 'Registrieren'}
        </button>
      </form>
    </div>
  );
}
