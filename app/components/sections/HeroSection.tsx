'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import StatCounter from '@/app/components/shared/StatCounter';

const HERO_METRICS = [
  { value: 41, suffix: '+', label: 'Projects / Clients' },
  { value: 4.9, suffix: '/5', label: 'Google Rating', isDecimal: true },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+', label: 'Completed Works' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const bgImage = bgImageRef.current;
      if (!hero || !bgImage) return;

      if (prefersReducedMotion()) {
        gsap.set(
          [
            bgImage,
            eyebrowRef.current,
            headingRef.current,
            descriptionRef.current,
            ctaRef.current,
            metricsRef.current?.querySelectorAll('.metric-item'),
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // Background entrance animation: scale 1.05 -> 1 with smooth fade
      gsap.fromTo(
        bgImage,
        { scale: 1.05, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: 2.0,
          ease: EASING.power3Out,
        }
      );

      // Subtle parallax on scroll
      gsap.to(bgImage, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Master content timeline
      const tl = gsap.timeline({ defaults: { ease: EASING.power3Out } });

      // Eyebrow reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      )
        // Heading reveal
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.35
        )
        // Description reveal
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.5
        )
        // CTA buttons stagger
        .fromTo(
          ctaRef.current ? ctaRef.current.children : [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.65
        );

      // Minimal metrics row subtle stagger
      if (metricsRef.current) {
        const metricItems = metricsRef.current.querySelectorAll('.metric-item');
        tl.fromTo(
          metricItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          0.8
        );
      }

      // Scroll indicator entrance + loop
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          1.1
        );

        gsap.to(scrollIndicatorRef.current, {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 1.4,
          ease: 'power1.inOut',
          delay: 1.6,
        });
      }
    },
    { scope: heroRef }
  );

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-dark"
    >
      {/* Background Image with Architectural Dark Atmosphere */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85')] bg-cover bg-center bg-no-repeat will-change-transform"
      />

      {/* Cinematic Overlays: Directional left shade + Vertical Vignette */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,25,35,0.95)_0%,rgba(15,25,35,0.85)_45%,rgba(15,25,35,0.6)_75%,rgba(15,25,35,0.4)_100%)]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,35,0.65)_0%,transparent_35%,rgba(15,25,35,0.35)_70%,rgba(15,25,35,0.95)_100%)]"
      />

      {/* Subtle Architectural Grid Background Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_80px,rgba(255,255,255,0.4)_80px,rgba(255,255,255,0.4)_81px),repeating-linear-gradient(90deg,transparent,transparent_80px,rgba(255,255,255,0.4)_80px,rgba(255,255,255,0.4)_81px)]" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10 pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-14 flex-1 flex flex-col justify-center">
        <div className="max-w-[650px] w-full">
          {/* Eyebrow / Trust Statement */}
          <div ref={eyebrowRef} className="opacity-0 mb-4 sm:mb-5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(212,129,58,0.8)]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/90">
                Udumalpet&apos;s Trusted Builders Since 2014
              </span>
            </div>
          </div>

          {/* Main Cinematic Heading: 48px-58px desktop, 34px-38px mobile, font-weight 600-700 */}
          <h1
            ref={headingRef}
            className="text-[34px] leading-[1.12] sm:text-[40px] sm:leading-[1.12] md:text-[48px] md:leading-[1.1] lg:text-[54px] lg:leading-[1.08] xl:text-[58px] font-bold text-white font-display tracking-tight mb-4 sm:mb-5 opacity-0"
          >
            Building Dreams
            <br />
            <span className="text-secondary">Into Reality</span>
          </h1>

          {/* Subheading / Description: 14px-16px, line-height 1.6, max-width 600px */}
          <p
            ref={descriptionRef}
            className="text-[14px] sm:text-[15px] md:text-[16px] text-white/80 max-w-[600px] mb-6 sm:mb-8 font-normal leading-[1.6] opacity-0"
          >
            Professional residential, commercial, and turnkey construction services
            in Udumalpet &amp; Tamil Nadu. Engineered with precision, delivered on time.
          </p>

          {/* CTA Buttons: Height 40px-46px, strong primary hierarchy */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-9"
          >
            <button
              onClick={() => handleScrollTo('requirements')}
              className="inline-flex h-[42px] sm:h-[46px] items-center justify-center gap-2 rounded-xl bg-secondary px-6 sm:px-7 text-sm sm:text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(212,129,58,0.4)] transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:bg-secondary-light hover:shadow-[0_6px_28px_rgba(212,129,58,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer opacity-0"
            >
              <span>Get a Quote</span>
              <ArrowUpRight size={17} className="stroke-[2.5]" />
            </button>

            <button
              onClick={() => handleScrollTo('projects')}
              className="inline-flex h-[42px] sm:h-[46px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.06] px-5 sm:px-6 text-sm sm:text-[15px] font-medium text-white backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:bg-white/12 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer opacity-0"
            >
              <span>View Projects</span>
            </button>
          </div>

          {/* Four evenly distributed metrics within the 650px content container with subtle separators */}
          <div
            ref={metricsRef}
            className="w-full pt-5 border-t border-white/15"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
              {HERO_METRICS.map((metric, index) => (
                <div
                  key={index}
                  className={`metric-item flex flex-col opacity-0 ${
                    index !== 0 ? 'sm:border-l sm:border-white/15 sm:pl-4 md:pl-5' : ''
                  } ${
                    index % 2 === 1 ? 'border-l border-white/15 pl-4 sm:border-l-0' : ''
                  }`}
                >
                  <span className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-white font-display tracking-tight leading-none">
                    <StatCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      isDecimal={metric.isDecimal}
                      triggerOnScroll={false}
                    />
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-white/70 font-medium tracking-normal mt-1 leading-tight">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={() => handleScrollTo('about')}
        className="hidden md:flex absolute bottom-6 lg:bottom-8 right-10 lg:right-16 z-20 items-center gap-2 text-white/45 hover:text-white/85 transition-colors cursor-pointer opacity-0"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase">Explore</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
