import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AccordGallery from "./components/AccordGallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RadiusScrollSection from "./components/RadiusScrollSection";
import IsometricGridBg from "./components/IsometricGridBg";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        
        <div className="relative bg-[#0b1e2d]">
          {/* Tile pattern visible in the gaps between sections */}
          <IsometricGridBg decorative className="opacity-[0.25] z-0" />

          <RadiusScrollSection bgColor="white" startRadius={48}>
            <AccordGallery />
          </RadiusScrollSection>
          
          <RadiusScrollSection bgColor="white" startRadius={48}>
            <Services />
          </RadiusScrollSection>
          
          <RadiusScrollSection bgColor="white" startRadius={48}>
            <Testimonials />
          </RadiusScrollSection>
          
          <RadiusScrollSection bgColor="white" startRadius={48}>
            <Contact />
          </RadiusScrollSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
