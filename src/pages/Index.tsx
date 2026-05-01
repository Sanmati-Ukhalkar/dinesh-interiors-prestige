import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Styles from "@/components/site/Styles";
import Portfolio from "@/components/site/Portfolio";
import Videos from "@/components/site/Videos";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import ArchDivider from "@/components/site/ArchDivider";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    {/* Arch separator dips down from hero into About */}
    <div className="relative -mt-[80px] md:-mt-[120px] z-20">
      <ArchDivider fill="hsl(var(--background))" />
    </div>
    <About />
    <Styles />
    <Portfolio />
    <Videos />
    <Contact />
    <Footer />
    <WhatsAppFab />
  </main>
);

export default Index;
