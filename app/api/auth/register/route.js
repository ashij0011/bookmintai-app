'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router     = useRouter();
  const params     = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/dashboard';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      email, password, redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <span className="font-display text-3xl text-ink-900" style={{ fontFamily: 'var(--font-display)' }}>
              BookMint <span className="text-rust">AI</span>
            </span>
          </Link>
          <p className="text-ink-500 font-body text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="card-paper p-8">
          {error && (
            <div className="mb-5 px-4 py-3 bg-rust/10 border border-rust/30 text-rust text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label className="block text-sm font-body font-medium text-ink-700 mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email" type="email" className="input-field"
                value={email} onChange={(e) => setEmail(e.target.value)}
                required autoComplete="email" disabled={loading}
              />
            </div>

            <div className="mb-7">
              <label className="block text-sm font-body font-medium text-ink-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password" type="password" className="input-field"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required autoComplete="current-password" disabled={loading}
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm font-body text-ink-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-rust hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}