import PageHero from "@/components/site/PageHero";
import About from "@/components/site/About";
import Reveal from "@/components/site/Reveal";
import JaliBackground from "@/components/site/JaliBackground";

const pillars = [
  { title: "Experience", body: "Fifteen years designing premium homes across Bengaluru, Mumbai, Delhi and beyond — for families, founders and creatives." },
  { title: "Philosophy", body: "Restraint over excess. Honest materials. Light handled with care. A home should feel inevitable, not decorated." },
  { title: "Knowledge Sharing", body: "Through YouTube tours, studio visits and a growing community, we share craft, sourcing and process — openly." },
  { title: "Trust", body: "Every project is led personally. From first sketch to last brass handle, there is one designer accountable to you." },
];

const AboutPage = () => (
  <>
    <PageHero
      eyebrow="About the Founder"
      title={<>A quiet hand behind <em className="not-italic text-[hsl(var(--gold-soft))]">considered</em> homes.</>}
      intro="Dinesh founded the studio in 2009 with a single belief — that an Indian home should feel both rooted and effortlessly modern."
    />

    <About />

    <section className="relative py-24 md:py-36 bg-secondary/40 overflow-hidden">
      <JaliBackground opacity={0.05} />
      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow mb-5">What guides the studio</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Four pillars, one practice.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 120}>
              <article className="bg-background p-10 lg:p-12 h-full">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="text-xs text-accent tracking-[0.28em]">0{i + 1}</span>
                  <h3 className="font-serif text-3xl">{p.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
