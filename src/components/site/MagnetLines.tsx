/**
 * MagnetLines — grid of lines that rotate toward cursor.
 * Performance: style.setProperty on each span directly — no React state.
 * Single global pointermove listener. CSS transform only.
 */
import { useRef, useEffect, CSSProperties } from "react";
import "./MagnetLines.css";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines = ({
  rows = 8,
  columns = 8,
  containerSize = "400px",
  lineColor = "hsl(43,65%,62%)",
  lineWidth = "2px",
  lineHeight = "22px",
  baseAngle = -10,
  className = "",
  style,
}: MagnetLinesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const spans = Array.from(container.querySelectorAll<HTMLSpanElement>("span"));

    const onMove = (e: PointerEvent) => {
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const b = e.clientX - cx;
        const a = e.clientY - cy;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = (Math.acos(b / c) * 180 / Math.PI) * (e.clientY > cy ? 1 : -1);
        span.style.setProperty("--rotate", `${r}deg`);
      });
    };

    // Init center
    if (spans.length) {
      const mid = spans[Math.floor(spans.length / 2)];
      const rect = mid.getBoundingClientRect();
      onMove({ clientX: rect.left, clientY: rect.top } as PointerEvent);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rows, columns]);

  const total = rows * columns;

  return (
    <div
      ref={ref}
      className={`magnet-lines-rb ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            "--rotate": `${baseAngle}deg`,
            backgroundColor: lineColor,
            width: lineWidth,
            height: lineHeight,
          } as CSSProperties}
        />
      ))}
    </div>
  );
};

export default MagnetLines;
