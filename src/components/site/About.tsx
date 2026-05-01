import about from "@/assets/about.jpg";

const stats = [
  { k: "15+", v: "Years of Craft" },
  { k: "120+", v: "Homes Designed" },
  { k: "40+", v: "Artisan Partners" },
];

const About = () => (
  <section id="about" className="py-24 md:py-36 bg-background">
    <div className="container-luxe grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div className="relative">
        <img
          src={about}
          alt="Portrait of Dinesh, founder of the studio"
          width={1280}
          height={1600}
          loading="lazy"
          className="w-full h-[640px] object-cover"
          style={{ boxShadow: "var(--shadow-image)" }}
        />
        <div className="absolute -bottom-6 -right-6 hidden md:block bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] px-8 py-6">
          <p className="font-serif text-3xl">Est. 2009</p>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-6">The Studio</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground">
          A quiet philosophy of living, beautifully made.
        </h2>
        <div className="gold-line my-10 max-w-[120px]" />
        <p className="text-muted-foreground leading-relaxed text-lg">
          Founded by <span className="text-foreground">Dinesh</span>, the studio approaches every home as a portrait of its people.
          We blend the warmth of Indian craft — carved teak, hand-loomed textiles, brass — with the discipline of modern design.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg mt-5">
          From premium materials to the smallest joinery, every detail is considered, sourced, and made to last a lifetime.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10">
          {stats.map((s) => (
            <div key={s.v}>
              <p className="font-serif text-4xl md:text-5xl text-[hsl(var(--wood))]">{s.k}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
