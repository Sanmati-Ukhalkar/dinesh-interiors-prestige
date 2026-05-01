import PageHero from "@/components/site/PageHero";
import ServicesSection from "@/components/site/ServicesSection";
import Contact from "@/components/site/Contact";

const ServicesPage = () => (
  <>
    <PageHero
      eyebrow="Services"
      title={<>Bespoke design, <em className="not-italic text-[hsl(var(--gold-soft))]">end-to-end</em>.</>}
      intro="Whether it is a single kitchen or a complete home, every engagement follows the same considered four-step process."
    />
    <ServicesSection />
    <Contact />
  </>
);

export default ServicesPage;
