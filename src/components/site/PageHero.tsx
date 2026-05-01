import { ReactNode } from "react";
import JaliBackground from "./JaliBackground";

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}

const PageHero = ({ eyebrow, title, intro }: Props) => (
  <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 bg-[hsl(var(--wood-deep))] text-cream overflow-hidden">
    <JaliBackground opacity={0.07} />
    <div className="relative container-luxe max-w-4xl">
      <p className="eyebrow text-[hsl(var(--gold-soft))] mb-6 animate-fade-in">{eyebrow}</p>
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-cream animate-fade-up">
        {title}
      </h1>
      <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[hsl(var(--gold-soft))] to-transparent" />
      {intro && (
        <p className="mt-8 max-w-2xl text-cream/75 text-lg leading-relaxed animate-fade-up" style={{ animationDelay: "150ms" }}>
          {intro}
        </p>
      )}
    </div>
    {/* Decorative arch outline */}
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute right-[-120px] bottom-[-120px] h-[420px] w-auto opacity-15 hidden md:block"
    >
      <path d="M50 590 L50 300 Q50 50 300 50 Q550 50 550 300 L550 590" fill="none" stroke="hsl(var(--gold-soft))" strokeWidth="1.5" />
      <path d="M120 590 L120 320 Q120 120 300 120 Q480 120 480 320 L480 590" fill="none" stroke="hsl(var(--gold-soft))" strokeWidth="1" />
    </svg>
  </section>
);

export default PageHero;
