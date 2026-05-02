/**
 * GlareHover — diagonal light sweep on hover.
 * Performance: Pure CSS pseudo-element transition on opacity/transform.
 * Zero JS — all done with CSS custom properties set once on mount.
 */
import "./GlareHover.css";
import { ReactNode, CSSProperties } from "react";

interface GlareHoverProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  transitionDuration?: number;
  style?: CSSProperties;
}

const GlareHover = ({
  children,
  className = "",
  glareColor = "#c9a96e",
  glareOpacity = 0.18,
  glareAngle = -45,
  transitionDuration = 600,
  style,
}: GlareHoverProps) => {
  // Convert hex/named to rgba
  let rgba = glareColor;
  const hex = glareColor.replace("#", "");
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r},${g},${b},${glareOpacity})`;
  }

  return (
    <div
      className={`glare-hover-rb ${className}`}
      style={{
        "--gh-angle": `${glareAngle}deg`,
        "--gh-duration": `${transitionDuration}ms`,
        "--gh-rgba": rgba,
        ...style,
      } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default GlareHover;
