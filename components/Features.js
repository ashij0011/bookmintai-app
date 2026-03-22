export default function Features() {
  const features = [
    {
      title: 'Unlimited Topics',
      desc: 'From dinosaurs to deep sea creatures — if you can describe it, we can draw it.',
    },
    {
      title: 'Print-Ready PDF',
      desc: 'Every book is formatted to 8.5×11" US Letter with proper margins. Perfect for home printing.',
    },
    {
      title: 'Unique Every Time',
      desc: "AI generates fresh illustrations for every request. Your dinosaur book won't look like anyone else's.",
    },
    {
      title: 'Kid-Friendly Art',
      desc: 'Thick, bold outlines optimized for coloring. Simple enough for young children, detailed enough for adults.',
    },
    {
      title: 'Branded Cover',
      desc: 'Every PDF includes a custom cover page with your topic title and page count.',
    },
    {
      title: 'Instant Download',
      desc: 'No account required. Generate, download, and print. Done.',
    },
  ];

  return (
    <section id="examples" className="py-20 md:py-28 bg-parchment border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label">Features</span>
          <h2
            className="font-display text-3xl md:text-4xl text-ink-900 mt-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Everything you need,
            <br />
            <em>nothing you don't</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-100">
          {features.map((f, i) => (
            <div key={i} className="bg-parchment p-8 hover:bg-white transition-colors duration-200">
              <div className="w-8 h-1 bg-rust mb-4" />
              <h3
                className="font-body font-semibold text-ink-900 text-base mb-2"
              >
                {f.title}
              </h3>
              <p className="text-ink-500 font-body text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Sample topics strip */}
        <div className="mt-14 text-center">
          <p className="section-label mb-4">Popular Topics</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Dinosaurs', 'Space', 'Ocean', 'Jungle', 'Fairy Tales',
              'Robots', 'Unicorns', 'Farm', 'Superheroes', 'Vehicles',
              'Flowers', 'Castles', 'Bugs', 'Vikings', 'Mermaids',
            ].map((t) => (
              <span
                key={t}
                className="px-4 py-1.5 text-sm font-body text-ink-700 border border-ink-200 bg-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
