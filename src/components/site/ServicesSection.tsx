import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";

const services = [
  {
    title: "Full Home Interiors",
    desc: "Turnkey design and execution for the entire home — from layout planning to last styling.",
    items: ["Space planning", "Lighting design", "Soft furnishings", "Art & accessories"],
  },
  {
    title: "Modular Kitchen",
    desc: "Premium modular kitchens built around how your family actually cooks.",
    items: ["Custom joinery", "Stone & marble surfaces", "Brass + matte hardware", "Smart storage"],
  },
  {
    title: "Wardrobe Design",
    desc: "Walk-in and fitted wardrobes tailored to your wardrobe, jewellery and rituals.",
    items: ["Walk-in closets", "Floor-to-ceiling units", "Integrated lighting", "Mirror & dresser"],
  },
  {
    title: "Renovation",
    desc: "Sensitive renovations of older homes — preserving character, adding modern comfort.",
    items: ["Structural rework", "Heritage restoration", "Material sourcing", "Project management"],
  },
];

const steps = [
  { n: "01", title: "Consultation", desc: "We meet, walk your space, listen to how you want to live, and align on scope & budget." },
  { n: "02", title: "Design", desc: "Mood boards, layouts, 3D visuals, material palettes and detailed drawings." },
  { n: "03", title: "Execution", desc: "Vetted artisans and site supervision — joinery, finishes, lighting, custom pieces." },
  { n: "04", title: "Delivery", desc: "Styled handover with art, accessories and a care guide for every material." },
];

const ServicesSection = () => (
  <>
    <section className="relative py-24 md:py-36 bg-background overflow-hidden">
      <JaliBackground opacity={0.04} />
      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">What We Do</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Considered services for considered homes.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 120}>
              <article className="group bg-background p-10 lg:p-12 h-full hover:bg-secondary/40 transition-colors duration-500">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs text-accent tracking-[0.28em]">0{i + 1}</span>
                  <span className="h-px w-10 bg-[hsl(var(--gold))] mt-2 transition-all duration-500 group-hover:w-16" />
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl">{s.title}</h3>
                <p className="mt-5 text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="mt-8 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm text-foreground flex items-center gap-3">
                      <span className="h-px w-4 bg-[hsl(var(--gold))]" /> {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-24 md:py-36 bg-secondary/40">
      <div className="container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">Our Process</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            From first conversation to final styling.
          </h2>
        </Reveal>

        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          <div aria-hidden="true" className="hidden md:block absolute top-[42px] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative">
                <div className="relative h-[84px] flex items-center">
                  <span className="relative z-10 flex h-[84px] w-[84px] items-center justify-center rounded-full bg-background border border-[hsl(var(--gold))] font-serif text-xl text-[hsl(var(--wood-deep))]">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-serif text-2xl mt-7">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ServicesSection;
