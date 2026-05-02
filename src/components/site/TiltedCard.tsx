/**
 * TiltedCard — 3D perspective tilt on mouse move using Framer Motion springs.
 * Performance: Spring-based rotateX/rotateY — GPU composited transform3d only.
 * Auto-disabled on touch devices via media query check.
 */
import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

const spring = { damping: 30, stiffness: 120, mass: 1.5 };

const TiltedCard = ({
  children,
  className = "",
  rotateAmplitude = 10,
  scaleOnHover = 1.02,
}: TiltedCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);

  const isTouchOnly = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const onMove = (e: React.MouseEvent) => {
    if (isTouchOnly || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ox = e.clientX - rect.left - rect.width / 2;
    const oy = e.clientY - rect.top - rect.height / 2;
    rotateX.set((oy / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((ox / (rect.width / 2)) * rotateAmplitude);
  };

  const onEnter = () => { if (!isTouchOnly) scale.set(scaleOnHover); };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 800, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

export default TiltedCard;
