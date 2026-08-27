'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import {
  MapPin,
  ArrowUpRight,
  Sparkles,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { PROJECTS, PROJECT_CATEGORIES } from '@/app/lib/data';

const containerClass = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  // Category counts
  const getCategoryCount = (category: string) => {
    if (category === 'All') return PROJECTS.length;
    return PROJECTS.filter((p) => p.category === category).length;
  };

  // Header & Filter entrance animation
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set([headerRef.current, filtersRef.current], {
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

  // Card stagger animation on filter switch & scroll
  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridContainerRef.current) return;

      const cards = gridContainerRef.current.querySelectorAll('.project-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: EASING.power3Out,
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  // Gallery Navigation Handlers
  const handlePrevImage = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev !== null ? (prev === 0 ? PROJECTS.length - 1 : prev - 1) : 0
    );
  }, [activeImageIndex]);

  const handleNextImage = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) =>
      prev !== null ? (prev === PROJECTS.length - 1 ? 0 : prev + 1) : 0
    );
  }, [activeImageIndex]);

  // Keyboard navigation for image popup
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handlePrevImage, handleNextImage]);

  // In "All" view, show top 6 projects (1 Lead + 2 Secondary + 3 Standard = 6)
  // Last 2 are removed from the main grid per user request and viewable via Show More / Gallery popup
  const isBento = activeCategory === 'All';
  const displayProjects = activeCategory === 'All' ? filtered.slice(0, 6) : filtered;
  const leadProject = isBento ? displayProjects[0] : null;
  const secondaryProjects = isBento ? displayProjects.slice(1, 3) : [];
  const remainingProjects = isBento ? displayProjects.slice(3, 6) : displayProjects;

  const currentProject = activeImageIndex !== null ? PROJECTS[activeImageIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#EAEFF5] py-14 sm:py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A6B7C_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      <div className={containerClass}>
        {/* Modern Section Header */}
        <div ref={headerRef} className="opacity-0 mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-3 shadow-xs backdrop-blur-sm">
            <Sparkles size={13} className="text-secondary shrink-0" />
            <span>PROJECT SHOWCASE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-dark font-display leading-[1.18] tracking-tight">
            Built to Last.{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Designed for Living.
            </span>
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            A curated portfolio of bespoke residences, commercial landmarks, and architectural interior spaces built with structural precision.
          </p>
        </div>

        {/* Modern Glassmorphic Category Filter Bar with Counts */}
        <div ref={filtersRef} className="opacity-0 mb-8 sm:mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm">
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-dark text-white shadow-sm'
                      : 'text-neutral-700 hover:text-dark hover:bg-slate-100/90'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-neutral-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Modern Bento & Grid Layout */}
        <div ref={gridContainerRef} className="space-y-4 sm:space-y-6">
          {/* Asymmetric Bento Highlight Row */}
          {isBento && leadProject && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              {/* Lead Showcase Card */}
              <div
                onClick={() => {
                  const idx = PROJECTS.findIndex((p) => p.id === leadProject.id);
                  setActiveImageIndex(idx >= 0 ? idx : 0);
                }}
                className="project-card lg:col-span-7 group relative h-[340px] sm:h-[400px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden bg-dark shadow-md hover:shadow-2xl hover:shadow-primary/15 border border-slate-200/60 transition-all duration-500 cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={leadProject.image}
                    alt={leadProject.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />

                  {/* Multi-layer Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent transition-opacity duration-300 group-hover:from-dark" />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-transparent hidden sm:block" />

                  {/* Floating Badges */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-3.5 sm:inset-x-5 flex items-center justify-between z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide uppercase shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span>{leadProject.category}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-medium">
                      <Calendar size={11} className="text-secondary" />
                      <span>{leadProject.year}</span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-7 z-10 flex items-end justify-between gap-4">
                    <div className="max-w-md">
                      <div className="flex items-center gap-1.5 text-xs text-secondary font-medium mb-1.5">
                        <MapPin size={12} className="shrink-0" />
                        <span>{leadProject.location}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-white tracking-tight leading-snug group-hover:text-amber-100 transition-colors">
                        {leadProject.title}
                      </h3>
                    </div>

                    {/* Frosted Action Button */}
                    <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 group-hover:scale-110 shadow-md">
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Projects (2 stacked cards) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                {secondaryProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      const idx = PROJECTS.findIndex((p) => p.id === project.id);
                      setActiveImageIndex(idx >= 0 ? idx : 0);
                    }}
                    className="project-card group relative h-[200px] sm:h-[190px] lg:h-[208px] rounded-2xl overflow-hidden bg-dark shadow-md hover:shadow-xl hover:shadow-primary/10 border border-slate-200/60 transition-all duration-500 cursor-pointer"
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/45 to-transparent transition-opacity duration-300 group-hover:from-dark" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-10">
                        <span className="px-2.5 py-0.5 rounded-full bg-dark/60 backdrop-blur-md border border-white/20 text-secondary text-[10px] font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-[10px] text-white/80 font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                          {project.year}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex items-end justify-between gap-3">
                        <div className="pr-2">
                          <div className="flex items-center gap-1 text-[11px] text-white/80 font-medium mb-1">
                            <MapPin size={11} className="text-secondary shrink-0" />
                            <span className="truncate">{project.location}</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold font-display text-white leading-snug line-clamp-1 group-hover:text-amber-100 transition-colors">
                            {project.title}
                          </h4>
                        </div>

                        {/* Frosted Action Button */}
                        <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 shadow-xs">
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Responsive Grid (3 bottom cards in All view, or filtered list) */}
          {remainingProjects.length > 0 && (
            <div
              className={`grid gap-4 sm:gap-6 ${
                remainingProjects.length === 1
                  ? 'grid-cols-1 max-w-xl mx-auto'
                  : remainingProjects.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {remainingProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    const idx = PROJECTS.findIndex((p) => p.id === project.id);
                    setActiveImageIndex(idx >= 0 ? idx : 0);
                  }}
                  className="project-card group relative h-[240px] sm:h-[260px] lg:h-[280px] rounded-2xl overflow-hidden bg-dark shadow-md hover:shadow-xl hover:shadow-primary/10 border border-slate-200/60 transition-all duration-500 cursor-pointer"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/45 to-transparent transition-opacity duration-300 group-hover:from-dark" />

                    {/* Floating Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-dark/60 backdrop-blur-md border border-white/20 text-secondary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-white/80 font-medium bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex items-end justify-between gap-3">
                      <div className="pr-2">
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/80 font-medium mb-1">
                          <MapPin size={11} className="text-secondary shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold font-display text-white leading-snug line-clamp-1 group-hover:text-amber-100 transition-colors">
                          {project.title}
                        </h4>
                      </div>

                      {/* Frosted Action Button */}
                      <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 shadow-xs">
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Show More Photos / Full Gallery Trigger Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            onClick={() => setActiveImageIndex(0)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-dark font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg border border-slate-200/90 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
          >
            <Images size={16} className="text-secondary group-hover:scale-110 transition-transform" />
            <span>Show More Photos ({PROJECTS.length} Images)</span>
          </button>
        </div>
      </div>

      {/* Pure Image-Only Lightbox / Gallery Modal */}
      {currentProject && activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200 select-none"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar: Close Button & Counter */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-none">
            <div className="pointer-events-auto bg-black/60 backdrop-blur-md border border-white/15 text-white/90 px-3.5 py-1.5 rounded-full text-xs font-medium">
              <span>{activeImageIndex + 1} / {PROJECTS.length}</span>
            </div>

            <button
              onClick={() => setActiveImageIndex(null)}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Previous Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Main Full-Screen Image Container (Pure Image Only) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex items-center justify-center animate-in zoom-in-95 duration-200"
          >
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              priority
              className="object-contain rounded-xl sm:rounded-2xl drop-shadow-2xl"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
        </div>
      )}
    </section>
  );
}


