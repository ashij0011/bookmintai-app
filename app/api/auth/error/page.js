'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ERRORS = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied:  'You do not have permission to sign in.',
  Verification:  'The sign-in link is no longer valid.',
  Default:       'An authentication error occurred.',
};

export default function AuthErrorPage() {
  const params = useSearchParams();
  const msg    = ERRORS[params.get('error')] || ERRORS.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="max-w-md w-full text-center card-paper p-10">
        <h1 className="font-display text-xl text-ink-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Authentication Error
        </h1>
        <p className="text-ink-500 font-body text-sm mb-7">{msg}</p>
        <Link href="/auth/signin" className="btn-primary inline-flex">Try Again</Link>
      </div>
    </div>
  );
}