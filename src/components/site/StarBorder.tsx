/**
 * StarBorder — pure CSS rotating radial-gradient border sweep.
 * Performance: CSS @keyframes on background-position only.
 * Zero JS, GPU composited via border trick.
 */
import { ReactNode, ElementType, CSSProperties } from "react";
import "./StarBorder.css";

interface StarBorderProps {
  children: ReactNode;
  as?: ElementType;
  color?: string;
  speed?: string;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const StarBorder = ({
  children,
  as: Tag = "div",
  color = "hsl(43,90%,75%)",  // gold-soft
  speed = "5s",
  thickness = 1,
  className = "",
  style,
  onClick,
}: StarBorderProps) => (
  // @ts-ignore polymorphic
  <Tag
    className={`star-border-rb ${className}`}
    style={{ padding: `${thickness}px 0`, ...style } as CSSProperties}
    onClick={onClick}
  >
    <div
      className="star-border-bottom"
      style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
    />
    <div
      className="star-border-top"
      style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
    />
    <div className="star-border-inner">{children}</div>
  </Tag>
);

export default StarBorder;
