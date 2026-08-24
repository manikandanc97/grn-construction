'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import {
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  Compass,
  Building,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';

const containerClass = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10';

const PILLARS = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Certified Structural Rigor',
    description:
      'Engineered with high-grade certified steel, premium concrete mixes, and multi-stage structural quality inspections at every milestone.',
    tag: 'Zero Compromise',
  },
  {
    num: '02',
    icon: Compass,
    title: 'Transparent Milestone Pricing',
    description:
      'Detailed itemized BOQ, daily digital on-site updates, and strictly milestone-linked payments with guaranteed zero hidden costs.',
    tag: '100% Transparency',
  },
  {
    num: '03',
    icon: Clock,
    title: 'On-Time Project Handover',
    description:
      'Disciplined timeline scheduling, dedicated civil engineer site supervision, and streamlined material procurement for turnkey delivery.',
    tag: 'Guaranteed Timelines',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const expCardRef = useRef<HTMLDivElement>(null);
  const tagBadgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set(
          [
            visualWrapperRef.current,
            contentRef.current,
            headerRef.current,
            storyRef.current?.children,
            cardsRef.current?.children,
          ],
          { opacity: 1, x: 0, y: 0 }
        );
        return;
      }

      const isMobile = window.innerWidth < 1024;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: EASING.power3Out },
      });

      // Visual column reveal
      if (visualWrapperRef.current) {
        tl.fromTo(
          visualWrapperRef.current,
          { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 24 : 0 },
          { opacity: 1, x: 0, y: 0, duration: 0.9 },
          0
        );
      }

      // Floating Experience Badge pop
      if (expCardRef.current) {
        tl.fromTo(
          expCardRef.current,
          { opacity: 0, scale: 0.88, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: EASING.expoOut },
          0.35
        );
      }

      // Top floating pill badge
      if (tagBadgeRef.current) {
        tl.fromTo(
          tagBadgeRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.45
        );
      }

      // Content Column Reveal
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 },
          { opacity: 1, x: 0, y: 0, duration: 0.85 },
          0.15
        );
      }

      // Header Elements Stagger
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.25
        );
      }

      // Narrative Stagger
      if (storyRef.current) {
        tl.fromTo(
          storyRef.current.children,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.38
        );
      }

      // Pillar Cards Stagger
      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          0.48
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F5F2EC] to-[#FAF8F5] relative overflow-hidden border-b border-neutral-200/80"
    >
      {/* Precision Blueprint Architectural Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1A6B7C 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Subtle Glow Spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className={`${containerClass} relative z-10`}>
        
        {/* Main Grid: Visuals on Left (5 cols on 12-grid), Content on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* ================= LEFT: Layered Visual Architecture Showcase ================= */}
          <div ref={visualWrapperRef} className="lg:col-span-5 relative opacity-0">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">
              
              {/* Primary Visual Container with Architectural Frame */}
              <div
                ref={mainImageRef}
                className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 shadow-[0_24px_60px_-15px_rgba(15,25,35,0.22)] border-2 border-white"
              >
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85"
                  alt="GRN Construction Architectural Masterpiece in Udumalpet"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={false}
                />

                {/* Rich Atmospheric Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/25 to-transparent pointer-events-none" />

                {/* Top Subtle Engineering Tag */}
                <div
                  ref={tagBadgeRef}
                  className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark/75 backdrop-blur-md border border-white/20 text-white shadow-lg text-xs font-semibold"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Licensed Civil Engineers</span>
                </div>

                {/* Bottom Image Caption & Coordinates */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/70 uppercase tracking-widest mb-1.5">
                    <span>UDUMALPET • TAMIL NADU</span>
                    <span>EST. 2014</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display leading-tight text-white drop-shadow-sm">
                    Architectural Excellence &amp; Turnkey Execution
                  </h3>
                </div>
              </div>

              {/* Overlapping Floating Stat Badge (Experience & Delivered Projects) */}
              <div
                ref={expCardRef}
                className="absolute -bottom-6 -right-3 sm:-bottom-7 sm:-right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.12)] border border-neutral-200/90 max-w-[210px] sm:max-w-[240px] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-white flex items-center justify-center shadow-md shrink-0">
                    <Award size={22} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-dark font-display tracking-tight">
                        10+
                      </span>
                      <span className="text-xs font-bold text-secondary uppercase">Years</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-600 font-medium leading-snug">
                      Engineering Trust in Udumalpet
                    </p>
                  </div>
                </div>

                {/* Micro trust row inside card */}
                <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-500 font-medium">
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <CheckCircle2 size={12} /> 100+ Builds Handed Over
                  </span>
                </div>
              </div>

              {/* Decorative Corner Framing Element */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-xl pointer-events-none hidden sm:block" />
            </div>
          </div>

          {/* ================= RIGHT: High-Impact Editorial & Value Matrix ================= */}
          <div ref={contentRef} className="lg:col-span-7 opacity-0 flex flex-col justify-center">
            
            {/* Eyebrow & Main Section Headline */}
            <div ref={headerRef} className="mb-6 sm:mb-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm backdrop-blur-sm">
                <Building size={13} className="text-secondary shrink-0" />
                <span>ABOUT GRN CONSTRUCTION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-dark font-display leading-[1.15] tracking-tight">
                Building with Purpose.{' '}
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Creating with Confidence.
                </span>
              </h2>
            </div>

            {/* Narrative Storytelling */}
            <div ref={storyRef} className="space-y-3 mb-7 sm:mb-8 text-neutral-700">
              <p className="text-sm sm:text-base leading-relaxed">
                Founded with an unyielding dedication to structural integrity and architectural finesse,{' '}
                <strong className="font-semibold text-dark">GRN Construction</strong> is Udumalpet’s trusted building partner. We transform visionary blueprints into enduring residential villas, modern commercial hubs, and tailored interior spaces.
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Our approach blends experienced civil engineering oversight, certified premium materials, and transparent milestone management so your dream project is delivered with absolute peace of mind.
              </p>
            </div>

            {/* Modern 3-Pillar Interactive Cards */}
            <div ref={cardsRef} className="space-y-3.5">
              {PILLARS.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="group relative p-4 sm:p-4.5 rounded-xl bg-white/90 hover:bg-white border border-neutral-200/80 hover:border-primary/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(26,107,124,0.08)] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      {/* Number & Icon Pill */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm mt-0.5">
                        <IconComponent size={20} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm sm:text-[15px] font-bold text-dark font-display group-hover:text-primary transition-colors duration-200">
                            {pillar.title}
                          </h4>
                          <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 group-hover:bg-primary/10 text-neutral-600 group-hover:text-primary transition-colors shrink-0">
                            {pillar.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


