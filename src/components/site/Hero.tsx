import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
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
          className="absolute inset-0 h-[115%] w-full object-cover animate-slow-zoom"
        />
      </div>

      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--wood-deep))]/70 via-[hsl(var(--wood-deep))]/35 to-[hsl(var(--wood-deep))]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,hsl(var(--wood-deep))/0.45_75%)]" />

      {/* Decorative gold arch outline */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 700"
        className="pointer-events-none absolute right-[-100px] top-1/2 -translate-y-1/2 h-[90%] w-auto opacity-15 hidden md:block"
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
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 container-luxe flex min-h-screen flex-col justify-center pt-32 pb-24">
        <p className="eyebrow text-[hsl(var(--gold-soft))] mb-6 animate-fade-in">
          Interiors by Dinesh — Est. Studio
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-cream max-w-4xl animate-fade-up">
          Where Tradition <em className="not-italic text-[hsl(var(--gold-soft))]">Meets</em> Modern Living
        </h1>
        <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[hsl(var(--gold-soft))] to-transparent animate-fade-in" style={{ animationDelay: "300ms" }} />
        <p className="mt-8 max-w-xl text-base md:text-lg text-cream/80 leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
          A premium interior design studio crafting homes that honour Indian heritage
          through a quiet, modern lens — handpicked materials, considered light, and rooms that feel like you.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <Button asChild size="lg" className="rounded-none bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] hover:bg-[hsl(var(--gold-soft))] px-8 h-12 text-xs uppercase tracking-[0.28em]">
            <Link to="/portfolio">Explore Portfolio</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-none bg-transparent border-cream/60 text-cream hover:bg-cream hover:text-[hsl(var(--wood-deep))] px-8 h-12 text-xs uppercase tracking-[0.28em]">
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 container-luxe flex items-end justify-between text-cream/70 text-xs tracking-[0.28em] uppercase animate-fade-in" style={{ animationDelay: "600ms" }}>
        <span>Bengaluru · Mumbai · Delhi</span>
        <span className="hidden md:inline">Scroll ↓</span>
      </div>
    </section>
  );
};

export default Hero;
