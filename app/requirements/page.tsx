import type { Metadata } from 'next';
import Navbar from '@/app/components/layout/Navbar';
import MobileAppBar from '@/app/components/layout/MobileAppBar';
import MobileBottomNav from '@/app/components/layout/MobileBottomNav';
import Footer from '@/app/components/layout/Footer';
import PackagesSection from '@/app/components/sections/PackagesSection';
import ClientRequirementSection from '@/app/components/sections/ClientRequirementSection';
import FloatingButtons from '@/app/components/shared/FloatingButtons';
import FreeEstimationModal from '@/app/components/shared/FreeEstimationModal';
import PlanApprovalModal from '@/app/components/shared/PlanApprovalModal';

export const metadata: Metadata = {
  title: 'Packages & Client Requirement Specification Form | GRN Construction Udumalpet',
  description:
    'Explore our Standard, Premium, Elite & Luxury construction packages and submit your building specifications to GRN Construction for a customized estimate.',
  alternates: {
    canonical: '/requirements',
  },
};

export default function RequirementsPage() {
  return (
    <>
      {/* Navigation */}
      <Navbar />
      <MobileAppBar />

      {/* Main Content */}
      <main className="pt-24 lg:pt-28 max-md:pb-20 min-h-screen bg-brand-light">
        <PackagesSection />
        <ClientRequirementSection />
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
