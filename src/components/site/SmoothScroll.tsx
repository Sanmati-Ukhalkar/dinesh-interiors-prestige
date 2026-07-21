import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
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
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
