import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";
import FadeContent from "./FadeContent";
import JaliBackground from "./JaliBackground";
import GlareHover from "./GlareHover";
import SplitText from "./SplitText";
import FlyingPosters from "./FlyingPosters";
import ChromaGrid from "./ChromaGrid";
import { type Category, type PortfolioItem, portfolioItems } from "./portfolioData";
import hero from "@/assets/hero.jpg";

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
  const [open, setOpen] = useState<PortfolioItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => setFilter(initialFilter), [initialFilter]);

  const visible = preview
    ? portfolioItems.slice(0, 3)
    : filter === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === filter);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="portfolio" className="relative py-24 md:py-36 bg-background overflow-hidden">
      <JaliBackground opacity={0.04} />

      <div className="relative container-luxe">
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">{preview ? "Selected Work" : "Full Portfolio"}</p>
            <SplitText
              tag="h2"
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
              delay={0.055}
              duration={0.8}
            >
              {preview ? "A glimpse of our recent homes." : "A gallery of considered homes."}
            </SplitText>
          </div>
          <p className="text-muted-foreground max-w-sm leading-[1.8]">
            Each project is shaped by the family who lives in it — bespoke from the first sketch to the last brass handle.
          </p>
        </Reveal>

        {/* Filters */}
        {!preview && (
          <Reveal className="flex flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button type="button"
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-5 h-10 text-xs uppercase tracking-[0.24em] rounded-sm border transition-colors transition-opacity transition-transform duration-300 ${filter === f
                    ? "bg-[hsl(var(--wood-deep))] text-cream border-[hsl(var(--wood-deep))] shadow-[0_4px_14px_0_hsl(var(--wood-deep)/0.39)]"
                    : "border-border hover:border-[hsl(var(--gold))] hover:text-foreground"
                  }`}
              >
                {filter === f && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[hsl(var(--gold))] animate-fade-in"
                    aria-hidden="true"
                  />
                )}
                {f}
              </button>
            ))}
          </Reveal>
        )}

        {preview && (
          <div className="relative w-full h-[60vh] mb-12 hidden md:block">
            <FlyingPosters items={portfolioItems.map(i => i.img)} className="w-full h-full" />
          </div>
        )}

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 lg:gap-7 [column-fill:_balance]">
          {visible.map((it, i) => (
            <FadeContent
              key={it.title + filter}
              delay={(i % 3) * 0.1}
              duration={0.85}
              blur={true}
              className="mb-5 lg:mb-7 break-inside-avoid"
            >
              <GlareHover glareOpacity={0.15} className="block">
                <button
                  type="button"
                  onClick={() => setOpen(it)}
                  className="group relative w-full block overflow-hidden text-left"
                  aria-label={`View ${it.title}`}
                >
                  <div className={`relative ${it.ratio} overflow-hidden bg-secondary`}>
                    <div className="absolute inset-0 z-0">
                      <img
                        src={it.img}
                        alt={it.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    {/* Gradient */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[hsl(var(--wood-deep))]/80 via-[hsl(var(--wood-deep))]/20 to-transparent transition-opacity duration-500 group-hover:opacity-95 pointer-events-none" />
                    {/* Gold ring */}
                    <div className="absolute inset-0 z-10 ring-1 ring-inset ring-[hsl(var(--gold))]/0 group-hover:ring-[hsl(var(--gold))]/35 transition-colors transition-opacity transition-transform duration-500 pointer-events-none" />
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-cream translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--gold-soft))]">
                      {it.category} · {it.place}
                    </p>
                    <h3 className="font-serif text-xl lg:text-2xl mt-1.5 leading-tight">{it.title}</h3>
                    <p className="mt-2.5 text-[10px] uppercase tracking-[0.24em] text-cream/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      View Project →
                    </p>
                  </div>
                </button>
              </GlareHover>
            </FadeContent>
          ))}
        </div>

        {/* View all CTA */}
        {preview && (
          <Reveal className="mt-16 text-center">
            <button type="button"
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-colors transition-opacity transition-transform duration-300 hover:gap-4 group"
            >
              View Full Portfolio
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </Reveal>
        )}
        {/* ChromaGrid Alternative View */}
        {!preview && (
          <Reveal className="mt-24 mb-24 relative w-full h-auto border border-border p-4 md:p-8">
            <ChromaGrid
              items={[
                ...visible.map(item => ({
                  image: item.img,
                  title: item.title,
                  subtitle: item.category,
                  handle: item.place,
                  borderColor: 'hsl(var(--gold-soft))',
                  gradient: 'linear-gradient(145deg, hsl(var(--wood-deep)), hsl(var(--wood)))'
                })),
                {
                  image: hero,
                  title: "Signature Residence",
                  subtitle: "Showcase",
                  handle: "Bespoke Design",
                  borderColor: 'hsl(var(--gold-soft))',
                  gradient: 'linear-gradient(145deg, hsl(var(--wood-deep)), hsl(var(--wood)))'
                }
              ]}
            />
          </Reveal>
        )}

      </div>

      {/* Lightbox */}
      {open && (
        <dialog
          ref={(el) => { if (el && !el.open) el.showModal(); }}
          onClose={() => setOpen(null)}
          className="fixed inset-0 z-[60] m-0 max-w-none max-h-none h-full w-full flex items-center justify-center p-4 md:p-8 bg-[hsl(var(--wood-deep))]/94 backdrop-blur-sm animate-fade-in bg-transparent"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
          aria-label={open.title}
        >
          {/* Close */}
          <button type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute top-5 right-5 md:top-8 md:right-8 size-11 flex items-center justify-center text-cream border border-cream/20 rounded-sm hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition-colors transition-opacity transition-transform duration-300 z-10"
          >
            <CloseIcon />
          </button>

          <div
            className="relative max-w-5xl w-full grid lg:grid-cols-[3fr_2fr] gap-0 bg-background animate-scale-in shadow-[0_40px_120px_-20px_hsl(var(--wood-deep))] max-h-[90vh] overflow-y-auto lg:overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={open.img}
                alt={open.title}
                className="w-full h-[40vh] lg:h-auto lg:max-h-[75vh] object-cover"
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
              <button type="button"
                onClick={() => { setOpen(null); navigate("/contact"); }}
                className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[hsl(var(--wood-deep))] border-b border-[hsl(var(--gold))] pb-1 hover:text-[hsl(var(--gold))] transition-colors transition-opacity transition-transform duration-300 hover:gap-4 w-fit group hover:-translate-y-0.5"
              >
                Enquire about this project
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default PortfolioGrid;
