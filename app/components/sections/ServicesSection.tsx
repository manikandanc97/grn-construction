'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import {
  Building2,
  Wrench,
  Palette,
  HardHat,
  Droplets,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import SectionHeader from '@/app/components/shared/SectionHeader';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const FEATURED_SERVICE = {
  number: '01',
  badge: 'Flagship Expertise',
  title: 'Residential Construction',
  tagline: 'Custom Homes & Architectural Luxury Villas',
  description:
    'From bespoke contemporary villas to multi-story family homes, we deliver full-lifecycle engineering, architectural planning, and turnkey execution with uncompromising quality standards.',
  highlights: [
    'Custom architectural blueprints & 3D elevations',
    'Certified foundation & premium grade materials',
    'Turnkey handover with 100% budget transparency',
  ],
  image:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
  ctaText: 'Explore Service',
  ctaHref: '#contact',
};

const SUPPORTING_SERVICES: ServiceItem[] = [
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Construction',
    description:
      'Scalable commercial complexes, retail showrooms, and modern office spaces engineered for durability and compliance.',
    icon: Building2,
  },
  {
    id: 'renovation',
    number: '03',
    title: 'Renovation & Remodeling',
    description:
      'Complete structural retrofitting, space expansions, and high-value modern aesthetic architectural restorations.',
    icon: Wrench,
  },
  {
    id: 'interior',
    number: '04',
    title: 'Interior & Finishing',
    description:
      'Bespoke interior architecture, modular woodwork, false ceilings, and precision-fitted luxury tile finishes.',
    icon: Palette,
  },
  {
    id: 'structural',
    number: '05',
    title: 'Structural & Civil Works',
    description:
      'Rigorous soil testing, RCC framing, deep foundations, and structural calculations for absolute integrity.',
    icon: HardHat,
  },
  {
    id: 'waterproofing',
    number: '06',
    title: 'Waterproofing & Protection',
    description:
      'Multi-layer membrane waterproofing, basement damp-proofing, and protective weatherproofing treatments.',
    icon: Droplets,
  },
  {
    id: 'turnkey',
    number: '07',
    title: 'Turnkey Project Management',
    description:
      'End-to-end statutory approvals, procurement, on-site supervision, and milestone delivery.',
    icon: Layers,
  },
];

const containerClass = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set([headerRef.current, featuredRef.current, gridRef.current?.children], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASING.power3Out,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Featured Card reveal
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EASING.power3Out,
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Grid Cards Stagger reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: EASING.power3Out,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#FAFAF8] py-16 md:py-20 lg:py-24 overflow-hidden border-b border-gray-100"
    >
      {/* Subtle architectural background texture accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A6B7C_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className={containerClass}>
        {/* Section Heading */}
        <div ref={headerRef} className="opacity-0 mb-10 sm:mb-14">
          <SectionHeader
            badge="OUR EXPERTISE"
            badgeIcon={Layers}
            title="Construction Expertise Built Around"
            highlight="Your Vision."
            description="From custom luxury residences to commercial infrastructure, GRN delivers rigorous structural engineering and refined craftsmanship across every phase."
          />
        </div>

        {/* FEATURED SERVICE (Full-width, 50% split layout) */}
        <div
          ref={featuredRef}
          className="opacity-0 mb-8 sm:mb-10 rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-primary/30 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Image (5 cols on lg) */}
            <div className="relative lg:col-span-5 min-h-[260px] sm:min-h-[300px] lg:min-h-full bg-neutral-100 overflow-hidden group">
              <Image
                src={FEATURED_SERVICE.image}
                alt={FEATURED_SERVICE.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent lg:hidden" />
              
              {/* Badge on Mobile Image */}
              <div className="absolute top-4 left-4 lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-primary shadow-sm tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {FEATURED_SERVICE.number} • {FEATURED_SERVICE.badge}
              </div>
            </div>

            {/* Right: Content (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="hidden lg:flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-secondary uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {FEATURED_SERVICE.badge}
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">{FEATURED_SERVICE.number}</span>
                </div>

                <h3 className="text-2xl sm:text-[28px] font-bold text-dark font-display tracking-tight mb-2">
                  {FEATURED_SERVICE.title}
                </h3>
                
                <p className="text-xs sm:text-[13px] font-semibold text-secondary mb-3">
                  {FEATURED_SERVICE.tagline}
                </p>

                <p className="text-neutral-600 text-sm sm:text-[14.5px] leading-relaxed mb-6">
                  {FEATURED_SERVICE.description}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-100 mb-6 sm:mb-8">
                  {FEATURED_SERVICE.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs sm:text-[13px] text-neutral-700 font-medium">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100">
                <a
                  href={FEATURED_SERVICE.ctaHref}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-dark text-white text-xs sm:text-[13.5px] font-semibold transition-all duration-300 hover:bg-primary hover:shadow-[0_8px_20px_rgba(26,107,124,0.25)] group"
                >
                  <span>{FEATURED_SERVICE.ctaText}</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <span className="text-xs text-neutral-400 font-medium">
                  Complete engineering & architectural oversight
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING SERVICES (3-Column Grid) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {SUPPORTING_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href="#contact"
                className="group relative flex flex-col justify-between p-5 sm:p-6 min-h-[150px] sm:min-h-[165px] rounded-xl border border-neutral-200/90 bg-white opacity-0 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_28px_rgba(26,107,124,0.06)]"
              >
                {/* Top Row: Service Number + Simple Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 group-hover:text-secondary transition-colors">
                    {service.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-neutral-100/90 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Content: Title & 1-2 line description */}
                <div className="mb-4">
                  <h4 className="text-sm sm:text-base font-bold text-dark font-display leading-snug mb-1.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-[13px] text-neutral-500 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Bottom: Subtle hover arrow */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-primary transition-colors">
                  <span>Explore</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 text-neutral-400 group-hover:text-primary"
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-dark font-display mb-1">
              Need a custom scope or specialized civil consultancy?
            </h4>
            <p className="text-neutral-500 text-xs sm:text-[13.5px]">
              We evaluate soil reports, structural drawings, and custom project requirements with complete engineering transparency.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-secondary to-secondary-light text-white text-xs sm:text-[13px] font-semibold shadow-[0_4px_16px_rgba(212,129,58,0.25)] hover:shadow-[0_8px_24px_rgba(212,129,58,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Request Free Consultation</span>
            <ArrowRight size={15} />
          </a>
        </div>

      </div>
    </section>
  );
}
