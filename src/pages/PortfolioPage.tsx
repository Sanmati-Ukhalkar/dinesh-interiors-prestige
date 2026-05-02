import { useSearchParams } from "react-router-dom";
import PageHero from "@/components/site/PageHero";
import PortfolioGrid, { Category, portfolioItems } from "@/components/site/PortfolioGrid";
import Contact from "@/components/site/Contact";
import TextPressure from "@/components/site/TextPressure";
import DomeGallery from "@/components/site/DomeGallery";
import GridMotion from "@/components/site/GridMotion";

const validCategories: Category[] = ["Kitchen", "Bedroom", "Living", "Storage"];

const PortfolioPage = () => {
  const [params] = useSearchParams();
  const styleParam = params.get("style");
  const initial = (validCategories.includes(styleParam as Category) ? styleParam : "All") as "All" | Category;

  return (
    <>
      <PageHero
        eyebrow="Archive"
        title={
          <div className="h-[120px] md:h-[180px] w-full mt-4">
            <TextPressure
              text="PORTFOLIO"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="hsl(var(--cream))"
              className="font-serif tracking-widest"
              minFontSize={60}
            />
          </div>
        }
        intro="Browse selected projects across kitchens, bedrooms, living spaces and storage. Click any image for a closer look."
      />
      <div className="relative w-full h-[70vh] bg-background">
        <DomeGallery 
          images={portfolioItems.map(item => ({ src: item.img, alt: item.title }))} 
        />
      </div>
      
      {/* GridMotion Background block */}
      <div className="relative w-full h-[30vh] overflow-hidden bg-background">
        <GridMotion 
          items={portfolioItems.map(i => i.img)} 
          gradientColor="#1a1412" 
        />
      </div>

      <PortfolioGrid initialFilter={initial} />
      <Contact />
    </>
  );
};

export default PortfolioPage;
