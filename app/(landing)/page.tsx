import CertificatesSection from "../components/CertificatesSection";
import ChallengeFlow from "../components/ChallengeFlow";
import CoursesSection from "../components/CoursesSection";
import CTASection from "../components/CTASection";
import HeroSection from "../components/HeroSection";
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
      <HeroSection />
      <LogoMarquee />
      <WhyChooseUs />
      <CoursesSection />
      <MarketingServicesSection />
      <ITServicesSection />
      <CertificatesSection />
      <ProjectsSection />
      <Testimonials />
      <ChallengeFlow />
      <CTASection />
      <Proposal />
    </div>
  );
}
