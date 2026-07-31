import Image from 'next/image';
import { CheckCircle2, Target, Eye } from 'lucide-react';
import AnimatedSection from '@/app/components/shared/AnimatedSection';
import SectionHeader from '@/app/components/shared/SectionHeader';

const containerClass = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16';

const HIGHLIGHTS = [
  'Licensed & Registered Construction Company',
  '10+ Years of Construction Experience',
  '100+ Projects Successfully Completed',
  '41+ Satisfied Clients across Tamil Nadu',
  'Transparent Pricing & No Hidden Costs',
  'End-to-End Construction Management',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#F8F5F0] to-[#EEF2F7]">
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Visual Side */}
          <AnimatedSection variant="slideLeft">
            <div className="relative mx-3 my-6 sm:mx-6 sm:my-8 lg:m-0">
              {/* Main Image */}
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85"
                  alt="GRN Construction Team at Work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,107,124,0.3)_0%,transparent_60%)]" />
              </div>

              {/* Logo Badge */}
              <div
                className="absolute -right-4 -bottom-4 sm:-right-6 sm:-bottom-6 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-2xl border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
              >
                <Image
                  src="/logo.jpg"
                  alt="GRN Construction Logo"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Experience Badge */}
              <div
                className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 rounded-2xl border-4 border-white bg-gradient-to-br from-primary to-primary-light px-4 py-3 sm:px-5 sm:py-4 text-center shadow-[0_8px_24px_rgba(26,107,124,0.3)]"
              >
                <p className="text-white font-bold text-xl sm:text-2xl font-display">10+</p>
                <p className="text-white/80 text-[10px] sm:text-xs">Years of</p>
                <p className="text-white/80 text-[10px] sm:text-xs">Excellence</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content Side */}
          <AnimatedSection variant="slideRight">
            <SectionHeader
              badge="Our Story"
              title="About"
              highlight="GRN Construction"
              centered={false}
            />

            <p className="text-gray-600 leading-relaxed mb-5">
              GRN Construction is a trusted construction company based in Udumalpet, Tamil Nadu. 
              Founded with a passion for quality craftsmanship, we have been transforming visions 
              into reality for over a decade - building homes, commercial spaces, and infrastructure 
              that stand the test of time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              What sets us apart is our commitment to transparency, honest pricing, and a client-first 
              approach. Every project we undertake is treated with the care and attention it deserves, 
              from the first blueprint to the final coat of paint.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {HIGHLIGHTS.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="rounded-2xl border border-primary/15 bg-primary/5 p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-primary" />
                  <h4 className="font-semibold text-dark font-display">Our Mission</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mt-auto">
                  To deliver superior construction solutions that exceed client expectations while 
                  maintaining affordability and integrity.
                </p>
              </div>
              <div
                className="rounded-2xl border border-secondary/15 bg-secondary/5 p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={18} className="text-secondary" />
                  <h4 className="font-semibold text-dark font-display">Our Vision</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To be Tamil Nadu&apos;s most trusted construction partner, known for quality, 
                  innovation, and community impact.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
