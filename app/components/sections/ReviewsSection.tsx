'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { Edit3, ArrowRight, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { gsap, EASING, prefersReducedMotion } from '@/app/lib/animations/gsap';
import { COMPANY } from '@/app/lib/constants';
import { GoogleReview, GoogleReviewPhoto, GoogleReviewSummary, ReviewsApiResponse } from '@/app/lib/types/googleReviews';
import ReviewSummary from '@/app/components/reviews/ReviewSummary';
import FeaturedReviewCard from '@/app/components/reviews/FeaturedReviewCard';
import SupportingReviewCard from '@/app/components/reviews/SupportingReviewCard';
import ReviewSectionSkeleton from '@/app/components/reviews/ReviewSkeleton';
import ReviewEmptyState from '@/app/components/reviews/ReviewEmptyState';
import PhotoLightboxModal from '@/app/components/reviews/PhotoLightboxModal';

const DEFAULT_SUMMARY: GoogleReviewSummary = {
  rating: COMPANY.rating || 4.9,
  reviewCount: COMPANY.reviewCount || 41,
  businessName: COMPANY.name || 'GRN Construction',
  businessAddress: COMPANY.address.full,
  writeReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || COMPANY.reviewUrl || COMPANY.mapUrl,
  viewAllReviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || COMPANY.mapUrl,
  isConnected: false,
  source: 'fallback',
  lastFetched: new Date().toISOString(),
};

export default function ReviewsSection() {
  const [summary, setSummary] = useState<GoogleReviewSummary>(DEFAULT_SUMMARY);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [supportingPageIndex, setSupportingPageIndex] = useState(0);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<GoogleReviewPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxReviewer, setLightboxReviewer] = useState<string>('');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Fetch reviews from server API
  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ReviewsApiResponse = await res.json();

        if (isMounted) {
          if (data.summary) {
            setSummary(data.summary);
          }
          if (data.reviews && Array.isArray(data.reviews)) {
            setReviews(data.reviews);
          }
        }
      } catch (err) {
        console.warn('[ReviewsSection] Could not load live Google reviews, using fallback state:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  // Ensure reviews are strictly sorted by latest date (latest review MUST remain first)
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      if (isNaN(timeA) || isNaN(timeB)) return 0;
      return timeB - timeA;
    });
  }, [reviews]);

  const featuredReview = sortedReviews.length > 0 ? sortedReviews[0] : null;
  const remainingReviews = sortedReviews.length > 1 ? sortedReviews.slice(1) : [];

  // 1 supporting review per page (slide one by one)
  const supportingPageSize = 1;
  const totalSupportingPages = remainingReviews.length;
  const currentSupportingReviews = remainingReviews.slice(
    supportingPageIndex,
    supportingPageIndex + 1
  );

  // GSAP Entrance Animations
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set(
          [headerRef.current, summaryRef.current, contentRef.current, ctaRef.current],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        defaults: { ease: EASING.power3Out },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0
        );
      }

      if (summaryRef.current) {
        tl.fromTo(
          summaryRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.15
        );
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.25
        );

        // Animate featured card (fade + y)
        const featuredCard = contentRef.current.querySelector('.featured-review-card');
        if (featuredCard) {
          tl.fromTo(
            featuredCard,
            { opacity: 0, y: 25, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 },
            0.3
          );
        }

        // Animate supporting cards with stagger
        const supportingCards = contentRef.current.querySelectorAll('.supporting-review-card');
        if (supportingCards.length > 0) {
          tl.fromTo(
            supportingCards,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
            0.4
          );
        }
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.55
        );
      }
    },
    { scope: sectionRef, dependencies: [isLoading, reviews.length] }
  );

  const handleOpenPhoto = (
    photos: GoogleReview['reviewPhotos'] | undefined,
    index: number,
    reviewerName: string
  ) => {
    if (!photos || photos.length === 0) return;
    setLightboxPhotos(photos);
    setLightboxIndex(index);
    setLightboxReviewer(reviewerName);
    setLightboxOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-12 md:py-14 lg:py-16 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-radial from-primary/[0.04] via-transparent to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="opacity-0 mb-5 sm:mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-sm backdrop-blur-sm">
            <MessageSquareQuote size={12} className="text-secondary shrink-0" />
            <span>CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-dark font-display leading-[1.18] tracking-tight">
            What Our Clients{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
              Say About Us.
            </span>
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Real feedback and verified reviews from homeowners and clients who trusted GRN Construction for their dream spaces.
          </p>
        </div>

        {/* Rating Header */}
        <div ref={summaryRef} className="opacity-0">
          <ReviewSummary summary={summary} />
        </div>

        {/* Reviews Layout: 2 equal balanced cards side-by-side on desktop */}
        <div ref={contentRef} className="opacity-0 min-h-[300px]">
          {isLoading ? (
            <ReviewSectionSkeleton />
          ) : sortedReviews.length > 0 && featuredReview ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
              {/* Featured Latest Review (Left Column) */}
              <div className="flex">
                <FeaturedReviewCard
                  review={featuredReview}
                  onOpenPhoto={handleOpenPhoto}
                  className="w-full"
                />
              </div>

              {/* Supporting Reviews Carousel (Right Column) */}
              <div className="flex flex-col gap-2.5">
                {/* Header for Supporting Reviews with Pagination Controls (if more than 1 supporting review) */}
                {remainingReviews.length > 1 && (
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      More Stories ({supportingPageIndex + 1} of {remainingReviews.length})
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          setSupportingPageIndex((prev) =>
                            prev > 0 ? prev - 1 : remainingReviews.length - 1
                          )
                        }
                        className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-slate-50 hover:border-primary/50 text-gray-600 hover:text-primary flex items-center justify-center transition-all duration-200 ease-out cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                        aria-label="Previous review"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() =>
                          setSupportingPageIndex((prev) =>
                            prev < remainingReviews.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:bg-slate-50 hover:border-primary/50 text-gray-600 hover:text-primary flex items-center justify-center transition-all duration-200 ease-out cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                        aria-label="Next review"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Supporting Card Container: 1 review at a time */}
                {currentSupportingReviews.length > 0 ? (
                  <div className="flex-1 flex flex-col">
                    {currentSupportingReviews.map((review) => (
                      <SupportingReviewCard
                        key={review.id}
                        review={review}
                        onOpenPhoto={handleOpenPhoto}
                        className="h-full"
                      />
                    ))}
                  </div>
                ) : (
                  /* Fallback if only 1 review exists */
                  <div className="h-full rounded-xl border border-dashed border-gray-200 p-5 flex flex-col items-center justify-center text-center bg-white/70">
                    <p className="text-xs text-gray-500 mb-2">
                      More reviews from verified homeowners are available on Google Maps.
                    </p>
                    <a
                      href={summary.viewAllReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 group transition-colors"
                    >
                      <span>Read all on Google</span>
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <ReviewEmptyState summary={summary} />
          )}
        </div>
      </div>

      {/* Review Photo Lightbox Modal */}
      <PhotoLightboxModal
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        reviewerName={lightboxReviewer}
      />
    </section>
  );
}
