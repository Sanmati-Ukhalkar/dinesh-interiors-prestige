/**
 * BorderGlow — cursor-proximity edge glow on cards.
 * Performance: CSS custom properties via style.setProperty on pointermove.
 * No RAF, no React state — runs at pointer event rate only.
 */
import { useRef, useCallback, ReactNode, CSSProperties } from "react";
import "./BorderGlow.css";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;      // hsl values e.g. "43 80 75"
  borderRadius?: number;
  backgroundColor?: string;
  style?: CSSProperties;
}

const BorderGlow = ({
  children,
  className = "",
  glowColor = "43 80 75",         // gold hue
  borderRadius = 0,
  backgroundColor = "transparent",
  style,
}: BorderGlowProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = cx !== 0 ? cx / Math.abs(dx || 0.001) : Infinity;
    const ky = cy !== 0 ? cy / Math.abs(dy || 0.001) : Infinity;
    const edge = Math.max(1 / Math.min(kx, ky), 0);

    const rad = Math.atan2(dy, dx);
    let deg = rad * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;

    card.style.setProperty("--edge-proximity", String((edge * 100).toFixed(2)));
    card.style.setProperty("--cursor-angle", `${deg.toFixed(2)}deg`);
  }, []);

  // Parse glowColor to generate CSS vars
  const parts = glowColor.split(" ").map(Number);
  const [h = 43, s = 80, l = 75] = parts;
  const base = `${h}deg ${s}% ${l}%`;

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`border-glow-rb ${className}`}
      style={{
        "--card-bg": backgroundColor,
        "--border-radius": `${borderRadius}px`,
        "--glow-color": `hsl(${base} / 100%)`,
        "--glow-color-60": `hsl(${base} / 60%)`,
        "--glow-color-30": `hsl(${base} / 30%)`,
        "--glow-color-10": `hsl(${base} / 10%)`,
        ...style,
      } as CSSProperties}
    >
      <span className="border-glow-rb__edge" />
      <div className="border-glow-rb__inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
