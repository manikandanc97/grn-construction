'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';

interface StatCounterProps {
  value: number;
  suffix?: string;
  isDecimal?: boolean;
  duration?: number;
  triggerOnScroll?: boolean;
}

export default function StatCounter({
  value,
  suffix = '',
  isDecimal = false,
  duration = 1.8,
  triggerOnScroll = true,
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(() =>
    prefersReducedMotion() ? (isDecimal ? value.toFixed(1) : value) : 0
  );
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion()) return;

    const obj = { val: 0 };

    const animateValue = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      gsap.to(obj, {
        val: value,
        duration,
        ease: EASING.power2Out,
        onUpdate: () => {
          setDisplayValue(
            isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val)
          );
        },
        onComplete: () => {
          setDisplayValue(isDecimal ? value.toFixed(1) : value);
        },
      });
    };

    if (!triggerOnScroll) {
      animateValue();
      return;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: animateValue,
    });

    return () => {
      st.kill();
    };
  }, [value, isDecimal, duration, triggerOnScroll]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}
