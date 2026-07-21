/**
 * ScrollVelocity — infinite marquee, velocity-reactive.
 *
 * Loop: accumulate baseX freely; display position = baseX mod copyWidth,
 * offset so the strip starts one copyWidth to the left.
 * Copies: auto-computed so (numCopies - 1) * copyWidth always exceeds the
 * viewport width → no gap, no pop, even for very short text strings.
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
  className?: string;
}

function VelocityRow({ text, baseVelocity, className = "" }: VelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  // Auto copies: need (n-1) copies to cover viewport at any scroll offset.
  // We use a generous fixed count (12) — cheap DOM, guaranteed no gap.
  const NUM = 12;

  const dirFactor = useRef(baseVelocity > 0 ? 1 : -1);

  // Wrap into [-copyWidth, 0) so the strip always starts one copy-width behind.
  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    const mod = ((v % copyWidth) + copyWidth) % copyWidth;
    return `${mod - copyWidth}px`;
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
        {Array.from({ length: NUM }).map((_, i) => (
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
  /** @deprecated numCopies is now auto-computed — prop accepted but ignored */
  numCopies?: number;
}

const ScrollVelocity = ({
  texts,
  velocity = 60,
  className = "",
}: ScrollVelocityProps) => (
  <div style={{ userSelect: "none" }}>
    {texts.map((text, i) => (
      <VelocityRow
        key={i}
        text={text}
        baseVelocity={i % 2 === 0 ? velocity : -velocity}
        className={className}
      />
    ))}
  </div>
);

export default ScrollVelocity;
