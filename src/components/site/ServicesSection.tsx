import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";
import SplitText from "./SplitText";
import SpotlightCard from "./SpotlightCard";
import GlareHover from "./GlareHover";
import ProcessStepper from "./ProcessStepper";
import GradientText from "./GradientText";

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

const processSteps = [
  { number: "01", title: "Consultation", description: "We meet, walk your space, listen to how you want to live, and align on scope & budget." },
  { number: "02", title: "Design", description: "Mood boards, layouts, 3D visuals, material palettes and detailed drawings." },
  { number: "03", title: "Execution", description: "Vetted artisans and site supervision — joinery, finishes, lighting, custom pieces." },
  { number: "04", title: "Delivery", description: "Styled handover with art, accessories and a care guide for every material." },
];

const ServicesSection = () => (
  <>
    {/* Services grid */}
    <section className="relative py-24 md:py-36 bg-background overflow-hidden">
      <JaliBackground opacity={0.04} />
      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">What We Do</p>
          <SplitText
            tag="h2"
            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
            delay={0.055}
            duration={0.8}
          >
            Considered services for considered homes.
          </SplitText>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 120}>
              <GlareHover className="h-full" glareOpacity={0.12}>
                <SpotlightCard
                  className="group bg-background p-10 lg:p-12 h-full hover:bg-secondary/30 transition-colors duration-500 cursor-default"
                  spotlightColor="rgba(201,169,110,0.1)"
                >
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
                </SpotlightCard>
              </GlareHover>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Process steps — replaced with ProcessStepper */}
    <section className="py-24 md:py-36 bg-secondary/40">
      <div className="container-luxe">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">Our Process</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            From first conversation to{" "}
            <GradientText
              colors={["hsl(33,70%,55%)", "hsl(43,90%,82%)", "hsl(33,70%,55%)"]}
              speed={5}
              className="font-serif text-4xl md:text-5xl lg:text-6xl"
            >
              final styling.
            </GradientText>
          </h2>
        </Reveal>
        <ProcessStepper steps={processSteps} />
      </div>
    </section>
  </>
);

export default ServicesSection;
