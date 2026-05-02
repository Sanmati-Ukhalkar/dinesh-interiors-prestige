/**
 * Magnet — magnetic pull towards cursor on hover proximity.
 * Performance: transform3d only (GPU layer), single global mousemove listener,
 * disabled on mobile/touch devices automatically.
 */
import { useState, useEffect, useRef, ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
  disabled?: boolean;
  className?: string;
}

const Magnet = ({
  children,
  padding = 80,
  magnetStrength = 2.5,
  disabled = false,
  className = "",
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Disable on touch-only devices — no mousemove events
    if (disabled || window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = Math.abs(cx - e.clientX);
      const dy = Math.abs(cy - e.clientY);

      if (dx < width / 2 + padding && dy < height / 2 + padding) {
        setActive(true);
        setPos({
          x: (e.clientX - cx) / magnetStrength,
          y: (e.clientY - cy) / magnetStrength,
        });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, magnetStrength, disabled]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block", position: "relative" }}>
      <div
        style={{
          transform: `translate3d(${pos.x}px,${pos.y}px,0)`,
          transition: active
            ? "transform 0.3s cubic-bezier(0.22,1,0.36,1)"
            : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
