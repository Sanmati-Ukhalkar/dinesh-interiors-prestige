import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kitchen from "@/assets/portfolio-kitchen.jpg";
import bedroom from "@/assets/portfolio-bedroom.jpg";
import living from "@/assets/portfolio-living.jpg";
import storage from "@/assets/portfolio-storage.jpg";
import hero from "@/assets/hero.jpg";
import fusion from "@/assets/style-fusion.jpg";
import traditional from "@/assets/style-traditional.jpg";
import modern from "@/assets/style-modern.jpg";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";

export type Category = "Kitchen" | "Bedroom" | "Living" | "Storage";

type Item = {
  title: string;
  category: Category;
  place: string;
  img: string;
  ratio: string;
};

export const portfolioItems: Item[] = [
  { title: "Marble & Brass Kitchen", category: "Kitchen", place: "Bengaluru Residence", img: kitchen, ratio: "aspect-[4/5]" },
  { title: "Carved Heritage Bedroom", category: "Bedroom", place: "Jaipur Villa", img: bedroom, ratio: "aspect-[3/4]" },
  { title: "Arched Living Room", category: "Living", place: "Mumbai Apartment", img: living, ratio: "aspect-[4/3]" },
  { title: "Walk-in Wardrobe", category: "Storage", place: "Whitefield Home", img: storage, ratio: "aspect-[3/4]" },
  { title: "Dawn Sitting Hall", category: "Living", place: "Hyderabad Home", img: hero, ratio: "aspect-[3/4]" },
  { title: "Fusion Lounge", category: "Living", place: "Pune Penthouse", img: fusion, ratio: "aspect-[4/5]" },
  { title: "Heritage Drawing Room", category: "Living", place: "Udaipur Haveli", img: traditional, ratio: "aspect-[3/4]" },
  { title: "Minimal Master Bedroom", category: "Bedroom", place: "Bandra Apartment", img: modern, ratio: "aspect-[4/5]" },
];

const filters: ("All" | Category)[] = ["All", "Kitchen", "Bedroom", "Living", "Storage"];

interface Props {
  preview?: boolean;
  initialFilter?: "All" | Category;
}

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M1 1l12 12M13 1L1 13" />
  </svg>
);

const PortfolioGrid = ({ preview = false, initialFilter = "All" }: Props) => {
  const [filter, setFilter] = useState<"All" | Category>(initialFilter);
  const [open, setOpen] = useState<Item | null>(null);
  const navigate = useNavigate();

  useEffect(() => setFilter(initialFilter), [initialFilter]);

  const visible = preview
    ? portfolioItems.slice(0, 3)
    : filter === "All"
    ? portfolioItems
    : portfolioItems.filter((i) => i.category === filter);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <section id="portfolio" className="relative py-24 md:py-36 bg-background overflow-hidden">
      <JaliBackground opacity={0.04} />

      <div className="relative container-luxe">
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">{preview ? "Selected Work" : "Full Portfolio"}</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              {preview
                ? "A glimpse of our recent homes."
                : "A gallery of considered homes."}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm leading-[1.8]">
            Each project is shaped by the family who lives in it — bespoke from the first sketch to the last brass handle.
          </p>
        </Reveal>

        {/* Filters */}
        {!preview && (
          <Reveal className="flex flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-5 h-10 text-xs uppercase tracking-[0.24em] rounded-sm border transition-all duration-300 ${
                  filter === f
                    ? "bg-[hsl(var(--wood-deep))] text-cream border-[hsl(var(--wood-deep))] shadow-[0_4px_14px_0_hsl(var(--wood-deep)/0.39)]"
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
        )}

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 lg:gap-7 [column-fill:_balance]">
          {visible.map((it, i) => (
            <Reveal
              key={it.title + filter}
              delay={(i % 3) * 100}
              className="mb-5 lg:mb-7 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpen(it)}
                className="group relative w-full block overflow-hidden text-left"
                aria-label={`View ${it.title}`}
              >
                <div className={`relative ${it.ratio} overflow-hidden bg-secondary`}>
                  <img
                    src={it.img}
                    alt={`${it.title} — ${it.place}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
                    style={{ transitionDuration: "1200ms" }}
                  />
                  {/* Gradient — always present, deepens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/80 via-[hsl(var(--wood-deep))]/20 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
                  {/* Gold ring on hover */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-[hsl(var(--gold))]/0 group-hover:ring-[hsl(var(--gold))]/35 transition-all duration-500" />
                </div>

                {/* Caption — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-cream translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--gold-soft))]">
                    {it.category} · {it.place}
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl mt-1.5 leading-tight">{it.title}</h3>
                  <p className="mt-2.5 text-[10px] uppercase tracking-[0.24em] text-cream/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Project →
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* View all CTA */}
        {preview && (
          <Reveal className="mt-16 text-center">
            <button
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-all duration-300 hover:gap-4 group"
            >
              View Full Portfolio
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </Reveal>
        )}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-[hsl(var(--wood-deep))]/94 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-5 right-5 md:top-8 md:right-8 h-11 w-11 flex items-center justify-center text-cream border border-cream/20 rounded-sm hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition-all duration-300 z-10"
          >
            <CloseIcon />
          </button>

          <div
            className="relative max-w-5xl w-full grid lg:grid-cols-[3fr_2fr] gap-0 bg-background animate-scale-in shadow-[0_40px_120px_-20px_hsl(var(--wood-deep))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={open.img}
                alt={open.title}
                className="w-full h-full max-h-[75vh] object-cover"
              />
            </div>

            {/* Info panel */}
            <div className="p-8 lg:p-10 flex flex-col justify-between bg-background">
              <div>
                <p className="eyebrow mb-4">{open.category}</p>
                <h3 className="font-serif text-3xl lg:text-4xl leading-tight">{open.title}</h3>
                <div className="gold-line my-6 max-w-[70px]" />
                <p className="text-sm text-muted-foreground tracking-wide">{open.place}</p>
                <p className="mt-5 text-muted-foreground leading-[1.85] text-sm">
                  A bespoke project crafted with hand-selected materials, custom joinery, and
                  lighting designed to honour the architecture of the space.
                </p>
              </div>
              <button
                onClick={() => { setOpen(null); navigate("/contact"); }}
                className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-all duration-300 hover:gap-4 w-fit group hover:-translate-y-0.5"
              >
                Enquire about this project
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGrid;
