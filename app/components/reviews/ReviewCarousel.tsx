'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GoogleReview } from '@/app/lib/types/googleReviews';
import ReviewCard from './ReviewCard';

interface ReviewCarouselProps {
  reviews: GoogleReview[];
  onOpenPhoto?: (photos: GoogleReview['reviewPhotos'], index: number, reviewerName: string) => void;
}

export default function ReviewCarousel({ reviews, onOpenPhoto }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage));
  const safeCurrentIndex = Math.min(currentIndex, Math.max(0, totalPages - 1));

  const prev = useCallback(() => {
    setCurrentIndex((prevIdx) => (prevIdx > 0 ? prevIdx - 1 : totalPages - 1));
  }, [totalPages]);

  const next = useCallback(() => {
    setCurrentIndex((prevIdx) => (prevIdx < totalPages - 1 ? prevIdx + 1 : 0));
  }, [totalPages]);

  // Touch swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  };

  if (reviews.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Google Customer Reviews Carousel"
    >
      {/* Carousel Track Wrapper */}
      <div className="overflow-hidden py-2 px-1">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${safeCurrentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIdx) => {
            const pageReviews = reviews.slice(
              pageIdx * itemsPerPage,
              (pageIdx + 1) * itemsPerPage
            );

            return (
              <div
                key={pageIdx}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1"
                aria-hidden={pageIdx !== safeCurrentIndex}
              >
                {pageReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onOpenPhoto={onOpenPhoto}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Indicators */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 max-w-sm mx-auto">
          {/* Previous Button */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === safeCurrentIndex
                    ? 'w-7 bg-gradient-to-r from-primary to-primary-light shadow-xs'
                    : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to page ${dotIdx + 1} of reviews`}
                aria-current={dotIdx === safeCurrentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Next reviews"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
