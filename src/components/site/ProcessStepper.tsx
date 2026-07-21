/**
 * ProcessStepper — luxury editorial "Our Process" layout.
 * Staggered two-column design with oversized serif step numbers as watermarks,
 * gold vertical connector line with diamond markers, and scroll-triggered reveal.
 */
import { useRef } from "react";
import { m as motion, useInView } from "framer-motion";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepperProps {
  steps: ProcessStep[];
  className?: string;
}

// Small ornamental SVG diamond for the connector
const Diamond = ({ filled = false }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <rect
      x="2" y="2" width="10" height="10"
      transform="rotate(45 7 7)"
      fill={filled ? "hsl(var(--gold))" : "none"}
      stroke="hsl(var(--gold))"
      strokeWidth="1.2"
    />
  </svg>
);

const ProcessStepper = ({ steps, className = "" }: ProcessStepperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* ── Vertical gold connector (desktop only) ── */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--gold)/0.5) 8%, hsl(var(--gold)/0.5) 92%, transparent 100%)",
        }}
      />

      <div className="relative space-y-0">
        {steps.map((step, i) => {
          const isRight = i % 2 === 1; // alternate left / right
          return (
            <motion.div
              key={step.title}
              className="relative grid lg:grid-cols-2 gap-0"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* ── Diamond marker on the spine ── */}
              <div
                aria-hidden="true"
                className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: i * 0.15 + 0.25, duration: 0.5, ease: "backOut" }}
                >
                  <Diamond filled={i === 0} />
                </motion.div>
              </div>

              {/* ── Left column: content when isLeft (even), spacer when isRight (odd) ── */}
              <div className="hidden lg:block">
                {!isRight && (
                  <StepCard step={step} index={i} inView={inView} align="right" />
                )}
              </div>

              {/* ── Right column: content when isRight, spacer when isLeft ── */}
              <div className="hidden lg:block">
                {isRight && (
                  <StepCard step={step} index={i} inView={inView} align="left" />
                )}
              </div>

              {/* ── Mobile: single column, full width ── */}
              <div className="lg:hidden col-span-2">
                <StepCard step={step} index={i} inView={inView} align="left" mobile />
              </div>
            </motion.div>
          );
        })}

        {/* Final closing diamond */}
        <div
          aria-hidden="true"
          className="hidden lg:flex absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10"
        >
          <Diamond />
        </div>
      </div>
    </div>
  );
};

// ── Individual step card ───────────────────────────────────────────────────────
function StepCard({
  step,
  index,
  inView,
  align,
  mobile = false,
}: {
  step: ProcessStep;
  index: number;
  inView: boolean;
  align: "left" | "right";
  mobile?: boolean;
}) {
  const fromX = mobile ? 0 : align === "right" ? -40 : 40;

  return (
    <motion.div
      className={`group relative py-14 ${
        mobile
          ? "pl-8 border-l border-[hsl(var(--gold)/0.4)]"
          : align === "right"
          ? "pr-20 text-right"
          : "pl-20 text-left"
      }`}
      initial={{ opacity: 0, x: fromX }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ghosted large serif number — decorative watermark */}
      <span
        aria-hidden="true"
        className={`absolute pointer-events-none select-none font-serif font-light leading-none text-[9rem] md:text-[11rem] text-[hsl(var(--gold)/0.07)] transition-colors duration-700 group-hover:text-[hsl(var(--gold)/0.13)] ${
          mobile
            ? "-left-4 -top-6"
            : align === "right"
            ? "-right-4 -top-6"
            : "-left-4 -top-6"
        }`}
      >
        {step.number}
      </span>

      {/* Step number badge */}
      <div
        className={`flex items-center gap-3 mb-5 ${
          align === "right" && !mobile ? "justify-end" : "justify-start"
        }`}
      >
        {/* Left-align: dash → number */}
        {(align === "left" || mobile) && (
          <>
            <span
              className="h-px w-8 flex-shrink-0 transition-colors transition-opacity transition-transform duration-500 group-hover:w-14"
              style={{ background: "hsl(var(--gold)/0.6)" }}
            />
            <span className="font-serif text-xs tracking-[0.3em] text-[hsl(var(--gold))] uppercase">
              Step {step.number}
            </span>
          </>
        )}
        {/* Right-align: number → dash */}
        {align === "right" && !mobile && (
          <>
            <span className="font-serif text-xs tracking-[0.3em] text-[hsl(var(--gold))] uppercase">
              Step {step.number}
            </span>
            <span
              className="h-px w-8 flex-shrink-0 transition-colors transition-opacity transition-transform duration-500 group-hover:w-14"
              style={{ background: "hsl(var(--gold)/0.6)" }}
            />
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="font-serif text-3xl lg:text-[2.2rem] leading-tight text-foreground mb-4 transition-colors duration-300 group-hover:text-[hsl(var(--gold))]">
        {step.title}
      </h3>

      {/* Gold rule */}
      <div
        className={`h-px mb-5 transition-colors transition-opacity transition-transform duration-500 group-hover:opacity-100 opacity-50 ${
          align === "right" && !mobile ? "ml-auto" : ""
        }`}
        style={{
          width: "2.5rem",
          background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-soft)))",
        }}
      />

      {/* Description */}
      <p className="text-muted-foreground leading-[1.9] text-[0.95rem] max-w-[38ch]">
        {step.description}
      </p>
    </motion.div>
  );
}

export default ProcessStepper;
