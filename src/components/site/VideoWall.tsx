import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";
import hero from "@/assets/hero.jpg";
import fusion from "@/assets/style-fusion.jpg";
import Reveal from "./Reveal";

const PlayIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7L8 5z" />
  </svg>
);

const reels = [
  { img: reel1, label: "Carved corner reveal" },
  { img: reel2, label: "Arched window light" },
  { img: reel3, label: "Brass dining tour" },
  { img: reel4, label: "Linen bedroom edit" },
];

const youtube = [
  { img: hero, title: "Bengaluru Penthouse — Full Walkthrough", duration: "06:24" },
  { img: fusion, title: "Jaipur Heritage Home Tour", duration: "08:11" },
];

const VideoWall = () => (
  <section className="relative py-24 md:py-36 bg-[hsl(var(--wood-deep))] text-cream overflow-hidden grain">
    {/* Jali SVG pattern */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="vw-jali" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="hsl(var(--gold-soft))" strokeWidth="0.8">
              <circle cx="40" cy="40" r="18" />
              <path d="M40 4 L48 40 L40 76 L32 40 Z" />
              <path d="M4 40 L40 32 L76 40 L40 48 Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vw-jali)" />
      </svg>
    </div>

    <div className="relative container-luxe">
      {/* Heading */}
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
        <div className="max-w-2xl">
          <p className="eyebrow text-[hsl(var(--gold-soft))] mb-5" style={{ letterSpacing: "0.38em" }}>
            From the Studio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-cream">
            Step inside our{" "}
            <em className="not-italic text-[hsl(var(--gold-soft))]">completed homes.</em>
          </h2>
        </div>
        <p className="text-cream/55 max-w-sm leading-[1.85] text-sm">
          Full walkthroughs and quick reels — the most honest way to feel a space before you visit.
        </p>
      </Reveal>

      {/* YouTube horizontal videos */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-7 mb-10">
        {youtube.map((v, i) => (
          <Reveal key={v.title} delay={i * 120}>
            <button
              type="button"
              className="group relative aspect-video w-full overflow-hidden rounded-sm bg-[hsl(var(--wood))] text-left shadow-[0_4px_20px_-5px_hsl(var(--wood-deep)/0.3)] hover:shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.2)] transition-shadow duration-500"
              aria-label={`Play: ${v.title}`}
            >
              <img
                src={v.img}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))] via-[hsl(var(--wood-deep))]/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] transition-all duration-500 group-hover:scale-110 shadow-[0_15px_40px_-10px_hsl(var(--gold)/0.6)] pl-0.5">
                  <PlayIcon size={20} />
                </span>
              </div>

              {/* Title + duration */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="font-serif text-xl md:text-2xl text-cream leading-tight max-w-[70%]">
                  {v.title}
                </h3>
                <span className="text-[10px] tracking-[0.3em] text-[hsl(var(--gold-soft))] flex-shrink-0">
                  {v.duration}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Reels divider label */}
      <Reveal className="flex items-center gap-6 mb-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))] flex-shrink-0">
          Instagram Reels
        </p>
        <div className="h-px flex-1 bg-[hsl(var(--gold)/0.15)]" />
      </Reveal>

      {/* Vertical reels grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
        {reels.map((r, i) => (
          <Reveal key={r.label} delay={i * 80}>
            <button
              type="button"
              className="group relative aspect-[9/16] w-full overflow-hidden rounded-sm bg-[hsl(var(--wood))] block shadow-[0_4px_20px_-5px_hsl(var(--wood-deep)/0.3)] hover:shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.2)] transition-shadow duration-500"
              aria-label={`Play reel: ${r.label}`}
            >
              <img
                src={r.img}
                alt={r.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/90 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[hsl(var(--gold))]/0 group-hover:ring-[hsl(var(--gold))]/35 transition-all duration-500" />

              {/* Small play icon top-right */}
              <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--gold))]/80 text-[hsl(var(--wood-deep))] group-hover:bg-[hsl(var(--gold))] transition-colors duration-300 pl-0.5">
                <PlayIcon size={12} />
              </span>

              <p className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.22em] text-cream/80 leading-tight">
                {r.label}
              </p>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default VideoWall;
