import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useScrollFrameSequence } from "@/hooks/useScrollFrameSequence";

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
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isLowPerf, setIsLowPerf] = useState(false);

  // Detect low-performance / small-screen fallback
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 480px)");
    const check = () => {
      const lowMem =
        "deviceMemory" in navigator && (navigator as Navigator & { deviceMemory: number }).deviceMemory < 2;
      setIsLowPerf(mq.matches || lowMem);
    };
    check();
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, []);

  const { canvasRef, loadStatus, loadProgress, setCurrentFrame } =
    useScrollFrameSequence({
      totalFrames: TOTAL_FRAMES,
      getFrameUrl,
      priorityFrames: 10,
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
    if (loadStatus !== "ready" || isLowPerf) return;

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
        scrub: 0.5,        // slight smoothing without lag
        pin: sticky,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Hide scroll indicator after first 5% scroll
          setScrollIndicatorVisible(self.progress < 0.05);
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
  }, [loadStatus, isLowPerf, setCurrentFrame]);

  // ── Fallback: static hero image for low-perf / mobile ────────────────────
  if (isLowPerf) {
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
            aria-hidden="true"
          />

          {/* Gradient overlay — enriches dark-to-light effect */}
          <div
            ref={overlayRef}
            className="hero-sequence-overlay"
            style={{ opacity: 0.55 }}
          />

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
            <div className="container-luxe flex flex-col justify-center h-full pt-32 pb-28">
              {/* Eyebrow */}
              <p
                className="hero-content-item eyebrow text-[hsl(var(--gold-soft))] mb-7"
                style={{ letterSpacing: "0.38em" }}
              >
                Est. 2009 · Pune
              </p>

              {/* Headline */}
              <h1
                className="hero-content-item font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.03] text-cream max-w-[17ch]"
                style={{ fontWeight: 300 }}
              >
                Where Tradition{" "}
                <em className="not-italic text-[hsl(var(--gold-soft))]">Meets</em>{" "}
                Modern Living
              </h1>

              {/* Gold rule */}
              <div
                className="hero-content-item mt-9 h-px w-16"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--gold-soft)), transparent)",
                }}
              />

              {/* Subtext */}
              <p className="hero-content-item mt-8 max-w-[46ch] text-base md:text-[1.05rem] text-cream/75 leading-[1.8]">
                A premium interior design studio crafting homes that honour Indian
                heritage through a quiet, modern lens — handpicked materials,
                considered light, and rooms that feel like you.
              </p>

              {/* CTAs */}
              <div className="hero-content-item mt-12 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] hover:bg-[hsl(var(--gold-soft))] px-9 h-[54px] text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500 hover:shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.6)] hover:-translate-y-0.5"
                >
                  <Link to="/portfolio">Explore Portfolio</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-[hsl(var(--wood-deep))]/20 backdrop-blur-sm border-cream/30 text-cream hover:bg-cream hover:text-[hsl(var(--wood-deep))] px-9 h-[54px] text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500 hover:border-cream hover:-translate-y-0.5"
                >
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="hero-sequence-bottom container-luxe flex items-end justify-between text-cream/50 text-[10px] tracking-[0.32em] uppercase">
            <span>Pune</span>
            <ScrollIndicator visible={scrollIndicatorVisible} />
          </div>
        </div>
      </section>
    </>
  );
};

// ─── Static fallback for mobile / low-perf devices ────────────────────────────
function StaticHeroFallback() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden grain">
      <div className="absolute inset-0">
        <img
          src={getFrameUrl(1)}
          alt="Luxury concrete interior transforms to warm Indian living"
          className="absolute inset-0 h-[115%] w-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--wood-deep))]/75 via-[hsl(var(--wood-deep))]/30 to-[hsl(var(--wood-deep))]/90" />
      <div className="relative z-10 container-luxe flex min-h-screen flex-col justify-center pt-32 pb-28">
        <p
          className="eyebrow text-[hsl(var(--gold-soft))] mb-7"
          style={{ letterSpacing: "0.38em" }}
        >
          Est. 2009 · Pune
        </p>
        <h1
          className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.03] text-cream max-w-[17ch]"
          style={{ fontWeight: 300 }}
        >
          Where Tradition{" "}
          <em className="not-italic text-[hsl(var(--gold-soft))]">Meets</em>{" "}
          Modern Living
        </h1>
        <div className="mt-9 h-px w-16" style={{ background: "linear-gradient(90deg, hsl(var(--gold-soft)), transparent)" }} />
        <p className="mt-8 max-w-[46ch] text-base text-cream/75 leading-[1.8]">
          A premium interior design studio crafting homes that honour Indian
          heritage through a quiet, modern lens.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button
            asChild size="lg"
            className="rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] px-9 h-[54px] text-[11px] uppercase tracking-[0.3em] font-medium"
          >
            <Link to="/portfolio">Explore Portfolio</Link>
          </Button>
          <Button
            asChild size="lg" variant="outline"
            className="rounded-full border-cream/30 text-cream px-9 h-[54px] text-[11px] uppercase tracking-[0.3em] font-medium"
          >
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroCanvas;
