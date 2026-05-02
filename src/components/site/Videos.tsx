import Reveal from "./Reveal";

const videos = [
  { title: "Pune Penthouse — Walkthrough", duration: "06:24" },
  { title: "Jaipur Heritage Home Tour", duration: "08:11" },
];

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
  </svg>
);

const Videos = () => (
  <section id="tours" className="relative py-24 md:py-36 bg-[hsl(var(--wood-deep))] text-cream overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="jali-dark" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="hsl(var(--gold-soft))" strokeWidth="0.8">
              <circle cx="40" cy="40" r="18" />
              <path d="M40 4 L48 40 L40 76 L32 40 Z" />
              <path d="M4 40 L40 32 L76 40 L40 48 Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jali-dark)" />
      </svg>
    </div>

    <div className="relative container-luxe">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow text-[hsl(var(--gold-soft))] mb-5">Home Tours</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-cream">
          Step inside our completed homes.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {videos.map((v, i) => (
          <Reveal key={v.title} delay={i * 150}>
            <button
              type="button"
              className="group relative aspect-video w-full overflow-hidden bg-[hsl(var(--wood))] text-left"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wood))_0%,hsl(var(--wood-deep))_100%)]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[hsl(var(--gold))]/0 group-hover:ring-[hsl(var(--gold))]/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] transition-transform duration-500 group-hover:scale-110 shadow-[0_15px_40px_-10px_hsl(var(--gold)/0.5)]">
                  <PlayIcon />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between">
                <h3 className="font-serif text-2xl md:text-3xl text-cream max-w-xs">{v.title}</h3>
                <span className="text-xs tracking-[0.28em] text-[hsl(var(--gold-soft))]">{v.duration}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 text-cream/60 text-sm">YouTube embeds can be added to each tile.</p>
    </div>
  </section>
);

export default Videos;
