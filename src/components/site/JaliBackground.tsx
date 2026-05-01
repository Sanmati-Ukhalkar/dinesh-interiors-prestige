interface Props {
  className?: string;
  opacity?: number;
}

/** Subtle Indian jali / mandala pattern as a decorative SVG background. */
const JaliBackground = ({ className = "", opacity = 0.06 }: Props) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{ opacity }}
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="jali" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="hsl(var(--gold))" strokeWidth="0.8">
            <circle cx="40" cy="40" r="18" />
            <circle cx="40" cy="40" r="10" />
            <path d="M40 4 L48 40 L40 76 L32 40 Z" />
            <path d="M4 40 L40 32 L76 40 L40 48 Z" />
            <circle cx="0" cy="0" r="4" />
            <circle cx="80" cy="0" r="4" />
            <circle cx="0" cy="80" r="4" />
            <circle cx="80" cy="80" r="4" />
          </g>
        </pattern>
        <pattern id="mandala" x="0" y="0" width="320" height="320" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="hsl(var(--gold))" strokeWidth="0.6">
            <circle cx="160" cy="160" r="120" />
            <circle cx="160" cy="160" r="80" />
            <circle cx="160" cy="160" r="40" />
            <g transform="translate(160 160)">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1="0" y1="0" x2="0" y2="-120" transform={`rotate(${i * 30})`} />
              ))}
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#jali)" />
      <rect width="100%" height="100%" fill="url(#mandala)" />
    </svg>
  </div>
);

export default JaliBackground;
