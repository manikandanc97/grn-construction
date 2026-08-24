'use client';

import { gsap, ScrollTrigger, EASING, prefersReducedMotion } from './gsap';

/**
 * Creates a standard smooth section reveal with ScrollTrigger
 */
export function createSectionHeaderReveal(
  target: HTMLElement | string,
  trigger?: HTMLElement | string
) {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: EASING.power3Out,
      scrollTrigger: {
        trigger: trigger || target,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
}

/**
 * Creates a staggered card grid reveal with ScrollTrigger
 */
export function createStaggerCardsReveal(
  cards: HTMLElement[] | NodeListOf<Element> | string,
  trigger: HTMLElement | string,
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
    scale?: number;
    start?: string;
  }
) {
  if (prefersReducedMotion()) {
    gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  const {
    stagger = 0.08,
    duration = 0.8,
    y = 35,
    scale = 0.97,
    start = 'top 82%',
  } = options || {};

  return gsap.fromTo(
    cards,
    {
      opacity: 0,
      y,
      scale,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease: EASING.power3Out,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
}
