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
    {/* Indian arch separator from hero into About */}
    <div className="relative -mt-1 bg-[hsl(var(--wood-deep))]">
      <ArchDivider fill="hsl(var(--background))" flip />
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
