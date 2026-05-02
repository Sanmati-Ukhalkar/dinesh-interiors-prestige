/**
 * SplitText — ReactBits-inspired char/word split animation
 * Built with Framer Motion (no GSAP Club plugin required).
 *
 * Usage:
 *   <SplitText tag="h2" className="font-serif text-5xl">
 *     Heading text here
 *   </SplitText>
 *
 * Props:
 *   tag          — HTML tag to render (default "p")
 *   splitBy      — "chars" | "words" | "lines" (default "words")
 *   delay        — stagger delay per unit in seconds (default 0.04)
 *   duration     — animation duration (default 0.8)
 *   from         — motion initial state
 *   className    — class forwarded to the wrapper
 *   once         — only play once on enter (default true)
 *   threshold    — IntersectionObserver threshold (default 0.15)
 */

import { useRef, useState, useEffect, ElementType, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SplitTextProps {
  children: ReactNode;
  tag?: ElementType;
  splitBy?: "chars" | "words";
  delay?: number;
  duration?: number;
  ease?: string;
  from?: { opacity?: number; y?: number; x?: number; rotateX?: number };
  className?: string;
  once?: boolean;
  threshold?: number;
}

// Container variants — just controls children stagger timing
const containerVariants = (
  stagger: number,
  delayStart = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delayStart,
    },
  },
});

// Each split unit animates from `from` → resting state
const unitVariants = (
  from: SplitTextProps["from"],
  duration: number
): Variants => ({
  hidden: {
    opacity: from?.opacity ?? 0,
    y: from?.y ?? 24,
    x: from?.x ?? 0,
    rotateX: from?.rotateX ?? 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotateX: 0,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1], // power3.out equivalent
    },
  },
});

const SplitText = ({
  children,
  tag: Tag = "p",
  splitBy = "words",
  delay = 0.04,
  duration = 0.75,
  from = { opacity: 0, y: 28 },
  className = "",
  once = true,
  threshold = 0.15,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Stringify children to split into units
  const text = typeof children === "string" ? children : "";

  const units =
    splitBy === "chars"
      ? text.split("").map((c, i) => (c === " " ? "\u00A0" : c))
      : text.split(" ").filter(Boolean);

  const childVariants = unitVariants(from, duration);

  return (
    // @ts-ignore — polymorphic tag
    <Tag className={className} ref={ref} style={{ overflow: "visible" }}>
      <motion.span
        aria-label={text}
        style={{ display: "block" }}
        variants={containerVariants(delay)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {units.map((unit, i) => (
          <motion.span
            key={i}
            variants={childVariants}
            aria-hidden="true"
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
              // Add space between words when splitting by words
              ...(splitBy === "words" && i < units.length - 1
                ? { marginRight: "0.28em" }
                : {}),
            }}
          >
            {unit}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default SplitText;
