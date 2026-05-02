import about from "@/assets/about.jpg";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";
import SplitText from "./SplitText";
import CountUp from "./CountUp";
import ScrollFloat from "./ScrollFloat";
import PixelTransition from "./PixelTransition";
import VariableProximity from "./VariableProximity";
import fusion from "@/assets/style-fusion.jpg";
import { useRef } from "react";

// Parsed stats for CountUp: { num, suffix, label }
const stats = [
  { num: 15, suffix: "+", label: "Years of Craft" },
  { num: 120, suffix: "+", label: "Homes Designed" },
  { num: 40, suffix: "+", label: "Artisan Partners" },
];

const About = () => {
  const containerRef = useRef(null);

  return (
  <section id="about" className="relative py-24 md:py-36 bg-background overflow-hidden">
    <JaliBackground opacity={0.05} />
    <div className="relative container-luxe grid lg:grid-cols-2 gap-16 lg:gap-24 items-center" ref={containerRef}>

      {/* Image column */}
      <Reveal className="relative">
        <div
          className="relative overflow-hidden bg-secondary"
          style={{
            borderRadius: "50% 50% 8px 8px / 28% 28% 8px 8px",
            boxShadow: "var(--shadow-image)",
          }}
        >
          <PixelTransition
            firstContent={
              <img
                src={about}
                alt="Portrait of Dinesh, founder of the studio"
                loading="lazy"
                className="w-full h-[600px] lg:h-[680px] object-cover"
              />
            }
            secondContent={
              <img
                src={fusion}
                alt="Studio interior"
                loading="lazy"
                className="w-full h-[600px] lg:h-[680px] object-cover"
              />
            }
            gridSize={12}
            pixelColor="hsl(var(--gold))"
            animationStepDuration={0.4}
            className="w-full h-[600px] lg:h-[680px]"
            aspectRatio="auto"
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
        <div className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-foreground mb-6">
          <VariableProximity
            label="A quiet philosophy of living, beautifully made."
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 900, 'ital' 1"
            falloff="linear"
            radius={200}
          />
        </div>

        <div className="gold-line my-9 max-w-[100px]" />

        <ScrollFloat delay={0.2} stagger={0.03} splitBy="words" className="text-muted-foreground leading-[1.85] text-lg block">
          Founded by Dinesh, the studio approaches every home as a portrait of its people. We blend the warmth of Indian craft — carved teak, hand-loomed textiles, brass — with the discipline of modern design.
        </ScrollFloat>
        <ScrollFloat delay={0.4} stagger={0.03} splitBy="words" className="text-muted-foreground leading-[1.85] text-lg mt-5 block">
          From premium materials to the smallest joinery, every detail is considered, sourced, and made to last a lifetime.
        </ScrollFloat>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {stats.map((s, i) => (
            <div key={s.label} className="group">
              <p
                className="font-serif text-4xl md:text-5xl text-[hsl(var(--wood))] transition-colors group-hover:text-[hsl(var(--gold))] duration-300"
              >
                <CountUp to={s.num} suffix={s.suffix} duration={2.2} delay={i * 0.15} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export default About;
