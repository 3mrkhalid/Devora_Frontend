import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import TechHubsSection from "./_components/TechHubsSection";
import CtaSection from "./_components/CtaSection";
import StatsAndTestimonials from "./_components/StatsAndTestimonials";
import Navbar from "./_components/Navbar";
import CommunityFeedPreview from "./_components/CommunityFeedPreview";
import Footer from "./_components/Footer";


export default function Home() {
  return (
    <div className="  bg-[#0B0B0F] font-sans ">
      <main className="w-full items-center justify-between py-0.5  dark:bg-black sm:items-start">
        
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <TechHubsSection />
        <CommunityFeedPreview />
        <StatsAndTestimonials />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
