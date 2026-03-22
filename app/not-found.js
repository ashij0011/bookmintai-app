import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | BookMint AI',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="max-w-md w-full text-center">
        {/* Large 404 */}
        <p
          className="font-display text-[120px] leading-none text-ink-100 select-none mb-0"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="relative -mt-8">
          <div className="w-12 h-1 bg-rust mx-auto mb-6" />
          <h1
            className="font-display text-2xl text-ink-900 mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Page not found
          </h1>
          <p className="text-ink-500 font-body text-sm mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link href="/" className="btn-primary inline-flex">
            ← Back to BookMint AI
          </Link>
        </div>
      </div>
    </div>
  );
}
