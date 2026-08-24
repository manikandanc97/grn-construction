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
import ClientRequirementSection from '@/app/components/sections/ClientRequirementSection';
import ContactSection from '@/app/components/sections/ContactSection';
import FloatingButtons from '@/app/components/shared/FloatingButtons';

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
        <ClientRequirementSection />
        <WhyChooseUsSection />
        <ReviewsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons + Mobile Bottom Nav */}
      <FloatingButtons />
      <MobileBottomNav />
    </>
  );
}
