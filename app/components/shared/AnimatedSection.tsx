'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp',
  once = true,
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      const isMobile = window.innerWidth < 768;

      let initialProps: gsap.TweenVars = { opacity: 0 };

      switch (variant) {
        case 'fadeUp':
          initialProps = { opacity: 0, y: isMobile ? 25 : 35 };
          break;
        case 'fadeIn':
          initialProps = { opacity: 0 };
          break;
        case 'slideLeft':
          initialProps = { opacity: 0, x: isMobile ? -20 : -45 };
          break;
        case 'slideRight':
          initialProps = { opacity: 0, x: isMobile ? 20 : 45 };
          break;
        case 'scale':
          initialProps = { opacity: 0, scale: isMobile ? 0.98 : 0.95, y: 15 };
          break;
      }

      gsap.fromTo(
        el,
        initialProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          delay,
          ease: EASING.power3Out,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            once,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [variant, delay, once] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
