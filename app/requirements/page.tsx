import type { Metadata } from 'next';
import Navbar from '@/app/components/layout/Navbar';
import MobileAppBar from '@/app/components/layout/MobileAppBar';
import MobileBottomNav from '@/app/components/layout/MobileBottomNav';
import Footer from '@/app/components/layout/Footer';
import ClientRequirementSection from '@/app/components/sections/ClientRequirementSection';
import FloatingButtons from '@/app/components/shared/FloatingButtons';

export const metadata: Metadata = {
  title: 'Client Requirement Specification Form | GRN Construction Udumalpet',
  description:
    'Submit your building specifications, structural preferences, joinery choices, flooring, and material requirements to GRN Construction for a customized estimate.',
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

      {/* Main Requirement Form Content */}
      <main className="pt-24 lg:pt-28 max-md:pb-20 min-h-screen bg-brand-light">
        <ClientRequirementSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons + Mobile Bottom Nav */}
      <FloatingButtons />
      <MobileBottomNav />
    </>
  );
}
