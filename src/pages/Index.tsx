import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Styles from "@/components/site/Styles";
import PortfolioGrid from "@/components/site/PortfolioGrid";
import VideoWall from "@/components/site/VideoWall";
import SocialProof from "@/components/site/SocialProof";
import ArchDivider from "@/components/site/ArchDivider";

const Index = () => (
  <>
    <Hero />
    <div className="relative -mt-[80px] md:-mt-[120px] z-20">
      <ArchDivider fill="hsl(var(--background))" />
    </div>
    <About />
    <Styles />
    <PortfolioGrid preview />
    <VideoWall />
    <SocialProof />
  </>
);

export default Index;
