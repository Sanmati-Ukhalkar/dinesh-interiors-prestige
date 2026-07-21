/**
 * ScrollVelocity — infinite marquee that speeds up/slows with scroll velocity.
 * Performance: Framer Motion useAnimationFrame + transform3d only.
 *
 * Loop logic: translate the strip left continuously; when it has moved by
 * exactly one copy width, snap back by that amount. This is the canonical
 * seamless-loop pattern — no gap, no pop.
 */
import { useRef, useLayoutEffect, useState } from "react";
import {
  m as motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

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

function VelocityRow({
  text,
  baseVelocity,
  numCopies = 6,
  className = "",
}: VelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Measure one copy so we know exactly how far to snap back
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const dirFactor = useRef(baseVelocity > 0 ? 1 : -1);

  // Canonical seamless loop: keep x in [-copyWidth, 0)
  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    // wrap into [-copyWidth, 0)
    const wrapped = ((v % copyWidth) - copyWidth) % copyWidth;
    return `${wrapped}px`;
  });

  useAnimationFrame((_, delta) => {
    if (copyWidth === 0) return;
    let moveBy = dirFactor.current * Math.abs(baseVelocity) * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) dirFactor.current = -1;
    else if (vf > 0) dirFactor.current = baseVelocity > 0 ? 1 : -1;
    moveBy += dirFactor.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div style={{ overflow: "hidden", display: "flex", whiteSpace: "nowrap" }}>
      <motion.div style={{ x, display: "flex" }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <span
            ref={i === 0 ? copyRef : null}
            key={i}
            className={className}
            aria-hidden={i > 0 ? true : undefined}
          >
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
  numCopies = 6,
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
