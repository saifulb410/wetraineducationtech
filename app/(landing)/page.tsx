import CertificatesSection from "../components/CertificatesSection";
import ChallengeFlow from "../components/ChallengeFlow";
import CoursesSection from "../components/CoursesSection";
import CTASection from "../components/CTASection";
import FAQSection from "../components/FAQSection";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import ITServicesSection from "../components/ITServicesSection";
import LogoMarquee from "../components/LogoMarquee";
import MarketingServicesSection from "../components/MarketingServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import Proposal from "../components/Proposal";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

export default function HomePage() {
  return (
    <div className="bg-[#080B14] text-white scroll-smooth">
      {/* 1. Hero — hook + trust badge */}
      <HeroSection />

      {/* 2. Social proof — partner/brand strip */}
      <LogoMarquee />

      {/* 3. Why choose us — full feature ecosystem */}
      <WhyChooseUs />

      {/* 4. Services — courses, marketing, IT */}
      <CoursesSection />
      <MarketingServicesSection />
      <ITServicesSection />

      {/* 5. How it works — 3-step process */}
      <HowItWorks />

      {/* 6. Portfolio — featured projects */}
      <ProjectsSection />

      {/* 7. Testimonials — client stories */}
      <Testimonials />

      {/* 8. Certificates */}
      <CertificatesSection />

      {/* 9. Challenge / comparison */}
      <ChallengeFlow />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. CTA + Proposal form */}
      <CTASection />
      <Proposal />
    </div>
  );
}
