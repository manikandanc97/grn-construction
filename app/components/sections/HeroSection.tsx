'use client';

import { motion, type Variants } from 'framer-motion';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import StatCounter from '@/app/components/shared/StatCounter';
import { COMPANY } from '@/app/lib/constants';
import { STATS } from '@/app/lib/data';

const containerClass = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16';
const buttonBaseClass =
  'inline-flex min-h-12 lg:min-h-[52px] items-center justify-center gap-2 sm:gap-3 rounded-[14px] px-6 py-3 sm:px-8 sm:py-4 font-semibold transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:-translate-y-1';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85')] bg-cover bg-center bg-no-repeat"
      />

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,25,35,0.92)_0%,rgba(26,107,124,0.75)_50%,rgba(15,25,35,0.90)_100%)]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,35,0.5)_0%,transparent_40%,rgba(15,25,35,0.8)_100%)]"
      />

      {/* Animated background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(255,255,255,0.3)_60px,rgba(255,255,255,0.3)_61px),repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(255,255,255,0.3)_60px,rgba(255,255,255,0.3)_61px)]"
        />
      </div>

      {/* Content */}
      <div className={`${containerClass} relative z-10 max-w-6xl pt-24 pb-32 text-center`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center text-center justify-center flex-wrap gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase border border-white/20 text-white/90 bg-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse shrink-0" />
              Udumalpet&apos;s Trusted Builders Since 2014
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-[42px] md:text-[60px] lg:text-[72px] font-bold text-white font-display leading-[1.1] mb-8"
          >
            Building Dreams
            <br />
            <span className="bg-gradient-to-br from-secondary via-secondary-light to-[#F5A865] bg-clip-text text-transparent">
              Into Reality
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-[18px] md:text-[20px] lg:text-[22px] text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Professional Construction, Interior Design &amp; Renovation Services
            in Udumalpet, Tamil Nadu. Quality you can trust, delivered on time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-12 sm:mb-16 w-full max-w-[280px] sm:max-w-none mx-auto"
          >
            <a
              href={COMPANY.callLink}
              className={`${buttonBaseClass} w-full bg-gradient-to-br from-secondary to-secondary-light text-base sm:text-[18px] text-white shadow-[0_8px_24px_rgba(212,129,58,0.25)] hover:shadow-[0_12px_32px_rgba(212,129,58,0.35)] sm:w-auto`}
            >
              <Phone className="w-4 h-4 sm:w-[22px] sm:h-[22px]" />
              Call Now
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`${buttonBaseClass} w-full border-2 border-white/30 text-base sm:text-[18px] text-white backdrop-blur hover:border-white/50 hover:bg-white/10 sm:w-auto`}
            >
              <MessageCircle className="w-4 h-4 sm:w-[22px] sm:h-[22px]" />
              Get Free Quote
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/[0.08] p-3 sm:p-4 backdrop-blur-sm"
              >
                <span className="text-[32px] md:text-[40px] font-bold text-white font-display">
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </span>
                <span className="text-white/60 text-sm mt-2 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
