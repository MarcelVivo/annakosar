'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(handleLogin);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gold py-3 rounded font-semibold"
        >
          {isPending ? 'Bitte warten…' : 'Einloggen'}
        </button>
      </form>
    </div>
  );
}
