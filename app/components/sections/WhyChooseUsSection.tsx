'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, FileCheck2, Clock, Star, ArrowRight } from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import StatCounter from '@/app/components/shared/StatCounter';

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Quality Craftsmanship',
    description:
      'Certified high-grade materials, precision structural audits, and master construction standards built to endure for generations.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Transparent Process',
    description:
      'Clear milestone-linked payments, itemized material lists, and daily visual site updates with zero hidden surprises.',
    icon: FileCheck2,
  },
  {
    number: '03',
    title: 'Reliable Delivery',
    description:
      'Disciplined timeline management, dedicated on-site supervision, and committed handover schedules you can rely on.',
    icon: Clock,
  },
];

const PROOF_METRICS = [
  {
    value: 41,
    suffix: '+',
    label: 'Projects',
    isDecimal: false,
  },
  {
    value: 4.9,
    suffix: '/5',
    label: 'Google Rating',
    isDecimal: true,
    hasStar: true,
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    isDecimal: false,
  },
  {
    value: 100,
    suffix: '+',
    label: 'Completed Works',
    isDecimal: false,
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const differentiatorsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set(
          [
            headerRef.current,
            differentiatorsRef.current?.children,
            metricsRef.current,
            ctaRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: EASING.power3Out },
      });

      // Header reveal
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          0
        );
      }

      // 3 Differentiators stagger reveal
      if (differentiatorsRef.current) {
        tl.fromTo(
          differentiatorsRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          0.18
        );
      }

      // Proof metrics row reveal
      if (metricsRef.current) {
        tl.fromTo(
          metricsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.42
        );
      }

      // Bottom CTA reveal
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.6
        );
      }
    },
    { scope: sectionRef }
  );

  const handleScrollToRequirements = () => {
    const el = document.getElementById('requirements');
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden bg-[#0A121A] py-12 sm:py-14 lg:py-16 text-white border-y border-white/5"
    >
      {/* Architectural Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle Navy Gradient Depth */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-secondary-light text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <ShieldCheck size={12} className="text-secondary shrink-0" />
            <span>WHY GRN CONSTRUCTION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white font-display leading-[1.18] tracking-tight">
            Built on Trust.{' '}
            <span className="bg-gradient-to-r from-secondary-light via-secondary to-amber-400 bg-clip-text text-transparent">
              Delivered with Precision.
            </span>
          </h2>

          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-2xl mx-auto font-normal">
            We eliminate uncertainty with certified materials, transparent milestone workflows, and unwavering on-site accountability.
          </p>
        </div>

        {/* THREE DIFFERENTIATORS (3 Compact Cards) */}
        <div
          ref={differentiatorsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {DIFFERENTIATORS.map((diff) => {
            const IconComponent = diff.icon;
            return (
              <div
                key={diff.number}
                className="group relative flex flex-col justify-between p-4 sm:p-5 min-h-[140px] sm:min-h-[150px] rounded-xl bg-[#0F1E2C] border border-white/10 hover:border-secondary/40 transition-all duration-200 ease-out hover:-translate-y-0.5 shadow-md opacity-0"
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-lg sm:text-xl font-extrabold text-secondary tracking-tight">
                      {diff.number}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-secondary group-hover:bg-secondary/15 group-hover:border-secondary/30 transition-colors duration-200">
                      <IconComponent size={16} className="stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Title & Short Explanation */}
                  <h3 className="text-sm sm:text-base font-bold text-white font-display leading-snug group-hover:text-secondary-light transition-colors duration-150">
                    {diff.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-[13px] text-white/65 leading-relaxed font-normal">
                    {diff.description}
                  </p>
                </div>

                {/* Subtle bottom detail line */}
                <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-semibold text-white/40 tracking-wider uppercase group-hover:text-secondary/75 transition-colors">
                  <span>GRN Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* METRICS */}
        <div
          ref={metricsRef}
          className="mt-6 sm:mt-8 rounded-xl bg-[#0F1E2C]/80 border border-white/10 p-4 sm:p-5 opacity-0 shadow-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {PROOF_METRICS.map((metric, index) => (
              <div
                key={metric.label}
                className={`flex flex-col items-center text-center justify-center ${
                  index >= 2 ? 'pt-4 lg:pt-0' : ''
                } ${index === 1 || index === 3 ? 'pl-2 sm:pl-4' : ''} px-2 lg:px-4`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white font-display tracking-tight leading-none">
                    <StatCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      isDecimal={metric.isDecimal}
                      triggerOnScroll={true}
                    />
                  </span>
                  {metric.hasStar && (
                    <Star
                      size={14}
                      className="fill-secondary text-secondary shrink-0 ml-0.5 -mt-0.5"
                    />
                  )}
                </div>

                <span className="text-[10px] sm:text-[11px] text-white/70 font-semibold tracking-wider uppercase mt-1.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-6 sm:mt-8 text-center opacity-0">
          <button
            onClick={handleScrollToRequirements}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white font-semibold text-xs sm:text-[13.5px] bg-secondary hover:bg-secondary-light shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}

