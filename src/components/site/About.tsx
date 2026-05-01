import about from "@/assets/about.jpg";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";

const stats = [
  { k: "15+", v: "Years of Craft" },
  { k: "120+", v: "Homes Designed" },
  { k: "40+", v: "Artisan Partners" },
];

const About = () => (
  <section id="about" className="relative py-24 md:py-36 bg-background overflow-hidden">
    <JaliBackground opacity={0.05} />
    <div className="relative container-luxe grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

      {/* Image column */}
      <Reveal className="relative">
        <div
          className="relative overflow-hidden bg-secondary"
          style={{
            borderRadius: "50% 50% 8px 8px / 28% 28% 8px 8px",
            boxShadow: "var(--shadow-image)",
          }}
        >
          <img
            src={about}
            alt="Portrait of Dinesh, founder of the studio"
            width={1280}
            height={1600}
            loading="lazy"
            className="w-full h-[600px] lg:h-[680px] object-cover transition-transform duration-[2000ms] hover:scale-105"
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/20 to-transparent pointer-events-none" />
        </div>

        {/* Gold arch SVG frame */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 700"
          className="pointer-events-none absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)]"
          preserveAspectRatio="none"
        >
          <path
            d="M10 690 L10 300 Q10 10 300 10 Q590 10 590 300 L590 690"
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>

        {/* Est. badge */}
        <div className="absolute -bottom-5 -right-5 md:-bottom-6 md:-right-6 hidden md:flex flex-col items-center justify-center bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] w-[100px] h-[100px] md:w-[110px] md:h-[110px]">
          <p className="font-serif text-sm uppercase tracking-[0.2em] opacity-70">Est.</p>
          <p className="font-serif text-3xl leading-none">2009</p>
        </div>
      </Reveal>

      {/* Text column */}
      <Reveal delay={120}>
        <p className="eyebrow mb-6">The Studio</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-foreground">
          A quiet philosophy of&nbsp;living,{" "}
          <em className="not-italic text-[hsl(var(--wood))]">beautifully made.</em>
        </h2>

        <div className="gold-line my-9 max-w-[100px]" />

        <p className="text-muted-foreground leading-[1.85] text-lg">
          Founded by{" "}
          <span className="text-foreground font-medium">Dinesh</span>, the studio
          approaches every home as a portrait of its people. We blend the warmth
          of Indian craft — carved teak, hand-loomed textiles, brass — with the
          discipline of modern design.
        </p>
        <p className="text-muted-foreground leading-[1.85] text-lg mt-5">
          From premium materials to the smallest joinery, every detail is
          considered, sourced, and made to last a lifetime.
        </p>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {stats.map((s, i) => (
            <div key={s.v} className="group">
              <p
                className="font-serif text-4xl md:text-5xl text-[hsl(var(--wood))] transition-colors group-hover:text-[hsl(var(--gold))] duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {s.k}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground leading-tight">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default About;
