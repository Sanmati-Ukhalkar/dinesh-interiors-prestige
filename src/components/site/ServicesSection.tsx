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
    {/* Services grid */}
    <section className="relative py-24 md:py-36 bg-background overflow-hidden">
      <JaliBackground opacity={0.04} />
      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">What We Do</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Considered services for{" "}
            <em className="not-italic text-[hsl(var(--wood))]">considered homes.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 120}>
              <article className="group bg-background p-10 lg:p-12 h-full hover:bg-secondary/30 transition-colors duration-500 cursor-default">
                {/* Number + expanding rule */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-[4rem] text-[hsl(var(--gold)/0.15)] leading-none select-none transition-colors duration-500 group-hover:text-[hsl(var(--gold)/0.3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-[hsl(var(--gold))] transition-all duration-500 group-hover:w-20" />
                </div>

                <h3 className="font-serif text-3xl lg:text-[2rem] leading-tight">{s.title}</h3>
                <p className="mt-5 text-muted-foreground leading-[1.8]">{s.desc}</p>

                <ul className="mt-8 space-y-3 border-t border-border pt-6">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm text-foreground flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="h-px w-4 flex-shrink-0 bg-[hsl(var(--gold))]" />
                      <span className="tracking-wide">{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Process steps */}
    <section className="py-24 md:py-36 bg-secondary/40">
      <div className="container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">Our Process</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            From first conversation to{" "}
            <em className="not-italic text-[hsl(var(--wood))]">final styling.</em>
          </h2>
        </Reveal>

        <div className="relative grid md:grid-cols-4 gap-10 md:gap-8">
          {/* Connector line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.4) 20%, hsl(var(--gold)/0.4) 80%, transparent)",
            }}
          />

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="relative group cursor-default">
                {/* Circle */}
                <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-background border border-[hsl(var(--gold)/0.4)] group-hover:border-[hsl(var(--gold))] group-hover:bg-[hsl(var(--gold)/0.08)] transition-all duration-500 mb-8 mx-auto md:mx-0 shadow-sm">
                  <span className="font-serif text-xl text-[hsl(var(--wood-deep))] transition-transform duration-500 group-hover:scale-110">{s.n}</span>
                </div>
                <h3 className="font-serif text-2xl mt-1 text-center md:text-left">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-[1.8] text-sm text-center md:text-left">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ServicesSection;
