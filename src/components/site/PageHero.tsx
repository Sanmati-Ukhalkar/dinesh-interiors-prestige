import { ReactNode } from "react";
import JaliBackground from "./JaliBackground";
import ArchDivider from "./ArchDivider";

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  archFill?: string;
}

const PageHero = ({ eyebrow, title, intro, archFill = "hsl(var(--background))" }: Props) => (
  <section className="relative pt-44 pb-24 md:pt-52 md:pb-32 bg-[hsl(var(--wood-deep))] text-cream overflow-hidden grain">
    <JaliBackground opacity={0.06} />

    {/* Left vertical rule — matches hero grid */}
    <div
      className="absolute top-0 bottom-0 w-px opacity-10 hidden lg:block"
      style={{
        left: "calc((100vw - 80rem) / 2 + 4rem)",
        background: "linear-gradient(to bottom, transparent, hsl(var(--gold-soft)), transparent)",
      }}
      aria-hidden="true"
    />

    <div className="relative container-luxe">
      <p
        className="eyebrow text-[hsl(var(--gold-soft))] mb-7 animate-fade-in"
        style={{ letterSpacing: "0.38em" }}
      >
        {eyebrow}
      </p>
      <h1 className="font-serif text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.05] text-cream animate-fade-up max-w-[22ch]">
        {title}
      </h1>

      {/* Gold rule — left-anchored */}
      <div
        className="mt-10 h-px w-16 animate-fade-in"
        style={{
          background: "linear-gradient(90deg, hsl(var(--gold-soft)), transparent)",
          animationDelay: "300ms",
        }}
      />

      {intro && (
        <p
          className="mt-8 max-w-[52ch] text-cream/70 text-lg leading-[1.85] animate-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          {intro}
        </p>
      )}
    </div>

    {/* Decorative arch — right corner */}
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute right-[-80px] bottom-[-80px] h-[360px] w-auto opacity-[0.1] hidden md:block"
    >
      <path
        d="M50 590 L50 300 Q50 50 300 50 Q550 50 550 300 L550 590"
        fill="none"
        stroke="hsl(var(--gold-soft))"
        strokeWidth="1.5"
      />
      <path
        d="M120 590 L120 320 Q120 120 300 120 Q480 120 480 320 L480 590"
        fill="none"
        stroke="hsl(var(--gold-soft))"
        strokeWidth="0.75"
      />
    </svg>

    {/* Transition arch */}
    <div className="absolute bottom-[-2px] left-0 right-0 z-20 pointer-events-none">
      <ArchDivider fill={archFill} />
    </div>
  </section>
);

export default PageHero;
