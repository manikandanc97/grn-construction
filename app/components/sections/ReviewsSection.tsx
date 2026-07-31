'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AnimatedSection from '@/app/components/shared/AnimatedSection';
import SectionHeader from '@/app/components/shared/SectionHeader';
import { REVIEWS } from '@/app/lib/data';
import { COMPANY } from '@/app/lib/constants';

const containerClass = 'mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + REVIEWS.length) % REVIEWS.length);
  };

  const variants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section id="reviews" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection>
          <SectionHeader
            badge="Testimonials"
            title="What Our"
            highlight="Clients Say"
            description="Real feedback from real clients. Our 4.9 Google rating speaks for the quality we deliver consistently."
          />
        </AnimatedSection>

        {/* Google Rating Badge */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-6 px-10 py-6 rounded-[20px] bg-gradient-to-br from-[#F8F5F0] to-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-200">
              {/* Google G */}
              <div className="font-serif text-4xl font-bold text-[#4285F4]">
                G
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[40px] font-bold text-dark font-display">
                    {COMPANY.rating}
                  </span>
                  <Star size={22} className="fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-gray-500 text-[14px]">
                  Based on <strong className="text-dark">{COMPANY.reviewCount}</strong> Google reviews
                </p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-[14px]">Excellent Rating</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Main Carousel */}
        <AnimatedSection delay={0.2}>
          <div className="relative max-w-3xl mx-auto">
            {/* Big Quote */}
            <div className="absolute -top-4 -left-4 opacity-10 z-0">
              <Quote size={80} className="text-primary" />
            </div>

            {/* Card */}
            <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 lg:p-12 bg-gradient-to-br from-[#F8F5F0] to-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] border border-primary/10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-dark text-[18px] md:text-[22px] lg:text-[24px] leading-relaxed mb-10 italic">
                    &ldquo;{REVIEWS[current].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-[22px] flex-shrink-0 bg-gradient-to-br from-primary to-primary-light">
                      {REVIEWS[current].initial}
                    </div>
                    <div>
                      <p className="font-bold text-[20px] text-dark font-display">
                        {REVIEWS[current].name}
                      </p>
                      <p className="text-gray-500 text-[16px]">
                        {REVIEWS[current].location} - {REVIEWS[current].date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-all hover:shadow-md"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-6 bg-gradient-to-r from-primary to-primary-light'
                        : 'w-2 bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-all hover:shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Mini Cards Row */}
        <AnimatedSection delay={0.3}>
          <div className="hidden md:grid grid-cols-3 gap-4 mt-10">
            {REVIEWS.slice(0, 3).map((review, index) => (
              <button
                key={review.id}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`flex h-full cursor-pointer flex-col rounded-[20px] border p-6 text-left transition-all duration-300 hover:shadow-xl lg:p-8 ${
                  current === index
                    ? 'border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-[0_4px_16px_rgba(26,107,124,0.12)]'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <StarRating rating={review.rating} />
                <p className="text-gray-600 text-[16px] mt-6 mb-6 line-clamp-3 leading-relaxed italic flex-grow">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-auto pt-5 border-t border-gray-100 w-full">
                  <p className="text-dark font-bold text-[18px] font-display">{review.name}</p>
                </div>
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
