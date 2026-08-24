'use client';

import { Star, Edit3, ExternalLink } from 'lucide-react';
import { GoogleReviewSummary } from '@/app/lib/types/googleReviews';
import { GoogleGLogo } from './GoogleAttribution';

interface ReviewSummaryProps {
  summary: GoogleReviewSummary;
}

export default function ReviewSummary({ summary }: ReviewSummaryProps) {
  const ratingFormatted = (summary.rating || 4.9).toFixed(1);
  const reviewCount = summary.reviewCount || 41;

  return (
    <div className="w-full max-w-[900px] mx-auto mb-10 sm:mb-12">
      {/* Wider Horizontal Rating Block (Max-width: 900px) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-[0_4px_24px_rgba(26,107,124,0.06)] hover:shadow-[0_8px_32px_rgba(26,107,124,0.09)] transition-all duration-300">
        {/* Left: Google Trust & Rating */}
        <div className="flex items-center gap-4 sm:gap-5 flex-wrap sm:flex-nowrap justify-center sm:justify-start text-center sm:text-left">
          <div className="w-13 h-13 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-xs">
            <GoogleGLogo size={28} />
          </div>

          <div className="flex items-center gap-3.5">
            <span className="text-3xl sm:text-[36px] font-bold text-dark font-display tracking-tight leading-none">
              {ratingFormatted}
            </span>
            <div className="flex flex-col items-start">
              <div className="flex gap-1" aria-label={`${ratingFormatted} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={17}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-[13.5px] text-gray-600 font-medium mt-1">
                <strong className="text-dark font-semibold">{reviewCount}+</strong> Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Right: Clean Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <a
            href={summary.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary hover:bg-primary-dark active:scale-98 text-white text-xs sm:text-[13.5px] font-semibold shadow-[0_2px_10px_rgba(26,107,124,0.25)] hover:shadow-[0_4px_14px_rgba(26,107,124,0.35)] transition-all cursor-pointer"
          >
            <Edit3 size={14} />
            <span>Write a Review</span>
          </a>

          <a
            href={summary.viewAllReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gray-50 hover:bg-gray-100 text-dark border border-gray-200 hover:border-gray-300 text-xs sm:text-[13.5px] font-medium transition-all cursor-pointer active:scale-98"
          >
            <span>View on Google</span>
            <ExternalLink size={13} className="text-gray-500" />
          </a>
        </div>
      </div>
    </div>
  );
}
