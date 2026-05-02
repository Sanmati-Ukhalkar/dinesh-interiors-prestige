import HeroCanvas from "@/components/site/HeroCanvas";
import About from "@/components/site/About";
import Styles from "@/components/site/Styles";
import PortfolioGrid from "@/components/site/PortfolioGrid";
import VideoWall from "@/components/site/VideoWall";
import SocialProof from "@/components/site/SocialProof";
import ArchDivider from "@/components/site/ArchDivider";
import ScrollVelocity from "@/components/site/ScrollVelocity";
import ServicesSection from "@/components/site/ServicesSection";

const Index = () => (
  <>
    <HeroCanvas />
    <div className="relative -mt-[80px] md:-mt-[120px] z-20">
      <ArchDivider fill="hsl(var(--background))" />
    </div>
    <About />

    {/* Velocity marquee divider */}
    <div className="py-10 bg-[hsl(var(--wood-deep))] overflow-hidden border-y border-[hsl(var(--gold)/0.15)]">
      <ScrollVelocity
        texts={["Interiors by Dinesh", "Pune · Est. 2009"]}
        velocity={50}
        className="font-serif text-2xl text-[hsl(var(--gold-soft))] opacity-60 tracking-widest uppercase"
        numCopies={6}
      />
    </div>

    <Styles />
    <ServicesSection />
    <PortfolioGrid preview />
    <VideoWall />
    <SocialProof />
  </>
);

export default Index;

