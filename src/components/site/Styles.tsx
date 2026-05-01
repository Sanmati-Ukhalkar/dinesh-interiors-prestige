import traditional from "@/assets/style-traditional.jpg";
import modern from "@/assets/style-modern.jpg";
import fusion from "@/assets/style-fusion.jpg";

const items = [
  { title: "Traditional", desc: "Carved teak, jharokhas, brass and rich textiles rooted in Indian heritage.", img: traditional },
  { title: "Modern", desc: "Clean lines, light oak, soft linen — calm spaces filled with natural light.", img: modern },
  { title: "Fusion", desc: "A measured dialogue between heritage craft and contemporary form.", img: fusion },
];

const Styles = () => (
  <section id="styles" className="py-24 md:py-36 bg-secondary/40">
    <div className="container-luxe">
      <div className="max-w-2xl mb-16 md:mb-20">
        <p className="eyebrow mb-5">Style Categories</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
          Three philosophies. One sense of warmth.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {items.map((it, i) => (
          <article key={it.title} className="group">
            <div className="overflow-hidden">
              <img
                src={it.img}
                alt={`${it.title} interior style`}
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pt-7">
              <div className="flex items-baseline gap-4">
                <span className="text-xs text-accent tracking-[0.28em]">0{i + 1}</span>
                <h3 className="font-serif text-3xl">{it.title}</h3>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Styles;
