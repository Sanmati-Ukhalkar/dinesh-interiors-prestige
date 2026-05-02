/**
 * RotatingText — cycles through words with spring slide-up animation.
 * Performance: Only setInterval + Framer Motion AnimatePresence.
 * GPU-only: transform + opacity. Zero layout.
 */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RotatingTextProps {
  texts: string[];
  interval?: number;   // ms between rotations
  className?: string;
  mainClassName?: string;
}

const RotatingText = ({
  texts,
  interval = 2200,
  className = "",
  mainClassName = "",
}: RotatingTextProps) => {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % texts.length);
  }, [texts.length]);

  useEffect(() => {
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [next, interval]);

  return (
    <span
      className={mainClassName}
      style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "bottom" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className={className}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
