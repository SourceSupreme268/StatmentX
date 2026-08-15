import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { TrustedBy } from "@/components/marketing/TrustedBy";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Features } from "@/components/marketing/Features";
import { SupportedBanks } from "@/components/marketing/SupportedBanks";
import { Pricing } from "@/components/marketing/Pricing";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <TrustedBy /> */}
      <HowItWorks />
      <Features />
      <SupportedBanks />
      <Pricing />
      <CtaBanner />
      <Footer />
    </main>
  );
}