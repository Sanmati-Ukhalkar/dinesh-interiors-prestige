import PageHero from "@/components/site/PageHero";
import About from "@/components/site/About";
import Reveal from "@/components/site/Reveal";
import JaliBackground from "@/components/site/JaliBackground";

const pillars = [
  {
    title: "Experience",
    body: "Fifteen years designing premium homes across Pune and beyond — for families, founders and creatives.",
  },
  {
    title: "Philosophy",
    body: "Restraint over excess. Honest materials. Light handled with care. A home should feel inevitable, not decorated.",
  },
  {
    title: "Knowledge",
    body: "Through YouTube tours, studio visits and a growing community, we share craft, sourcing and process — openly.",
  },
  {
    title: "Trust",
    body: "Every project is led personally. From first sketch to last brass handle, there is one designer accountable to you.",
  },
];

const AboutPage = () => (
  <>
    <PageHero
      eyebrow="About the Founder"
      title={<>A quiet hand behind <em className="not-italic text-[hsl(var(--gold-soft))]">considered</em> homes.</>}
      intro="Dinesh founded the studio in 2009 with a single belief — that an Indian home should feel both rooted and effortlessly modern."
    />

    <About />

    {/* Pillars */}
    <section className="relative py-24 md:py-36 bg-secondary/40 overflow-hidden">
      <JaliBackground opacity={0.05} />
      <div className="relative container-luxe">
        <Reveal className="max-w-2xl mb-14 md:mb-20">
          <p className="eyebrow mb-5">What guides the studio</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Four pillars,{" "}
            <em className="not-italic text-[hsl(var(--wood))]">one practice.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 120}>
              <article className="group bg-background p-10 lg:p-12 h-full hover:bg-secondary/30 transition-colors duration-500 cursor-default">
                <div className="flex items-center gap-4 mb-7">
                  {/* Ghost number */}
                  <span className="font-serif text-5xl text-[hsl(var(--gold)/0.2)] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-[hsl(var(--gold))] transition-all duration-500 group-hover:w-14" />
                </div>
                <h3 className="font-serif text-3xl mb-5">{p.title}</h3>
                <p className="text-muted-foreground leading-[1.85]">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
