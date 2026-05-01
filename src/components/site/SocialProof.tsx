import Reveal from "./Reveal";

const stats = [
  { platform: "Instagram", handle: "@interiorsbydinesh", count: "182K", label: "Followers" },
  { platform: "YouTube", handle: "Interiors by Dinesh", count: "94K", label: "Subscribers" },
  { platform: "Pinterest", handle: "@interiorsbydinesh", count: "1.2M", label: "Monthly Views" },
];

const SocialProof = () => (
  <section className="py-20 md:py-28 bg-secondary/40 border-y border-border">
    <div className="container-luxe">
      <Reveal className="text-center mb-14">
        <p className="eyebrow mb-4">A Community of Homemakers</p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl mx-auto">
          Trusted by hundreds of thousands across India.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.platform} delay={i * 120}>
            <div className="bg-background border border-border p-8 lg:p-10 text-center hover:border-[hsl(var(--gold))] transition-colors duration-500">
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--gold))]">{s.platform}</p>
              <p className="font-serif text-5xl md:text-6xl text-[hsl(var(--wood-deep))] my-5">{s.count}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
              <div className="gold-line my-6 max-w-[60px] mx-auto" />
              <p className="text-sm text-muted-foreground">{s.handle}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
