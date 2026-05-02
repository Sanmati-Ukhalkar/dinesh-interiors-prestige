interface Props {
  /** color of the arch fill (the section ABOVE shape) */
  fill?: string;
  /** background behind (the section BELOW) — used only conceptually */
  flip?: boolean;
  className?: string;
}

/** Indian arch-inspired curved separator. Place between two sections. */
const ArchDivider = ({ fill = "hsl(var(--background))", flip = false, className = "" }: Props) => (
  <div className={`relative w-full overflow-hidden leading-[0] ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block w-full h-[80px] md:h-[120px] ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0,120 L0,100 C 300,100 450,0 720,0 C 990,0 1140,100 1440,100 L1440,120 Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default ArchDivider;
