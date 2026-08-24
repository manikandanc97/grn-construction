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
      className="relative overflow-hidden bg-[#0A121A] py-16 sm:py-20 lg:py-24 text-white border-y border-white/5"
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
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 opacity-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-secondary-light text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
            <ShieldCheck size={13} className="text-secondary shrink-0" />
            <span>WHY GRN CONSTRUCTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[42px] font-extrabold text-white font-display leading-[1.18] tracking-tight">
            Built on Trust.{' '}
            <span className="bg-gradient-to-r from-secondary-light via-secondary to-amber-400 bg-clip-text text-transparent">
              Delivered with Precision.
            </span>
          </h2>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-[16px] leading-relaxed text-slate-300 max-w-2xl mx-auto font-normal">
            We eliminate uncertainty with certified materials, transparent milestone workflows, and unwavering on-site accountability.
          </p>
        </div>

        {/* THREE DIFFERENTIATORS (3 Larger Cards, height: 170px-190px, padding: 24px) */}
        <div
          ref={differentiatorsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7"
        >
          {DIFFERENTIATORS.map((diff) => {
            const IconComponent = diff.icon;
            return (
              <div
                key={diff.number}
                className="group relative flex flex-col justify-between p-[24px] min-h-[175px] sm:min-h-[185px] lg:min-h-[190px] rounded-xl bg-[#0F1E2C] border border-white/10 hover:border-secondary/40 transition-all duration-300 ease-out hover:-translate-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] opacity-0"
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">
                      {diff.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-secondary group-hover:bg-secondary/15 group-hover:border-secondary/30 transition-colors duration-300">
                      <IconComponent size={19} className="stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Title & Short Explanation */}
                  <h3 className="text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-white font-display leading-snug group-hover:text-secondary-light transition-colors duration-200">
                    {diff.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-white/65 leading-relaxed font-normal">
                    {diff.description}
                  </p>
                </div>

                {/* Subtle bottom detail line */}
                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-white/40 tracking-wider uppercase group-hover:text-secondary/75 transition-colors">
                  <span>GRN Standard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* METRICS (Numbers 24px-28px, Labels 11-12px, Subtle Separators) */}
        <div
          ref={metricsRef}
          className="mt-10 sm:mt-12 rounded-xl bg-[#0F1E2C]/80 border border-white/10 p-5 sm:p-6 lg:p-7 opacity-0 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {PROOF_METRICS.map((metric, index) => (
              <div
                key={metric.label}
                className={`flex flex-col items-center text-center justify-center ${
                  index >= 2 ? 'pt-5 lg:pt-0' : ''
                } ${index === 1 || index === 3 ? 'pl-2 sm:pl-4' : ''} px-3 lg:px-6`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[24px] sm:text-[26px] lg:text-[28px] font-extrabold text-white font-display tracking-tight leading-none">
                    <StatCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      isDecimal={metric.isDecimal}
                      triggerOnScroll={true}
                    />
                  </span>
                  {metric.hasStar && (
                    <Star
                      size={16}
                      className="fill-secondary text-secondary shrink-0 ml-0.5 -mt-0.5"
                    />
                  )}
                </div>

                <span className="text-[11px] sm:text-[12px] text-white/70 font-semibold tracking-wider uppercase mt-2">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA (Bottom: "Start Your Project →", Compact) */}
        <div ref={ctaRef} className="mt-10 sm:mt-12 text-center opacity-0">
          <button
            onClick={handleScrollToRequirements}
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-white font-semibold text-[13px] sm:text-[14px] bg-secondary hover:bg-secondary-light hover:shadow-[0_4px_20px_rgba(212,129,58,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>Start Your Project</span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}

