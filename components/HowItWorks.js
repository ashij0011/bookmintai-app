export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Enter a Topic',
      desc: "Type any subject — animals, fantasy, science, history — and we'll build a book around it.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="square" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Choose Page Count',
      desc: 'Select between 10 and 50 pages. More pages means a bigger, richer coloring book.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="square" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'AI Generates Pages',
      desc: 'DALL·E 3 creates unique black-and-white line art for every single page — no repeats.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="square" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Download Your PDF',
      desc: 'Get a print-ready 8.5×11" PDF with a cover page. Print at home or at a copy shop.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="square" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="section-label">Process</span>
          <h2
            className="font-display text-3xl md:text-4xl text-ink-900 mt-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            From idea to coloring book
            <br />
            <em>in four steps</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-ink-100 z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center px-6 py-8">
                {/* Number badge */}
                <div className="w-16 h-16 border-2 border-ink-900 bg-cream flex items-center justify-center mb-4">
                  <span
                    className="font-display text-xl font-bold text-rust"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-ink-600 mb-3">{step.icon}</div>

                <h3 className="font-body font-semibold text-ink-900 mb-2 text-base">
                  {step.title}
                </h3>
                <p className="text-ink-500 font-body text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
