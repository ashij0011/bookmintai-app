export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-cream py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-ink-900 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="square" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span
            className="font-display font-semibold text-ink-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            BookMint <span className="text-rust">AI</span>
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-5 text-xs font-body text-ink-400">
          <a href="#" className="hover:text-ink-700 transition-colors">Privacy</a>
          <a href="#" className="hover:text-ink-700 transition-colors">Terms</a>
          <a href="mailto:hello@bookmintai.ca" className="hover:text-ink-700 transition-colors">Contact</a>
        </nav>

        {/* Copyright */}
        <p className="text-xs font-body text-ink-400">
          © {year} BookMint AI · bookmintai.ca
        </p>
      </div>
    </footer>
  );
}
