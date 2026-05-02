interface Props {
  className?: string;
  opacity?: number;
  type?: "jali" | "mandala";
}

/** Subtle Indian jali / mandala pattern as a decorative SVG background. */
const JaliBackground = ({ className = "", opacity = 0.05, type = "jali" }: Props) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{ opacity }}
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Geometric Jali Motif */}
        <pattern id="jali" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" className="text-[hsl(var(--gold))]" strokeWidth="0.8">
            <path d="M40 0 L80 40 L40 80 L0 40 Z" />
            <circle cx="40" cy="40" r="16" />
            <circle cx="40" cy="40" r="8" />
            <circle cx="0" cy="0" r="6" />
            <circle cx="80" cy="0" r="6" />
            <circle cx="0" cy="80" r="6" />
            <circle cx="80" cy="80" r="6" />
          </g>
        </pattern>

        {/* Lotus / Mandala Motif */}
        <pattern id="mandala" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" className="text-[hsl(var(--gold))]" strokeWidth="0.6">
            <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="60" />
            <circle cx="100" cy="100" r="24" />
            <g transform="translate(100 100)">
              {/* 12 petal mandala */}
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(30)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(60)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(90)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(120)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(150)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(180)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(210)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(240)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(270)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(300)" />
              <path d="M0 -24 Q16 -42 0 -60 Q-16 -42 0 -24" transform="rotate(330)" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${type})`} />
    </svg>
  </div>
);

export default JaliBackground;
