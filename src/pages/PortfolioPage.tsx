import { useSearchParams } from "react-router-dom";
import PageHero from "@/components/site/PageHero";
import PortfolioGrid, { Category } from "@/components/site/PortfolioGrid";
import Contact from "@/components/site/Contact";

const validCategories: Category[] = ["Kitchen", "Bedroom", "Living", "Storage"];

const PortfolioPage = () => {
  const [params] = useSearchParams();
  const styleParam = params.get("style");
  const initial = (validCategories.includes(styleParam as Category) ? styleParam : "All") as "All" | Category;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>A studio of <em className="not-italic text-[hsl(var(--gold-soft))]">homes</em>, not houses.</>}
        intro="Browse selected projects across kitchens, bedrooms, living spaces and storage. Click any image for a closer look."
      />
      <PortfolioGrid initialFilter={initial} />
      <Contact />
    </>
  );
};

export default PortfolioPage;
