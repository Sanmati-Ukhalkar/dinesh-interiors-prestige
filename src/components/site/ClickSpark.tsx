/**
 * ClickSpark — canvas-based spark explosion on click.
 * Performance: Canvas RAF loop only runs while sparks are alive (< 400ms).
 * Zero cost at idle — RAF is only active post-click.
 */
import { useRef, useEffect, useCallback, ReactNode } from "react";

interface ClickSparkProps {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ClickSpark = ({
  children,
  sparkColor = "hsl(43,90%,75%)",
  sparkSize = 8,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 450,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number | null>(null);
  const isAnimating = useRef(false);

  // Size canvas to parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const ro = new ResizeObserver(() => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    });
    ro.observe(parent);
    const { width, height } = parent.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    return () => ro.disconnect();
  }, []);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;
      const t = elapsed / duration;
      const eased = t * (2 - t); // ease-out
      const dist = eased * sparkRadius;
      const len = sparkSize * (1 - eased);
      const x1 = spark.x + dist * Math.cos(spark.angle);
      const y1 = spark.y + dist * Math.sin(spark.angle);
      const x2 = spark.x + (dist + len) * Math.cos(spark.angle);
      const y2 = spark.y + (dist + len) * Math.sin(spark.angle);
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 1 - eased;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      return true;
    });

    if (sparksRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      isAnimating.current = false;
      rafRef.current = null;
    }
  }, [sparkColor, sparkSize, sparkRadius, duration]);

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, i) => ({
        x, y, angle: (2 * Math.PI * i) / sparkCount, startTime: now,
      }))
    );
    if (!isAnimating.current) {
      isAnimating.current = true;
      rafRef.current = requestAnimationFrame(draw);
    }
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
