/**
 * ShinyText — CSS-only metallic sheen sweep across text.
 * Performance: Pure CSS animation on background-position.
 * Zero JS on frame — requestAnimationFrame free.
 */
import "./ShinyText.css";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;    // seconds per cycle
  color?: string;
  shineColor?: string;
}

const ShinyText = ({
  text,
  className = "",
  speed = 3,
  color = "hsl(43 65% 72%)",       // gold-soft default
  shineColor = "hsl(43 90% 88%)",  // bright gold
}: ShinyTextProps) => (
  <span
    className={`shiny-text-rb ${className}`}
    style={
      {
        "--shiny-color": color,
        "--shiny-shine": shineColor,
        "--shiny-speed": `${speed}s`,
      } as React.CSSProperties
    }
  >
    {text}
  </span>
);

export default ShinyText;
