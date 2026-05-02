/**
 * CountUp — spring-animated number counter.
 * Performance: Framer Motion spring on a single span, ~0 layout cost.
 * Triggers only when element enters viewport (once).
 */
import { useRef, useEffect, useCallback } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  className?: string;
}

const CountUp = ({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  separator = "",
  className = "",
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const spring = useSpring(motionValue, { damping, stiffness });
  const inView = useInView(ref, { once: true, margin: "0px" });

  const format = useCallback(
    (v: number) => {
      const rounded = Math.round(v);
      const str = separator
        ? rounded.toLocaleString("en-IN").replace(/,/g, separator)
        : String(rounded);
      return `${prefix}${str}${suffix}`;
    },
    [prefix, suffix, separator]
  );

  // Sync spring → DOM (no state, avoids re-renders)
  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
  }, [spring, format]);

  // Trigger when in view
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => motionValue.set(to), delay * 1000);
    return () => clearTimeout(id);
  }, [inView, motionValue, to, delay]);

  // Set initial text
  useEffect(() => {
    if (ref.current) ref.current.textContent = format(from);
  }, [from, format]);

  return <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`} />;
};

export default CountUp;
