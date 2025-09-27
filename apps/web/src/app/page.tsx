import { Footer } from "react-day-picker";
import { AboutSection } from "@/features/home/about";
import { HowItWorksSection } from "@/features/home/cara-kerja";
import { FeaturesSection } from "@/features/home/feature";
import { HeroSection } from "@/features/home/hero";
import { PartnersSection } from "@/features/home/partner";
import { ValuesSection } from "@/features/home/value";
import { WhySection } from "@/features/home/why";
import { Navbar } from "@/shared/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <WhySection />
      <ValuesSection />
      <HowItWorksSection />
      <PartnersSection />
      <Footer />
    </>
  );
}
