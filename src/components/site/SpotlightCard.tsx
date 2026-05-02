/**
 * SpotlightCard — radial gradient spotlight follows cursor inside card.
 * Performance: CSS custom properties set via style.setProperty — no React
 * state, no re-renders, runs at pointer rate not RAF rate.
 */
import { useRef, ReactNode, CSSProperties } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(201,169,110,0.12)",  // gold tint
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    ref.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card-spotlight-rb ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
