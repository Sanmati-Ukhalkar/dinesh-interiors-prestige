import Reveal from "./Reveal";

const stats = [
  { platform: "Instagram", handle: "@interiorsbydinesh", count: "182K", label: "Followers" },
  { platform: "YouTube", handle: "Interiors by Dinesh", count: "94K", label: "Subscribers" },
  { platform: "Pinterest", handle: "@interiorsbydinesh", count: "1.2M", label: "Monthly Views" },
];

const SocialProof = () => (
  <section className="py-20 md:py-28 bg-[hsl(var(--wood-deep))] relative overflow-hidden grain">
    {/* Faint diagonal texture lines */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, hsl(var(--gold-soft)) 0, hsl(var(--gold-soft)) 1px, transparent 0, transparent 50%)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="relative container-luxe">
      <Reveal className="text-center mb-14">
        <p className="eyebrow text-[hsl(var(--gold-soft))] mb-4">A Community of Homemakers</p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl mx-auto text-cream">
          Trusted by hundreds of thousands across India.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-px bg-[hsl(var(--gold)/0.15)]">
        {stats.map((s, i) => (
          <Reveal key={s.platform} delay={i * 120}>
            <div className="group bg-[hsl(var(--wood-deep))] px-10 py-12 text-center hover:bg-[hsl(var(--wood)/0.5)] transition-colors duration-500">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))] mb-6">
                {s.platform}
              </p>
              <p className="font-serif text-6xl md:text-7xl text-cream leading-none">
                {s.count}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-cream/50">
                {s.label}
              </p>
              <div className="gold-line my-7 max-w-[50px] mx-auto opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
              <p className="text-sm text-cream/40 group-hover:text-cream/60 transition-colors duration-300">
                {s.handle}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
