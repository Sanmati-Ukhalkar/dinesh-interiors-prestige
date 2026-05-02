import { useState } from "react";
import { useNavigate } from "react-router-dom";
import traditional from "@/assets/style-traditional.jpg";
import modern from "@/assets/style-modern.jpg";
import fusion from "@/assets/style-fusion.jpg";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";
import InfiniteMenu from "./InfiniteMenu";

const items = [
  { key: "traditional", title: "Traditional", desc: "Carved teak, jharokhas, brass and rich textiles rooted in Indian heritage.", note: "For homes that celebrate craft, story, and the depth of ornament.", img: traditional, filter: "Living" },
  { key: "modern", title: "Modern", desc: "Clean lines, light oak, soft linen — calm spaces filled with natural light.", note: "For homes that breathe — restraint, light and quiet materials.", img: modern, filter: "Bedroom" },
  { key: "fusion", title: "Fusion", desc: "A measured dialogue between heritage craft and contemporary form.", note: "Our signature — Indian soul wrapped in modern silhouettes.", img: fusion, filter: "Kitchen" },
] as const;

const Styles = () => {
  const [active, setActive] = useState<string>("fusion");
  const current = items.find((i) => i.key === active)!;
  const navigate = useNavigate();

  const goToPortfolio = () => navigate(`/portfolio?style=${current.filter}`);

  return (
    <section id="styles" className="relative py-24 md:py-36 bg-secondary/40 overflow-hidden">
      <JaliBackground opacity={0.05} />

      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">Select Your Style</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Three philosophies. <em className="not-italic text-[hsl(var(--gold-soft))]">One sense of warmth.</em>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg leading-[1.85]">
            Choose a direction below — each one is a starting point we tailor to your home.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap gap-2 md:gap-3 mb-12">
          {items.map((it) => {
            const isActive = it.key === active;
            return (
              <button
                key={it.key}
                onClick={() => setActive(it.key)}
                className={`relative px-6 h-11 text-xs uppercase tracking-[0.28em] rounded-sm border transition-all duration-300 ${
                  isActive
                    ? "bg-[hsl(var(--wood-deep))] text-cream border-[hsl(var(--wood-deep))] shadow-[0_4px_14px_0_hsl(var(--wood-deep)/0.39)]"
                    : "bg-transparent text-foreground border-border hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--wood-deep))]"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--gold))] animate-fade-in"
                    aria-hidden="true"
                  />
                )}
                {it.title}
              </button>
            );
          })}
        </Reveal>

        <Reveal className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3 relative h-[600px] border border-border overflow-hidden">
            <InfiniteMenu 
              items={items.map(i => ({
                image: i.img,
                link: `/portfolio?style=${i.filter}`,
                title: i.title,
                description: i.desc
              }))}
            />
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-4">Style · {current.title}</p>
            <h3 key={current.title} className="font-serif text-4xl md:text-5xl animate-fade-up">{current.title}</h3>
            <div className="gold-line my-7 max-w-[100px]" />
            <p key={current.desc} className="text-lg text-foreground leading-[1.85] animate-fade-up">{current.desc}</p>
            <p key={current.note} className="mt-4 text-muted-foreground leading-[1.85] animate-fade-up">{current.note}</p>

            <button
              onClick={goToPortfolio}
              className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-all duration-300 group hover:gap-4 w-fit"
            >
              See {current.title} Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Styles;
