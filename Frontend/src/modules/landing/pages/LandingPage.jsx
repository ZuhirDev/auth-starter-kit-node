import Footer from "@/components/Footer";
import { HeroSection } from "@landing/components/HeroSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-[80%] mx-auto">
      <main>
        <HeroSection />
      </main>

      <Footer />
    </div>
  );
}