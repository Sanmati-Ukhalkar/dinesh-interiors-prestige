import kitchen from "@/assets/portfolio-kitchen.jpg";
import bedroom from "@/assets/portfolio-bedroom.jpg";
import living from "@/assets/portfolio-living.jpg";

const items = [
  { title: "Kitchen", place: "Bengaluru Residence", img: kitchen, span: "lg:col-span-2 lg:row-span-2" },
  { title: "Bedroom", place: "Jaipur Villa", img: bedroom, span: "" },
  { title: "Living Room", place: "Mumbai Apartment", img: living, span: "" },
];

const Portfolio = () => (
  <section id="portfolio" className="py-24 md:py-36 bg-background">
    <div className="container-luxe">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Selected Work</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            A portfolio of considered homes.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          A small selection from our recent work across kitchens, bedrooms, and living spaces — each shaped by the family who lives in it.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 lg:gap-8 lg:h-[820px]">
        {items.map((it) => (
          <figure key={it.title} className={`group relative overflow-hidden ${it.span} h-[420px] lg:h-auto`}>
            <img
              src={it.img}
              alt={`${it.title} — ${it.place}`}
              width={1280}
              height={1280}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--wood-deep))]/85 via-[hsl(var(--wood-deep))]/10 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-7 lg:p-9 text-cream translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))]">{it.place}</p>
              <h3 className="font-serif text-3xl lg:text-4xl mt-2">{it.title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
