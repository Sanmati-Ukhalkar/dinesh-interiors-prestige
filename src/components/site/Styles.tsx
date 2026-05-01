import { useState } from "react";
import traditional from "@/assets/style-traditional.jpg";
import modern from "@/assets/style-modern.jpg";
import fusion from "@/assets/style-fusion.jpg";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";

const items = [
  {
    key: "traditional",
    title: "Traditional",
    desc: "Carved teak, jharokhas, brass and rich textiles rooted in Indian heritage.",
    note: "For homes that celebrate craft, story, and the depth of ornament.",
    img: traditional,
  },
  {
    key: "modern",
    title: "Modern",
    desc: "Clean lines, light oak, soft linen — calm spaces filled with natural light.",
    note: "For homes that breathe — restraint, light and quiet materials.",
    img: modern,
  },
  {
    key: "fusion",
    title: "Fusion",
    desc: "A measured dialogue between heritage craft and contemporary form.",
    note: "Our signature — Indian soul wrapped in modern silhouettes.",
    img: fusion,
  },
];

const Styles = () => {
  const [active, setActive] = useState("fusion");
  const current = items.find((i) => i.key === active)!;

  return (
    <section id="styles" className="relative py-24 md:py-36 bg-secondary/40 overflow-hidden">
      <JaliBackground opacity={0.05} />

      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">Select Your Style</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Three philosophies. One sense of warmth.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg">
            Choose a direction below — each one is a starting point we tailor to your home.
          </p>
        </Reveal>

        {/* Style selector */}
        <Reveal className="flex flex-wrap gap-2 md:gap-3 mb-12">
          {items.map((it) => {
            const isActive = it.key === active;
            return (
              <button
                key={it.key}
                onClick={() => setActive(it.key)}
                className={`px-6 h-11 text-xs uppercase tracking-[0.28em] border transition-all duration-300 ${
                  isActive
                    ? "bg-[hsl(var(--wood-deep))] text-cream border-[hsl(var(--wood-deep))]"
                    : "bg-transparent text-foreground border-border hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--wood-deep))]"
                }`}
              >
                {it.title}
              </button>
            );
          })}
        </Reveal>

        {/* Featured style preview with arch frame */}
        <Reveal className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-3 relative">
            <div
              className="relative overflow-hidden bg-secondary"
              style={{ borderRadius: "50% 50% 8px 8px / 28% 28% 8px 8px" }}
            >
              <img
                key={current.key}
                src={current.img}
                alt={`${current.title} interior style`}
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-[520px] md:h-[600px] object-cover animate-scale-in"
              />
            </div>
            {/* Gold arch frame */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="pointer-events-none absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)]"
              preserveAspectRatio="none"
            >
              <path
                d="M10 590 L10 300 Q10 10 300 10 Q590 10 590 300 L590 590"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-4">Style · {current.title}</p>
            <h3 key={current.title} className="font-serif text-4xl md:text-5xl animate-fade-up">
              {current.title}
            </h3>
            <div className="gold-line my-7 max-w-[100px]" />
            <p key={current.desc} className="text-lg text-foreground leading-relaxed animate-fade-up">
              {current.desc}
            </p>
            <p key={current.note} className="mt-4 text-muted-foreground leading-relaxed animate-fade-up">
              {current.note}
            </p>

            <a
              href="#contact"
              className="mt-10 inline-block text-xs uppercase tracking-[0.28em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-colors"
            >
              Begin in {current.title}
            </a>
          </div>
        </Reveal>

        {/* All three at a glance */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 120}>
              <article className="group cursor-pointer" onClick={() => setActive(it.key)}>
                <div className="overflow-hidden">
                  <img
                    src={it.img}
                    alt={`${it.title} interior style`}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-[360px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="pt-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-accent tracking-[0.28em]">0{i + 1}</span>
                    <h4 className="font-serif text-2xl">{it.title}</h4>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Styles;
