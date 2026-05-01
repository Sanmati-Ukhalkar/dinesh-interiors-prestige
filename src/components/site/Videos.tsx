const videos = [
  { title: "Bengaluru Penthouse — Walkthrough", duration: "06:24" },
  { title: "Jaipur Heritage Home Tour", duration: "08:11" },
];

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
  </svg>
);

const Videos = () => (
  <section id="tours" className="py-24 md:py-36 bg-[hsl(var(--wood-deep))] text-cream">
    <div className="container-luxe">
      <div className="max-w-2xl mb-16">
        <p className="eyebrow text-[hsl(var(--gold-soft))] mb-5">Home Tours</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-cream">
          Step inside our completed homes.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {videos.map((v) => (
          <button
            key={v.title}
            type="button"
            className="group relative aspect-video w-full overflow-hidden bg-[hsl(var(--wood))] text-left"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wood))_0%,hsl(var(--wood-deep))_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] transition-transform duration-500 group-hover:scale-110">
                <PlayIcon />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
              <h3 className="font-serif text-2xl md:text-3xl text-cream max-w-xs">{v.title}</h3>
              <span className="text-xs tracking-[0.28em] text-[hsl(var(--gold-soft))]">{v.duration}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-12 text-cream/60 text-sm">YouTube embeds can be added to each tile.</p>
    </div>
  </section>
);

export default Videos;
