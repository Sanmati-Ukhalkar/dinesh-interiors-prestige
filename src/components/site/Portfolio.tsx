import { useEffect, useState } from "react";
import kitchen from "@/assets/portfolio-kitchen.jpg";
import bedroom from "@/assets/portfolio-bedroom.jpg";
import living from "@/assets/portfolio-living.jpg";
import hero from "@/assets/hero.jpg";
import fusion from "@/assets/style-fusion.jpg";
import traditional from "@/assets/style-traditional.jpg";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";

type Item = {
  title: string;
  category: "Kitchen" | "Bedroom" | "Living Room";
  place: string;
  img: string;
  ratio: string; // tailwind aspect ratio class for masonry feel
};

const items: Item[] = [
  { title: "Marble & Brass Kitchen", category: "Kitchen", place: "Bengaluru Residence", img: kitchen, ratio: "aspect-[4/5]" },
  { title: "Carved Heritage Bedroom", category: "Bedroom", place: "Jaipur Villa", img: bedroom, ratio: "aspect-[3/4]" },
  { title: "Arched Living Room", category: "Living Room", place: "Mumbai Apartment", img: living, ratio: "aspect-[4/3]" },
  { title: "Dawn Sitting Hall", category: "Living Room", place: "Hyderabad Home", img: hero, ratio: "aspect-[3/4]" },
  { title: "Fusion Lounge", category: "Living Room", place: "Pune Penthouse", img: fusion, ratio: "aspect-[4/5]" },
  { title: "Heritage Drawing Room", category: "Living Room", place: "Udaipur Haveli", img: traditional, ratio: "aspect-[3/4]" },
];

const filters = ["All", "Kitchen", "Bedroom", "Living Room"] as const;

const Portfolio = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<Item | null>(null);

  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <section id="portfolio" className="relative py-24 md:py-36 bg-background overflow-hidden">
      <JaliBackground opacity={0.04} />

      <div className="relative container-luxe">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Selected Work</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              A gallery of considered homes.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A small selection across kitchens, bedrooms, and living spaces — each shaped by the family who lives in it.
          </p>
        </Reveal>

        <Reveal className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-5 h-10 text-xs uppercase tracking-[0.24em] border transition-all duration-300 ${
                filter === f
                  ? "bg-[hsl(var(--wood-deep))] text-cream border-[hsl(var(--wood-deep))]"
                  : "border-border hover:border-[hsl(var(--gold))] hover:text-foreground"
              }`}
            >
              {filter === f && (
                <span
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--gold))] animate-fade-in"
                  aria-hidden="true"
                />
              )}
              {f}
            </button>
          ))}
        </Reveal>

        {/* Masonry via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 [column-fill:_balance]">
          {visible.map((it, i) => (
            <Reveal key={it.title + filter} delay={(i % 3) * 120} className="mb-6 lg:mb-8 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(it)}
                className="group relative w-full block overflow-hidden text-left"
              >
                <div className={`relative ${it.ratio} overflow-hidden bg-secondary`}>
                  <img
                    src={it.img}
                    alt={`${it.title} — ${it.place}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[hsl(var(--gold))]/0 group-hover:ring-[hsl(var(--gold))]/40 transition-all duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 text-cream translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))]">
                    {it.category} · {it.place}
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl mt-2">{it.title}</h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-cream/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Project →
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 bg-[hsl(var(--wood-deep))]/92 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-5 right-5 md:top-8 md:right-8 h-11 w-11 flex items-center justify-center text-cream border border-cream/20 hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition-all duration-300 group"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
          <div
            className="relative max-w-5xl w-full grid lg:grid-cols-3 gap-0 bg-background animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:col-span-2">
              <img
                src={open.img}
                alt={open.title}
                className="w-full h-full max-h-[80vh] object-cover"
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <p className="eyebrow mb-4">{open.category}</p>
                <h3 className="font-serif text-3xl lg:text-4xl leading-tight">{open.title}</h3>
                <div className="gold-line my-6 max-w-[80px]" />
                <p className="text-muted-foreground leading-relaxed">{open.place}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A bespoke project crafted with hand-selected materials, custom joinery, and lighting designed to honour the architecture.
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(null)}
                className="mt-10 inline-block text-xs uppercase tracking-[0.28em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-colors w-fit"
              >
                Enquire about this project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
