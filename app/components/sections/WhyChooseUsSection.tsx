'use client';

import { motion } from 'framer-motion';
import {
  IndianRupee, ShieldCheck, Users, Clock, MessageSquare, ThumbsUp,
} from 'lucide-react';
import AnimatedSection from '@/app/components/shared/AnimatedSection';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { WHY_CHOOSE_US } from '@/app/lib/data';

const ICON_MAP: Record<string, React.ElementType> = {
  IndianRupee, ShieldCheck, Users, Clock, MessageSquare, ThumbsUp,
};

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-dark via-[#1A3D4F] to-dark"
    >
      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 bg-[radial-gradient(circle,#1A6B7C,transparent)]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 translate-y-1/2 -translate-x-1/2 bg-[radial-gradient(circle,#D4813A,transparent)]" />

      <div className="relative w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <AnimatedSection>
          <SectionHeader
            badge="Why GRN"
            title="Why Choose"
            highlight="Us?"
            description="We deliver more than construction - we deliver trust, quality, and a partnership that lasts beyond project completion."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || ShieldCheck;
            const isEven = index % 2 === 0;

            return (
              <AnimatedSection key={item.id} delay={index * 0.08} variant="scale">
                <motion.div
                  className="group p-8 rounded-3xl border cursor-default h-full transition-all duration-300 bg-white/5 border-white/10 backdrop-blur-md"
                  whileHover={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: isEven ? 'rgba(26,107,124,0.5)' : 'rgba(212,129,58,0.5)',
                    y: -4,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Icon with number */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 border ${
                        isEven
                          ? 'bg-gradient-to-br from-primary/30 to-primary/15 border-primary/30'
                          : 'bg-gradient-to-br from-secondary/30 to-secondary/15 border-secondary/30'
                      }`}
                    >
                      <IconComponent
                        size={22}
                        className={isEven ? 'text-primary-light' : 'text-secondary-light'}
                        strokeWidth={1.8}
                      />
                    </div>
                    <span
                      className={`text-4xl font-bold font-display opacity-15 select-none mt-1 ${isEven ? 'text-primary' : 'text-secondary'}`}
                    >
                      0{item.id}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2 font-display group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.5}>
          <div className="mt-14 text-center">
            <p className="text-white/60 text-base mb-5">
              Ready to start your construction journey with us?
            </p>
            <a
              href="tel:+919344185614"
              className="inline-flex items-center gap-2.5 px-8 py-4 sm:py-5 rounded-2xl text-white font-bold text-lg shadow-[0_8px_32px_rgba(212,129,58,0.35)] hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-secondary to-secondary-light"
            >
              Get a Free Consultation
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
