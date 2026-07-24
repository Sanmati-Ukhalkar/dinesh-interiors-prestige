import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageHero from "@/components/site/PageHero";
import PortfolioGrid from "@/components/site/PortfolioGrid";
import { type Category, portfolioItems } from "@/components/site/portfolioData";
import Contact from "@/components/site/Contact";
import TextPressure from "@/components/site/TextPressure";
import DomeGallery from "@/components/site/DomeGallery";
import Masonry from "react-masonry-css";

const validCategories: Category[] = ["Kitchen", "Bedroom", "Living", "Storage"];

const masonryBreakpoints = {
  default: 3,
  1024: 2,
  640: 1
};

// cream background hex — matches hsl(38 33% 96%)
const CREAM_HEX = "#f7f3ec";

// ── Drag + click hint that auto-dismisses ─────────────────────────────────────
function DomeHint() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5 pointer-events-none select-none"
    >
      {/* Drag hint */}
      <div className="flex items-center gap-2 bg-[hsl(22_35%_16%/0.72)] backdrop-blur-md border border-[hsl(38_40%_72%/0.25)] rounded-full px-4 py-2.5">
        {/* Hand-drag icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(38,40%,72%)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 11V8a2 2 0 0 0-4 0v3" />
          <path d="M14 10V6a2 2 0 0 0-4 0v4" />
          <path d="M10 10V5a2 2 0 0 0-4 0v9" />
          <path d="M6 14s0 6 6 6c3.5 0 6-2.5 6-6v-3H6Z" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.26em] text-[hsl(38,40%,85%)] whitespace-nowrap font-light">
          Drag to rotate
        </span>
      </div>

      {/* Divider dot */}
      <span className="w-1 h-1 rounded-full bg-[hsl(38,40%,72%/0.4)]" />

      {/* Click hint */}
      <div className="flex items-center gap-2 bg-[hsl(22_35%_16%/0.72)] backdrop-blur-md border border-[hsl(38_40%_72%/0.25)] rounded-full px-4 py-2.5">
        {/* Tap/click icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(38,40%,72%)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.26em] text-[hsl(38,40%,85%)] whitespace-nowrap font-light">
          Click to open
        </span>
      </div>
    </div>
  );
}

const PortfolioPage = () => {
  const [params] = useSearchParams();
  const styleParam = params.get("style");
  const initial = (validCategories.includes(styleParam as Category) ? styleParam : "All") as "All" | Category;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Archive"
        title={
          <>
            <div className="hidden md:block h-[140px] md:h-[180px] w-full mt-4">
              <TextPressure
                text="PORTFOLIO"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={false}
                textColor="hsl(var(--cream))"
                className="font-serif tracking-widest"
                minFontSize={60}
              />
            </div>
            <span className="md:hidden">PORTFOLIO</span>
          </>
        }
        intro="Browse selected projects across kitchens, bedrooms, living spaces and storage. Click any image for a closer look."
      />

      {/* Dome gallery — full viewport, edges dissolve into cream */}
      <div
        className="relative w-full bg-background"
        style={{ height: "75dvh" }}
      >
        <DomeGallery
          images={portfolioItems.map(item => ({ src: item.img, alt: item.title }))}
          grayscale={false}
          overlayBlurColor={CREAM_HEX}
          fit={isMobile ? 0.95 : 0.62}
          fitBasis="width"
          minRadius={isMobile ? 220 : 400}
          segments={isMobile ? 20 : 35}
        />
        <DomeHint />
        {/* Bottom blend */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, transparent, ${CREAM_HEX})`,
          }}
        />
      </div>

      <PortfolioGrid initialFilter={initial} />

      {/* Simple Masonry Highlights */}
      <div className="w-full bg-background border-t border-[hsl(38_40%_72%/0.2)] py-24">
        <div className="container-luxe">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-[hsl(var(--wood-deep))] tracking-tight mb-4">
              Selected Highlights
            </h2>
            <p className="text-[hsl(var(--wood-deep))]/60 uppercase tracking-[0.2em] text-xs">
              A brief look at our favorite moments
            </p>
          </div>
          <Masonry
            breakpointCols={masonryBreakpoints}
            className="flex -ml-4 md:-ml-6 w-auto"
            columnClassName="pl-4 md:pl-6 bg-clip-padding space-y-4 md:space-y-6"
          >
            {portfolioItems.slice(0, 9).map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-md group">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            ))}
          </Masonry>
        </div>
      </div>

      <Contact />
    </>
  );
};

export default PortfolioPage;
