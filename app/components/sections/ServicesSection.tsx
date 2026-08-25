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
      className="relative bg-[#FAFAF8] py-12 md:py-14 lg:py-16 overflow-hidden border-b border-gray-100"
    >
      {/* Subtle architectural background texture accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A6B7C_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className={containerClass}>
        {/* Section Heading */}
        <div ref={headerRef} className="opacity-0 mb-6 sm:mb-8">
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
          className="opacity-0 mb-5 sm:mb-6 rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs hover:border-primary/30 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Image (5 cols on lg) */}
            <div className="relative lg:col-span-5 min-h-[200px] sm:min-h-[220px] lg:min-h-full bg-neutral-100 overflow-hidden group">
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
              <div className="absolute top-3.5 left-3.5 lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-primary shadow-xs tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {FEATURED_SERVICE.number} • {FEATURED_SERVICE.badge}
              </div>
            </div>

            {/* Right: Content (7 cols on lg) */}
            <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
              <div>
                <div className="hidden lg:flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-secondary uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {FEATURED_SERVICE.badge}
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">{FEATURED_SERVICE.number}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-dark font-display tracking-tight mb-1">
                  {FEATURED_SERVICE.title}
                </h3>
                
                <p className="text-[11px] sm:text-xs font-semibold text-secondary mb-2">
                  {FEATURED_SERVICE.tagline}
                </p>

                <p className="text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed mb-4">
                  {FEATURED_SERVICE.description}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-neutral-100 mb-4 sm:mb-5">
                  {FEATURED_SERVICE.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-1.5 text-[11.5px] sm:text-xs text-neutral-700 font-medium leading-tight">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
                <a
                  href={FEATURED_SERVICE.ctaHref}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-dark text-white text-xs font-semibold transition-all duration-300 hover:bg-primary hover:shadow-xs group"
                >
                  <span>{FEATURED_SERVICE.ctaText}</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <span className="text-[11px] text-neutral-400 font-medium">
                  Complete engineering & architectural oversight
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORTING SERVICES (3-Column Grid) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
        >
          {SUPPORTING_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href="#contact"
                className="group relative flex flex-col justify-between p-4 sm:p-4.5 min-h-[130px] rounded-xl border border-neutral-200/90 bg-white opacity-0 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xs"
              >
                {/* Top Row: Service Number + Simple Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 group-hover:text-secondary transition-colors">
                    {service.number}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-neutral-100/90 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Icon size={14} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Content: Title & 1-2 line description */}
                <div className="mb-2">
                  <h4 className="text-xs sm:text-sm font-bold text-dark font-display leading-snug mb-1 group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-[12px] text-neutral-500 leading-snug line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Bottom: Subtle hover arrow */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-500 group-hover:text-primary transition-colors">
                  <span>Explore</span>
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-200 group-hover:translate-x-1 text-neutral-400 group-hover:text-primary"
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-6 sm:mt-8 rounded-xl border border-neutral-200/90 bg-white p-4 sm:p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-dark font-display mb-0.5">
              Need a custom scope or specialized civil consultancy?
            </h4>
            <p className="text-neutral-500 text-[11px] sm:text-xs">
              We evaluate soil reports, structural drawings, and custom project requirements with complete engineering transparency.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-br from-secondary to-secondary-light text-white text-xs font-semibold shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Request Free Consultation</span>
            <ArrowRight size={13} />
          </a>
        </div>

      </div>
    </section>
  );
}
