/**
 * ScrollVelocity — infinite marquee that speeds up/slows with scroll velocity.
 * Performance: Framer Motion useAnimationFrame + transform3d only.
 * Text is rendered once, looped via translateX modulo — no DOM duplication.
 */
import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

interface VelocityRowProps {
  text: string;
  baseVelocity: number;
  numCopies?: number;
  className?: string;
}

function VelocityRow({ text, baseVelocity, numCopies = 5, className = "" }: VelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const dirFactor = useRef(baseVelocity > 0 ? 1 : -1);

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    const range = copyWidth;
    const mod = ((v % range) + range) % range;
    return `${mod - range}px`;
  });

  useAnimationFrame((_, delta) => {
    let moveBy = dirFactor.current * Math.abs(baseVelocity) * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) dirFactor.current = -1;
    else if (vf > 0) dirFactor.current = baseVelocity > 0 ? 1 : -1;
    moveBy += dirFactor.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div style={{ overflow: "hidden", display: "flex", whiteSpace: "nowrap" }}>
      <motion.div style={{ x, display: "flex", gap: 0 }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span ref={i === 0 ? copyRef : null} key={i} className={className}>
            {text}&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  numCopies?: number;
}

const ScrollVelocity = ({
  texts,
  velocity = 60,
  className = "",
  numCopies = 5,
}: ScrollVelocityProps) => (
  <div style={{ userSelect: "none" }}>
    {texts.map((text, i) => (
      <VelocityRow
        key={i}
        text={text}
        baseVelocity={i % 2 === 0 ? velocity : -velocity}
        className={className}
        numCopies={numCopies}
      />
    ))}
  </div>
);

export default ScrollVelocity;
