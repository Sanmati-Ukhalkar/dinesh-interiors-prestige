import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import Magnet from "./Magnet";
import RotatingText from "./RotatingText";
import StarBorder from "./StarBorder";
import Particles from "./Particles";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// ─── Frame URL factory ────────────────────────────────────────────────────────
const TOTAL_FRAMES = 123;
const FRAME_PREFIX = "Concrete_interior_transforms_Ind__202605020743_";

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/${FRAME_PREFIX}${padded}.webp`;
}

// ─── Scroll indicator component ───────────────────────────────────────────────
function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      className="scroll-indicator"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <div className="scroll-indicator__track">
        <div className="scroll-indicator__dot" />
      </div>
      <span className="scroll-indicator__label">Scroll</span>
    </div>
  );
}

// ─── Loading overlay ──────────────────────────────────────────────────────────
function LoadingOverlay({ progress }: { progress: number }) {
  return (
    <div className="hero-loading-overlay">
      <div className="hero-loading-inner">
        <div className="hero-loading-logo">
          <span className="hero-loading-name">Interiors by Dinesh</span>
          <span className="hero-loading-sub">Est. 2009 · Pune</span>
        </div>
        <div className="hero-loading-bar-wrap">
          <div
            className="hero-loading-bar-fill"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <span className="hero-loading-pct">{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}

// ─── Main HeroCanvas component ────────────────────────────────────────────────
const HeroCanvas = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  const [isLowPerf] = useState(() => {
    if (typeof navigator === "undefined") return false;
    return "deviceMemory" in navigator && (navigator as any).deviceMemory < 2;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldDisableSequence = isMobile || isLowPerf;

  const { canvasRef, loadStatus, loadProgress, setCurrentFrame } =
    useScrollFrameSequence({
      totalFrames: TOTAL_FRAMES,
      getFrameUrl,
      priorityFrames: 10,
      enabled: !shouldDisableSequence,
    });

  // ── Fade in hero content when frames are ready ────────────────────────────
  useEffect(() => {
    if (loadStatus === "ready") {
      const timer = setTimeout(() => setContentVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [loadStatus]);

  // ── GSAP ScrollTrigger scroll → frame mapping ─────────────────────────────
  useEffect(() => {
    if (loadStatus !== "ready" || shouldDisableSequence) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!section || !sticky || !overlay || !content) return;

    // Frame scrub animation
    const frameProxy = { frame: 0 };

    const frameScrub = gsap.to(frameProxy, {
      frame: TOTAL_FRAMES - 1,
      ease: "none",
      onUpdate() {
        setCurrentFrame(frameProxy.frame);
      },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,         // reduced from 1 to 0.2 so it feels instantly responsive without heavy rubber-banding
        pin: sticky,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          // ponytail: direct DOM mutation — no setState on scroll
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = self.progress < 0.05 ? "1" : "0";
          }
        },
      },
    });

    // Overlay opacity — subtly brightens as sequence progresses
    const overlayScrub = gsap.to(overlay, {
      opacity: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "40% bottom",
        scrub: true,
      },
    });

    // Content fade-up on entry
    gsap.fromTo(
      content.querySelectorAll(".hero-content-item"),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      }
    );

    // Content fade out as user scrolls past 80%
    const contentFade = gsap.to(content, {
      opacity: 0,
      y: -30,
      ease: "power2.in",
      scrollTrigger: {
        trigger: section,
        start: "75% bottom",
        end: "90% bottom",
        scrub: true,
      },
    });

    return () => {
      frameScrub.scrollTrigger?.kill();
      frameScrub.kill();
      overlayScrub.scrollTrigger?.kill();
      overlayScrub.kill();
      contentFade.scrollTrigger?.kill();
      contentFade.kill();
      ScrollTrigger.refresh();
    };
  }, [loadStatus, shouldDisableSequence, setCurrentFrame]);

  // ── Fallback: static hero image for low-perf / mobile ────────────────────
  if (shouldDisableSequence) {
    return <StaticHeroFallback />;
  }

  return (
    <>
      {/* ── Loading overlay (shown until priority frames ready) */}
      {loadStatus !== "ready" && (
        <LoadingOverlay progress={loadProgress} />
      )}

      {/*
       * ── Scroll container ──────────────────────────────────────────────────
       * 400vh gives the scroll room for 123 frames to feel cinematic.
       * The sticky child stays pinned by GSAP ScrollTrigger (pin: sticky).
       */}
      <section
        ref={sectionRef}
        className="hero-sequence-section"
        aria-label="Scroll to explore our transformation"
        style={{ height: "400vh" }}
      >
        {/* Sticky viewport-filling layer */}
        <div
          ref={stickyRef}
          className="hero-sequence-sticky"
        >
          {/* Canvas — full-viewport frame renderer */}
          <canvas
            ref={canvasRef}
            className="hero-sequence-canvas"
          />

          {/* Gradient overlay — enriches dark-to-light effect */}
          <div
            ref={overlayRef}
            className="hero-sequence-overlay"
            style={{ opacity: 0.55 }}
          />

          {/* Golden particles overlay - disabled on mobile to prevent extreme compositing lag */}
          {typeof window !== 'undefined' && window.innerWidth >= 768 && (
            <div className="absolute inset-0 pointer-events-none z-[5] opacity-60">
              <Particles
                particleColors={["#ffffff", "#d4af37", "#f3ead3"]}
                particleCount={100}
                particleSpread={12}
                speed={0.06}
                particleBaseSize={70}
                alphaParticles={true}
                disableRotation={false}
                className="size-full"
              />
            </div>
          )}

          {/* Decorative gold arch — right */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 700"
            className="hero-arch-svg pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2 h-[85%] w-auto hidden lg:block"
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
              strokeWidth="0.75"
            />
          </svg>

          {/* Decorative left vertical rule */}
          <div
            className="absolute top-0 bottom-0 w-px opacity-10 hidden lg:block"
            style={{
              left: "calc((100vw - 80rem) / 2 + 4rem)",
              background: "linear-gradient(to bottom, transparent, hsl(var(--gold-soft)), transparent)",
            }}
            aria-hidden="true"
          />

          {/* Hero content — text & CTAs */}
          <div
            ref={contentRef}
            className="hero-sequence-content"
            style={{ visibility: contentVisible ? "visible" : "hidden" }}
          >
            <div className="container-luxe flex flex-col justify-center h-full pt-20 pb-16 md:pt-32 md:pb-28">
              {/* Eyebrow */}
              <p
                className="hero-content-item mb-4 md:mb-7"
                style={{ letterSpacing: "0.05em" }}
              >
                <ShinyText text="Est. 2009 · Pune" className="eyebrow text-xs md:text-sm" speed={4} />
              </p>

              {/* Headline */}
              <h1
                className="hero-content-item font-serif text-[clamp(2.1rem,9vw,5.5rem)] leading-[1.05] text-cream max-w-[17ch]"
                style={{ fontWeight: 300 }}
              >
                <BlurText className="text-cream" threshold={0.1}>
                  Where Tradition Meets Modern Living
                </BlurText>
              </h1>

              {/* Gold rule */}
              <div
                className="hero-content-item mt-5 md:mt-9 h-px w-12 md:w-16"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--gold-soft)), transparent)",
                }}
              />

              {/* Subtext */}
              <p className="hero-content-item mt-5 md:mt-8 max-w-[46ch] text-[0.9rem] md:text-[1.05rem] text-cream/75 leading-[1.6] md:leading-[1.8]">
                A premium interior design studio crafting homes that honour Indian
                heritage through a quiet, modern lens — handpicked materials,
                considered light, and rooms that feel like you.
              </p>

              {/* Rotating room types */}
              <p className="hero-content-item mt-4 md:mt-6 flex items-center gap-2 md:gap-3 text-[hsl(var(--gold-soft))] text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.28em]">
                <span className="text-cream/50">Crafting</span>
                <RotatingText
                  texts={["Kitchens", "Bedrooms", "Living Rooms", "Wardrobes", "Dining Spaces"]}
                  interval={2000}
                  className="text-[hsl(var(--gold-soft))] font-medium"
                  mainClassName="min-w-[110px] md:min-w-[130px]"
                />
              </p>

              {/* CTAs */}
              <div className="hero-content-item mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4">
                <Magnet magnetStrength={3} padding={60}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] hover:bg-[hsl(var(--gold-soft))] px-7 md:px-9 h-[48px] md:h-[54px] text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium transition-colors transition-opacity transition-transform duration-500 hover:shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.6)]"
                  >
                    <Link to="/portfolio">Explore Portfolio</Link>
                  </Button>
                </Magnet>
                <Magnet magnetStrength={3} padding={60}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full bg-[hsl(var(--wood-deep))]/20 backdrop-blur-sm border-cream/30 text-cream hover:bg-cream hover:text-[hsl(var(--wood-deep))] px-7 md:px-9 h-[48px] md:h-[54px] text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium transition-colors transition-opacity transition-transform duration-500 hover:border-cream"
                  >
                    <Link to="/contact">Book Consultation</Link>
                  </Button>
                </Magnet>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="hero-sequence-bottom container-luxe flex items-end justify-between text-cream/50 text-[10px] tracking-[0.32em] uppercase">
            <span>Pune</span>
            <div
              ref={scrollIndicatorRef}
              className="scroll-indicator"
              style={{ opacity: 1, transition: "opacity 0.6s ease" }}
            >
              <div className="scroll-indicator__track">
                <div className="scroll-indicator__dot" />
              </div>
              <span className="scroll-indicator__label">Scroll</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── Static fallback for mobile / low-perf devices ────────────────────────────
function StaticHeroFallback() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden grain">
      <div className="absolute inset-0">
        <img
          src={getFrameUrl(123)}
          alt="Luxury finished interior by Dinesh"
          className="absolute inset-0 h-[115%] w-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--wood-deep))]/80 via-[hsl(var(--wood-deep))]/40 to-[hsl(var(--wood-deep))]/95" />
      <div className="relative z-10 container-luxe flex min-h-dvh flex-col justify-center pt-28 pb-24 md:pt-32 md:pb-28">
        <p
          className="mb-4 md:mb-7"
          style={{ letterSpacing: "0.05em" }}
        >
          <ShinyText text="Est. 2009 · Pune" className="eyebrow text-xs md:text-sm" speed={4} />
        </p>
        <h1
          className="font-serif text-[clamp(2.2rem,8.5vw,5.5rem)] leading-[1.05] text-cream max-w-[17ch]"
          style={{ fontWeight: 300 }}
        >
          <BlurText className="text-cream" threshold={0.1}>
            Where Tradition Meets Modern Living
          </BlurText>
        </h1>
        <div className="mt-5 md:mt-9 h-px w-12 md:w-16" style={{ background: "linear-gradient(90deg, hsl(var(--gold-soft)), transparent)" }} />
        <p className="mt-5 md:mt-8 max-w-[46ch] text-[0.9rem] md:text-[1.05rem] text-cream/75 leading-[1.6] md:leading-[1.8]">
          A premium interior design studio crafting homes that honour Indian
          heritage through a quiet, modern lens — handpicked materials,
          considered light, and rooms that feel like you.
        </p>

        {/* Rotating room types */}
        <p className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3 text-[hsl(var(--gold-soft))] text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.28em]">
          <span className="text-cream/50">Crafting</span>
          <RotatingText
            texts={["Kitchens", "Bedrooms", "Living Rooms", "Wardrobes", "Dining Spaces"]}
            interval={2000}
            className="text-[hsl(var(--gold-soft))] font-medium"
            mainClassName="min-w-[110px] md:min-w-[130px]"
          />
        </p>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            asChild size="lg"
            className="w-full sm:w-auto rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] hover:bg-[hsl(var(--gold-soft))] px-7 md:px-9 h-[48px] md:h-[54px] text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium"
          >
            <Link to="/portfolio">Explore Portfolio</Link>
          </Button>
          <Button
            asChild size="lg" variant="outline"
            className="w-full sm:w-auto rounded-full bg-[hsl(var(--wood-deep))]/20 backdrop-blur-sm border-cream/30 text-cream hover:bg-cream hover:text-[hsl(var(--wood-deep))] px-7 md:px-9 h-[48px] md:h-[54px] text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium"
          >
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroCanvas;
