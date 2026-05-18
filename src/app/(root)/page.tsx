import HeroSection from "../../components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import CategoriesSection from "@/components/landing/categories-section";
import StatsSection from "@/components/landing/stats-section";
import ForMastersSection from "@/components/landing/for-masters-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import CtaSection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#14120f]">
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <CategoriesSection />
      <ForMastersSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
