'use client';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ink-100 bg-cream/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="BookMint AI Home">
          <div className="w-7 h-7 bg-ink-900 flex items-center justify-center group-hover:bg-rust transition-colors duration-200">
            <svg className="w-4 h-4 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span
            className="font-display font-semibold text-ink-900 text-lg leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            BookMint <span className="text-rust">AI</span>
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-body text-ink-600 hover:text-ink-900 transition-colors">
            How it works
          </a>
          <a href="#examples" className="text-sm font-body text-ink-600 hover:text-ink-900 transition-colors">
            Examples
          </a>
          <a
            href="#generate"
            className="px-5 py-2 bg-ink-900 text-cream text-sm font-body font-medium
                       hover:bg-rust transition-colors duration-200"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile CTA */}
        <a
          href="#generate"
          className="md:hidden px-4 py-2 bg-ink-900 text-cream text-xs font-body font-medium
                     hover:bg-rust transition-colors duration-200"
        >
          Create Book
        </a>
      </div>
    </header>
  );
}
