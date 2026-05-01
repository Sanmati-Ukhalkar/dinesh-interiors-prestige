import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden grain">
      {/* Parallax + slow zoom layer */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <img
          src={hero}
          alt="Luxury interior with arched window, carved wood and brass details"
          width={1920}
          height={1080}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-[115%] w-full object-cover transition-opacity duration-1000 ${
            loaded ? "opacity-100 animate-slow-zoom" : "opacity-0"
          }`}
        />
      </div>

      {/* Richer gradient overlay — darker at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--wood-deep))]/75 via-[hsl(var(--wood-deep))]/30 to-[hsl(var(--wood-deep))]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_80%_at_40%_50%,transparent_0%,hsl(var(--wood-deep))/0.5_100%)]" />

      {/* Decorative gold arch outline — right edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 700"
        className="pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2 h-[85%] w-auto opacity-[0.12] hidden lg:block"
      >
        <path
          d="M50 650 L50 300 Q50 50 300 50 Q550 50 550 300 L550 650"
          fill="none"
          stroke="hsl(var(--gold-soft))"
          strokeWidth="1.5"
        />
        <path
          d="M110 650 L110 320 Q110 110 300 110 Q490 110 490 320 L490 650"
          fill="none"
          stroke="hsl(var(--gold-soft))"
          strokeWidth="0.75"
        />
      </svg>

      {/* Faint left vertical rule — handcrafted grid feel */}
      <div
        className="absolute top-0 bottom-0 w-px opacity-10 hidden lg:block"
        style={{
          left: "calc((100vw - 80rem) / 2 + 4rem)",
          background: "linear-gradient(to bottom, transparent, hsl(var(--gold-soft)), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-luxe flex min-h-screen flex-col justify-center pt-32 pb-28">
        {/* Eyebrow */}
        <p
          className="eyebrow text-[hsl(var(--gold-soft))] mb-7 animate-fade-in"
          style={{ letterSpacing: "0.38em" }}
        >
          Est. 2009 · Bengaluru
        </p>

        {/* Headline */}
        <h1
          className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.03] text-cream max-w-[17ch] animate-fade-up"
          style={{ fontWeight: 300 }}
        >
          Where Tradition{" "}
          <em className="not-italic text-[hsl(var(--gold-soft))]">Meets</em>{" "}
          Modern Living
        </h1>

        {/* Gold rule */}
        <div
          className="mt-9 h-px w-16 animate-fade-in"
          style={{
            background: "linear-gradient(90deg, hsl(var(--gold-soft)), transparent)",
            animationDelay: "300ms",
          }}
        />

        {/* Subtext */}
        <p
          className="mt-8 max-w-[46ch] text-base md:text-[1.05rem] text-cream/75 leading-[1.8] animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          A premium interior design studio crafting homes that honour Indian heritage
          through a quiet, modern lens — handpicked materials, considered light,
          and rooms that feel like you.
        </p>

        {/* CTAs */}
        <div
          className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-none bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] hover:bg-[hsl(var(--gold-soft))] px-9 h-[52px] text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 hover:px-11"
          >
            <Link to="/portfolio">Explore Portfolio</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-none bg-transparent border-cream/40 text-cream hover:bg-cream hover:text-[hsl(var(--wood-deep))] px-9 h-[52px] text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300"
          >
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-7 left-0 right-0 z-10 container-luxe flex items-end justify-between text-cream/50 text-[10px] tracking-[0.32em] uppercase animate-fade-in"
        style={{ animationDelay: "700ms" }}
      >
        <span>Bengaluru · Mumbai · Delhi</span>
        <span className="hidden md:flex items-center gap-3">
          <span
            className="h-8 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--gold-soft)/0.5))",
            }}
            aria-hidden="true"
          />
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Hero;
