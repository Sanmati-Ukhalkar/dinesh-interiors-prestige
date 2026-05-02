/**
 * GradientText — animated gradient sweep across text.
 * Performance: Framer Motion useAnimationFrame → backgroundPosition only.
 * No layout, no paint — GPU composited via background-clip:text.
 */
import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "motion/react";
import "./GradientText.css";

interface GradientTextProps {
  children: string;
  className?: string;
  colors?: string[];
  speed?: number; // seconds per full cycle
}

const GradientText = ({
  children,
  className = "",
  colors = ["hsl(43,65%,62%)", "hsl(43,90%,85%)", "hsl(33,70%,55%)"],
  speed = 6,
}: GradientTextProps) => {
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const last = useRef<number | null>(null);
  const durationMs = speed * 1000;

  useAnimationFrame((t) => {
    if (last.current === null) { last.current = t; return; }
    elapsed.current += t - last.current;
    last.current = t;
    const fullCycle = durationMs * 2;
    const cycle = elapsed.current % fullCycle;
    progress.set(cycle < durationMs ? (cycle / durationMs) * 100 : 100 - ((cycle - durationMs) / durationMs) * 100);
  });

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`);
  const gradientColors = [...colors, colors[0]].join(", ");

  return (
    <motion.span
      className={`rb-gradient-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
        backgroundSize: "300% 100%",
        backgroundPosition,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline",
      }}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;
