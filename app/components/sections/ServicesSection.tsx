'use client';

import { motion } from 'framer-motion';
import {
  Building2, Home, Landmark, Sofa, Wrench, Droplets,
  Palette, HardHat, Layers, Triangle, Grid3X3, IndianRupee,
} from 'lucide-react';
import AnimatedSection from '@/app/components/shared/AnimatedSection';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { SERVICES } from '@/app/lib/data';

const containerClass = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16';

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, Home, Landmark, Sofa, Wrench, Droplets,
  Palette, HardHat, Layers, Triangle, Grid3X3, IndianRupee,
};

// Override Road icon with a suitable replacement
import { Navigation as RoadIcon } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 md:py-20 lg:py-24">
      <div className={containerClass}>
        <AnimatedSection>
          <SectionHeader
            badge="What We Do"
            title="Our Construction"
            highlight="Services"
            description="From laying the foundation to the final finishing touches, we deliver complete construction solutions tailored to your vision and budget."
          />
        </AnimatedSection>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, index) => {
            const IconComponent =
              service.icon === 'Road'
                ? RoadIcon
                : ICON_MAP[service.icon] || Building2;
            const isPrimary = service.color === '#1A6B7C';

            return (
              <AnimatedSection key={service.id} delay={index * 0.04}>
                <motion.div
                  className="group relative p-8 lg:p-10 rounded-[20px] border border-gray-100 bg-white cursor-default h-full flex flex-col transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  whileHover={{
                    y: -8,
                    boxShadow: isPrimary
                      ? '0 20px 48px rgba(26,107,124,0.15)'
                      : '0 20px 48px rgba(212,129,58,0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                      isPrimary
                        ? 'bg-gradient-to-br from-primary/10 to-primary/5'
                        : 'bg-gradient-to-br from-secondary/10 to-secondary/5'
                    }`}
                  >
                    <IconComponent
                      size={28}
                      className={isPrimary ? 'text-primary' : 'text-secondary'}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-dark text-[20px] md:text-[22px] mb-3 font-display leading-snug group-hover:text-primary transition-colors"
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-[16px] md:text-[17px] lg:text-[18px] leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Hover accent line */}
                  <div
                    className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      isPrimary
                        ? 'bg-gradient-to-r from-primary to-primary-light'
                        : 'bg-gradient-to-r from-secondary to-secondary-light'
                    }`}
                  />
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="sm:hidden">
          <div
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-2"
          >
            {SERVICES.map((service) => {
              const IconComponent =
                service.icon === 'Road'
                  ? RoadIcon
                  : ICON_MAP[service.icon] || Building2;
              const isPrimary = service.color === '#1A6B7C';

              return (
                <div
                  key={service.id}
                  className="snap-start flex-shrink-0 w-72 p-7 rounded-[20px] border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                      isPrimary ? 'bg-primary/10' : 'bg-secondary/10'
                    }`}
                  >
                    <IconComponent size={24} className={isPrimary ? 'text-primary' : 'text-secondary'} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-bold text-dark text-[18px] mb-3 font-display leading-snug">{service.title}</h3>
                  <p className="text-gray-500 text-[16px] leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-400 text-xs mt-2">Swipe to explore</p>
        </div>
      </div>
    </section>
  );
}
