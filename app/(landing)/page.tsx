import CertificatesSection from "../components/CertificatesSection";
import ChallengePackages from "../components/ChallengePackages";
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
      <HeroSection />
      <LogoMarquee />
      <WhyChooseUs />
      <CoursesSection />
      <MarketingServicesSection />
      <ITServicesSection />
      <HowItWorks />
      <ProjectsSection />
      <Testimonials />
      <CertificatesSection />
      <ChallengePackages />
      <FAQSection />
      <CTASection />
      <Proposal />
    </div>
  );
}
