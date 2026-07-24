import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      lerp: 0.1,   // ponytail: was 0.07 — Lenis alone handles easing; don't double-smooth with GSAP scrub
    });
    lenisRef.current = lenis;

    // ── Sync Lenis scroll position to GSAP ScrollTrigger ──────────────────
    // This is critical: without this, ScrollTrigger uses native scroll
    // while Lenis intercepts it, causing desync / frame jumps.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (ensures both run in same rAF)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP gives seconds, Lenis wants ms
    };
    gsap.ticker.add(tickerCallback);

    // Prevent GSAP ticker from lagging behind when tab is backgrounded
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change using Lenis
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
