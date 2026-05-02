/**
 * ScrollFloat — text floats up and fades in on scroll with stagger.
 * Uses Framer Motion's useInView and AnimatePresence.
 */
import { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "motion/react";

interface ScrollFloatProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
  yOffset?: number;
  splitBy?: "chars" | "words" | "lines";
}

const ScrollFloat = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  threshold = 0.2,
  yOffset = 30,
  splitBy = "words",
}: ScrollFloatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const text = typeof children === "string" ? children : "";
  
  const elements = useMemo(() => {
    if (!text) return [];
    if (splitBy === "chars") return text.split("");
    if (splitBy === "words") return text.split(/(\s+)/); // keep spaces
    if (splitBy === "lines") return text.split("\n");
    return [text];
  }, [text, splitBy]);

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * stagger,
        duration: duration,
        ease: [0.22, 1, 0.36, 1], // Custom ease-out curve
      },
    }),
  };

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {text ? (
        elements.map((el, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            style={{ 
              display: "inline-block", 
              whiteSpace: el.trim() === "" ? "pre" : "normal",
              willChange: "transform, opacity" 
            }}
          >
            {el}
          </motion.span>
        ))
      ) : (
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          variants={variants}
          style={{ willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default ScrollFloat;
