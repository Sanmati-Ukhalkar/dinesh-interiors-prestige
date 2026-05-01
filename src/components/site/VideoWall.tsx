import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";
import hero from "@/assets/hero.jpg";
import fusion from "@/assets/style-fusion.jpg";
import Reveal from "./Reveal";

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
  <section className="relative py-24 md:py-36 bg-[hsl(var(--wood-deep))] text-cream overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]">
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
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <p className="eyebrow text-[hsl(var(--gold-soft))] mb-5">From the Studio</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-cream">
            Step inside our completed homes.
          </h2>
        </div>
        <p className="text-cream/70 max-w-md">
          A wall of recent reels and full home walkthroughs — the most honest way to feel a space before you visit.
        </p>
      </Reveal>

      {/* YouTube horizontal */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {youtube.map((v, i) => (
          <Reveal key={v.title} delay={i * 120}>
            <button type="button" className="group relative aspect-video w-full overflow-hidden bg-[hsl(var(--wood))] text-left">
              <img src={v.img} alt={v.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))] via-[hsl(var(--wood-deep))]/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] transition-transform duration-500 group-hover:scale-110">
                  <PlayIcon />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="font-serif text-xl md:text-2xl text-cream max-w-xs">{v.title}</h3>
                <span className="text-[10px] tracking-[0.28em] text-[hsl(var(--gold-soft))]">{v.duration}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Vertical reels */}
      <Reveal>
        <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))] mb-5">Instagram Reels</p>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {reels.map((r, i) => (
          <Reveal key={r.label} delay={i * 80}>
            <button type="button" className="group relative aspect-[9/16] w-full overflow-hidden bg-[hsl(var(--wood))] block">
              <img src={r.img} alt={r.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/85 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[hsl(var(--gold))]/0 group-hover:ring-[hsl(var(--gold))]/40 transition-all duration-500" />
              <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--gold))]/90 text-[hsl(var(--wood-deep))]">
                <PlayIcon />
              </span>
              <p className="absolute bottom-3 left-3 right-3 text-[11px] uppercase tracking-[0.22em] text-cream/85">{r.label}</p>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default VideoWall;
