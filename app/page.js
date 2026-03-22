import Navbar from '../components/Navbar';
import GeneratorForm from '../components/GeneratorForm';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(#cfc4b0 1px, transparent 1px), linear-gradient(90deg, #cfc4b0 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Rust corner accent — top left */}
          <div className="absolute top-0 left-0 w-32 h-1 bg-rust" />
          <div className="absolute top-0 left-0 w-1 h-32 bg-rust" />

          {/* Rust corner accent — bottom right */}
          <div className="absolute bottom-0 right-0 w-32 h-1 bg-rust" />
          <div className="absolute bottom-0 right-0 w-1 h-32 bg-rust" />

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-ink-200 bg-white mb-8">
              <span className="w-2 h-2 bg-forest rounded-full animate-pulse-soft" />
              <span className="text-xs font-body font-medium text-ink-600 tracking-wide">
                Powered by DALL·E 3
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-5xl md:text-7xl text-ink-900 leading-[1.08] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Turn any topic into
              <br />
              a <em className="text-rust not-italic">printable</em> coloring book
            </h1>

            {/* Sub-headline */}
            <p className="text-ink-500 font-body text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
              Enter any subject. Choose your page count.
              Download a ready-to-print PDF coloring book — generated entirely by AI, unique every time.
            </p>

            <div className="ornamental-rule max-w-xs mx-auto mb-12">
              <span className="section-label">Start creating below</span>
            </div>

            {/* Generator Form */}
            <div id="generate">
              <GeneratorForm />
            </div>

            {/* Social proof strip */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-body text-ink-500">
              <div className="flex items-center gap-2">
                <span className="text-rust font-semibold text-lg">∞</span>
                <span>Unlimited topics</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-ink-300 rounded-full" />
              <div className="flex items-center gap-2">
                <span className="text-rust font-semibold text-lg">10–50</span>
                <span>pages per book</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-ink-300 rounded-full" />
              <div className="flex items-center gap-2">
                <span className="text-rust font-semibold text-lg">PDF</span>
                <span>print-ready format</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it Works ─────────────────────────────────────────────────── */}
        <HowItWorks />

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <Features />

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="section-label">Ready?</span>
            <h2
              className="font-display text-3xl md:text-5xl text-ink-900 mt-3 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Create your first
              <br />
              <em className="text-rust">coloring book</em> today
            </h2>
            <p className="text-ink-500 font-body mb-10">
              No account needed. Just a topic, a page count, and a few minutes.
            </p>
            <a href="#generate" className="btn-primary text-base px-10 py-4">
              Get Started — It's Free
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
