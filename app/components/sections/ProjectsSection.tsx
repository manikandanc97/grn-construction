'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import AnimatedSection from '@/app/components/shared/AnimatedSection';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { PROJECTS, PROJECT_CATEGORIES } from '@/app/lib/data';

const containerClass = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-brand-light to-[#EEF2F7] py-16 md:py-20 lg:py-24"
    >
      <div className={containerClass}>
        <AnimatedSection>
          <SectionHeader
            badge="Our Work"
            title="Project"
            highlight="Showcase"
            description="Explore our portfolio of completed projects across residential, commercial, interior design, and renovation categories."
          />
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_15px_rgba(26,107,124,0.3)] border border-transparent'
                    : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Desktop Grid */}
        <div className="hidden sm:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={`group relative rounded-[20px] overflow-hidden cursor-pointer bg-white flex flex-col h-full transition-all duration-300 hover:shadow-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${index % 3 === 1 ? 'row-span-1' : ''}`}
                  whileHover={{ y: -8, boxShadow: '0 20px 48px rgba(0,0,0,0.12)' }}
                >
                  {/* Image */}
                  <div className="relative h-[240px] lg:h-[280px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 mb-1">
                        <MapPin size={11} /> {project.location}
                      </span>
                      <p className="text-white text-sm leading-snug">{project.description}</p>
                      <ExternalLink size={14} className="text-secondary mt-2" />
                    </div>
                    {/* Category Badge */}
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-primary/85 backdrop-blur-sm"
                    >
                      {project.category}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-bold text-dark text-[20px] mb-3 font-display leading-snug">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between text-gray-500 text-[16px] mt-auto pt-5 border-t border-gray-100">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swipe Carousel */}
        <div className="sm:hidden">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-2">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="snap-start flex-shrink-0 w-[85vw] max-w-[340px] rounded-[20px] overflow-hidden bg-white flex flex-col transition-shadow hover:shadow-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-[260px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-primary/85"
                  >
                    {project.category}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="font-bold text-dark text-[22px] mb-3 font-display">{project.title}</h3>
                  <p className="text-gray-500 text-[16px] mb-5 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between text-gray-500 text-[16px] mt-auto pt-5 border-t border-gray-100">
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {project.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={16} /> {project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-2">Swipe to explore</p>
        </div>
      </div>
    </section>
  );
}
