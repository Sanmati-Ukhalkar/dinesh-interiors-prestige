import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Styles from "@/components/site/Styles";
import Portfolio from "@/components/site/Portfolio";
import Videos from "@/components/site/Videos";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <About />
    <Styles />
    <Portfolio />
    <Videos />
    <Contact />
    <Footer />
  </main>
);

export default Index;
