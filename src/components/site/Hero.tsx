import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="relative min-h-screen w-full overflow-hidden">
    <img
      src={hero}
      alt="Luxury interior with arched window, carved wood and brass details"
      width={1920}
      height={1080}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--wood-deep))]/60 via-[hsl(var(--wood-deep))]/30 to-[hsl(var(--wood-deep))]/70" />

    <div className="relative z-10 container-luxe flex min-h-screen flex-col justify-center pt-32 pb-20">
      <p className="eyebrow text-[hsl(var(--gold-soft))] mb-6">Interiors by Dinesh — Est. Studio</p>
      <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-cream max-w-4xl">
        Where Tradition <em className="not-italic text-[hsl(var(--gold-soft))]">Meets</em> Modern Living
      </h1>
      <p className="mt-8 max-w-xl text-base md:text-lg text-cream/80 leading-relaxed">
        A premium interior design studio crafting homes that honour Indian heritage
        through a quiet, modern lens — handpicked materials, considered light, and rooms that feel like you.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="rounded-none bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] hover:bg-[hsl(var(--gold-soft))] px-8 h-12 text-xs uppercase tracking-[0.28em]">
          <a href="#portfolio">Explore Designs</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-none bg-transparent border-cream/60 text-cream hover:bg-cream hover:text-[hsl(var(--wood-deep))] px-8 h-12 text-xs uppercase tracking-[0.28em]">
          <a href="#contact">Book Consultation</a>
        </Button>
      </div>
    </div>

    <div className="absolute bottom-8 left-0 right-0 z-10 container-luxe flex items-end justify-between text-cream/70 text-xs tracking-[0.28em] uppercase">
      <span>Bengaluru · Mumbai · Delhi</span>
      <span className="hidden md:inline">Scroll ↓</span>
    </div>
  </section>
);

export default Hero;
