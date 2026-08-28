import Navbar from '@/app/components/layout/Navbar';
import MobileAppBar from '@/app/components/layout/MobileAppBar';
import MobileBottomNav from '@/app/components/layout/MobileBottomNav';
import Footer from '@/app/components/layout/Footer';
import HeroSection from '@/app/components/sections/HeroSection';
import ServicesSection from '@/app/components/sections/ServicesSection';
import ProjectsSection from '@/app/components/sections/ProjectsSection';
import WhyChooseUsSection from '@/app/components/sections/WhyChooseUsSection';
import ReviewsSection from '@/app/components/sections/ReviewsSection';
import AboutSection from '@/app/components/sections/AboutSection';
import PackagesSection from '@/app/components/sections/PackagesSection';
import ClientRequirementSection from '@/app/components/sections/ClientRequirementSection';
import ContactSection from '@/app/components/sections/ContactSection';
import FloatingButtons from '@/app/components/shared/FloatingButtons';
import FreeEstimationModal from '@/app/components/shared/FreeEstimationModal';
import PlanApprovalModal from '@/app/components/shared/PlanApprovalModal';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />
      <MobileAppBar />

      {/* Main Content */}
      <main className="max-md:pb-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PackagesSection />
        <ClientRequirementSection />
        <WhyChooseUsSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Popups & Modals */}
      <FreeEstimationModal />
      <PlanApprovalModal />

      {/* Floating Action Buttons + Mobile Bottom Nav */}
      <FloatingButtons />
      <MobileBottomNav />
    </>
  );
}
