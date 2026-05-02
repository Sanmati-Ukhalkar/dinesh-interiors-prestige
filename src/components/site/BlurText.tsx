/**
 * BlurText — words enter with blur-to-sharp + y-offset stagger.
 * Performance: GPU-only (filter + transform). Zero layout thrash.
 */
import { useRef } from "react";
import { motion, useInView, Variants } from "motion/react";

interface BlurTextProps {
  children: string;
  className?: string;
  delay?: number;       // stagger per word (seconds)
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.07,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const BlurText = ({
  children,
  className = "",
  delay = 0.07,
  duration = 0.7,
  threshold = 0.2,
  once = true,
}: BlurTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  const words = children.split(" ").filter(Boolean);

  return (
    <span ref={ref} className={className} style={{ display: "block" }} aria-label={children}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          aria-hidden="true"
          style={{
            display: "inline-block",
            willChange: "transform, opacity, filter",
            marginRight: i < words.length - 1 ? "0.28em" : 0,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
