'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { PROJECTS, PROJECT_CATEGORIES } from '@/app/lib/data';

const containerClass = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const featuredCardRef = useRef<HTMLAnchorElement>(null);
  const supportingGridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const featuredProject = filtered[0] || PROJECTS[0];
  const supportingProjects = filtered.slice(1, 5);

  // Initial header and filter entrance animation
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set([headerRef.current, filtersRef.current, featuredCardRef.current], {
          opacity: 1,
          y: 0,
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

      // Filter tabs reveal
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1,
            ease: EASING.power3Out,
            scrollTrigger: {
              trigger: filtersRef.current,
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

  // Animations when category changes or when projects are in view
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Featured Project: scale + fade
      if (featuredCardRef.current) {
        gsap.fromTo(
          featuredCardRef.current,
          { opacity: 0, scale: 0.98, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            ease: EASING.power3Out,
            scrollTrigger: {
              trigger: featuredCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Supporting Projects: stagger entrance
      if (supportingGridRef.current) {
        const cards = supportingGridRef.current.querySelectorAll('.supporting-project-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: EASING.power3Out,
              scrollTrigger: {
                trigger: supportingGridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        }
      }
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#EAEFF5] py-12 sm:py-14 lg:py-16 relative overflow-hidden"
    >
      {/* Background Architectural Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A6B7C_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className={containerClass}>
        {/* Header */}
        <div ref={headerRef} className="opacity-0 mb-5 sm:mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm backdrop-blur-sm">
            <Sparkles size={12} className="text-secondary shrink-0" />
            <span>PROJECT SHOWCASE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-dark font-display leading-[1.18] tracking-tight">
            Built to Last.{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Designed for Living.
            </span>
          </h2>

          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            A curated portfolio of bespoke residences, commercial landmarks, and architectural spaces built with structural precision.
          </p>
        </div>

        {/* Compact & Elegant Filter Buttons */}
        <div ref={filtersRef} className="opacity-0 mb-5 sm:mb-6">
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-dark text-white shadow-xs border border-dark'
                      : 'bg-white/85 hover:bg-white text-gray-600 hover:text-dark border border-gray-200/90 shadow-xs backdrop-blur-sm hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Showcase Layout */}
        <div className="space-y-3.5 sm:space-y-4">
          {/* FEATURED PROJECT: 100% width, 300px–340px height */}
          {featuredProject && (
            <a
              href="#contact"
              ref={featuredCardRef}
              className="featured-project-card group relative w-full h-[280px] sm:h-[310px] lg:h-[340px] rounded-xl sm:rounded-2xl overflow-hidden bg-dark shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block"
            >
              {/* Image with 1.04 Scale Hover */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />

                {/* Subtle dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent hidden md:block" />

                {/* Top Badge */}
                <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Featured Project
                  </span>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-7 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="max-w-xl">
                    {/* Metadata: Category & Location (12–13px) */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-secondary mb-1">
                      <span>{featuredProject.category}</span>
                      <span className="text-white/40">•</span>
                      <span className="inline-flex items-center gap-1 text-white/90 normal-case font-medium">
                        <MapPin size={12} className="text-secondary" /> {featuredProject.location}
                      </span>
                    </div>

                    {/* Project Name: moves slightly upward on hover */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-white tracking-tight leading-tight transition-transform duration-300 ease-out group-hover:-translate-y-1">
                      {featuredProject.title}
                    </h3>
                  </div>

                  {/* View Project → Button with arrow moving right */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-dark font-semibold text-xs hover:bg-secondary hover:text-white transition-all duration-300 shadow-xs group-hover:bg-secondary group-hover:text-white">
                      <span>View Project</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* SUPPORTING PROJECTS: Balanced 2-column grid, 4 projects, 170px–200px each */}
          {supportingProjects.length > 0 && (
            <div
              ref={supportingGridRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4"
            >
              {supportingProjects.map((project) => (
                <a
                  key={project.id}
                  href="#contact"
                  className="supporting-project-card group relative w-full h-[170px] sm:h-[185px] lg:h-[195px] rounded-xl overflow-hidden bg-dark shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer block"
                >
                  {/* Image: occupies most of the card, 1.04 scale on hover */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                    />

                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/45" />

                    {/* Minimal Content Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex items-end justify-between gap-2.5">
                      <div>
                        {/* Category / Location */}
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/80 font-medium mb-0.5">
                          <span className="text-secondary font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                            {project.category}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={11} className="text-secondary" />
                            <span>{project.location}</span>
                          </span>
                        </div>

                        {/* Project Name: moves slightly upward on hover */}
                        <h4 className="text-sm sm:text-base font-bold font-display text-white leading-snug transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                          {project.title}
                        </h4>
                      </div>

                      {/* Arrow Icon: moves right on hover */}
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-200 shadow-xs">
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


