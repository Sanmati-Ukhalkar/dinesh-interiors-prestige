import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      lerp: 0.07,
    });

    // ── Sync Lenis scroll position to GSAP ScrollTrigger ──────────────────
    // This is critical: without this, ScrollTrigger uses native scroll
    // while Lenis intercepts it, causing desync / frame jumps.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (ensures both run in same rAF)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP gives seconds, Lenis wants ms
    });

    // Prevent GSAP ticker from lagging behind when tab is backgrounded
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
