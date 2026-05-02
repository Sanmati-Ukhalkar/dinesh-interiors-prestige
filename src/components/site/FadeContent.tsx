/**
 * FadeContent — generalized blur-to-focus fade in animation.
 * Replaces our simple Reveal with a more premium blur effect.
 */
import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface FadeContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: boolean;
}

const FadeContent = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  blur = true,
}: FadeContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30, filter: blur ? "blur(8px)" : "none" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: blur ? "blur(0px)" : "none" }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;
