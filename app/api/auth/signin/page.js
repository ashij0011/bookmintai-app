'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }

    setLoading(true);

    const res  = await fetch('/api/auth/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || 'Registration failed.'); setLoading(false); return; }

    const signInRes = await signIn('credentials', {
      email: form.email, password: form.password, redirect: false,
    });

    setLoading(false);
    if (signInRes?.error) { router.push('/auth/signin'); return; }

    router.push('/dashboard');
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
          <p className="text-ink-500 font-body text-sm mt-2">Create your account</p>
        </div>

        <div className="card-paper p-8">
          {error && (
            <div className="mb-5 px-4 py-3 bg-rust/10 border border-rust/30 text-rust text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {[
              { id: 'name',     label: 'Full Name',        type: 'text',     auto: 'name'        },
              { id: 'email',    label: 'Email',            type: 'email',    auto: 'email'        },
              { id: 'password', label: 'Password',         type: 'password', auto: 'new-password' },
              { id: 'confirm',  label: 'Confirm Password', type: 'password', auto: 'new-password' },
            ].map(({ id, label, type, auto }) => (
              <div key={id} className="mb-5">
                <label className="block text-sm font-body font-medium text-ink-700 mb-1.5" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id} type={type} className="input-field"
                  value={form[id]} onChange={update(id)}
                  required autoComplete={auto} disabled={loading}
                />
              </div>
            ))}

            <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm font-body text-ink-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-rust hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}