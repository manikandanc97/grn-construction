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
    <div className="w-full max-w-[840px] mx-auto mb-6 sm:mb-7">
      {/* Wider Horizontal Rating Block */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xs hover:shadow-sm transition-all duration-300">
        {/* Left: Google Trust & Rating */}
        <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap sm:flex-nowrap justify-center sm:justify-start text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-xs">
            <GoogleGLogo size={22} />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-[28px] font-bold text-dark font-display tracking-tight leading-none">
              {ratingFormatted}
            </span>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5" aria-label={`${ratingFormatted} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs text-gray-600 font-medium mt-0.5">
                <strong className="text-dark font-semibold">{reviewCount}+</strong> Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Right: Clean Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
          <a
            href={summary.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-primary hover:bg-primary-dark active:scale-98 text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <Edit3 size={13} />
            <span>Write a Review</span>
          </a>

          <a
            href={summary.viewAllReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-dark border border-gray-200 hover:border-gray-300 text-xs font-medium transition-all cursor-pointer active:scale-98"
          >
            <span>View on Google</span>
            <ExternalLink size={12} className="text-gray-500" />
          </a>
        </div>
      </div>
    </div>
  );
}
