'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ExternalLink, MessageCircle, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GoogleReview } from '@/app/lib/types/googleReviews';
import { GoogleGLogo } from './GoogleAttribution';

interface SupportingReviewCardProps {
  review: GoogleReview;
  onOpenPhoto?: (photos: GoogleReview['reviewPhotos'], index: number, reviewerName: string) => void;
  className?: string;
}

// Consistent background color for initial avatar based on reviewer name
function getAvatarBgColor(name: string): string {
  const gradients = [
    'from-teal-600 to-cyan-700',
    'from-amber-600 to-orange-700',
    'from-blue-600 to-indigo-700',
    'from-emerald-600 to-teal-700',
    'from-rose-600 to-pink-700',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

export default function SupportingReviewCard({
  review,
  onOpenPhoto,
  className = '',
}: SupportingReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const initial = (review.reviewerName || 'G').charAt(0).toUpperCase();
  const avatarGradient = getAvatarBgColor(review.reviewerName);

  const shouldTruncate = review.comment.length > 350;
  const displayText = !shouldTruncate || isExpanded
    ? review.comment
    : `${review.comment.slice(0, 350)}...`;

  return (
    <article
      className={`supporting-review-card relative flex flex-col justify-between rounded-3xl bg-white border-2 border-gray-200/90 p-6 sm:p-8 shadow-[0_4px_20px_rgba(26,107,124,0.05)] hover:shadow-[0_8px_30px_rgba(26,107,124,0.08)] transition-all duration-300 ${className}`}
    >
      {/* Decorative Large Watermark Quote Mark */}
      <span
        aria-hidden="true"
        className="absolute -top-3 right-6 text-8xl sm:text-9xl font-serif font-black text-gray-200/40 select-none pointer-events-none leading-none"
      >
        &ldquo;
      </span>

      <div>
        {/* Top Header Row: Category Badge & Date */}
        <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/90 border border-gray-200/80 text-gray-700 text-[11px] font-bold tracking-wide uppercase">
            <CheckCircle2 size={12} className="text-primary" />
            <span>Verified Client Story</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] text-gray-500 font-medium">
              {review.relativeTime || 'Recent review'}
            </span>
            <div className="p-1 rounded-full bg-gray-100/80 flex items-center justify-center" title="Google Verified">
              <GoogleGLogo size={14} />
            </div>
          </div>
        </div>

        {/* Reviewer Info Row: Avatar & Info */}
        <div className="flex items-center gap-4 sm:gap-4.5 mb-4 relative z-10">
          {/* Reviewer Avatar */}
          {review.reviewerPhoto && !imgError ? (
            <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
              <Image
                src={review.reviewerPhoto}
                alt={review.reviewerName}
                fill
                className="object-cover"
                sizes="56px"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div
              className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 bg-gradient-to-br ${avatarGradient} shadow-[0_3px_10px_rgba(0,0,0,0.08)]`}
            >
              {initial}
            </div>
          )}

          {/* Name & Stars */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-dark font-display text-base sm:text-lg truncate">
                {review.reviewerName}
              </h4>
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Verified
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    className={
                      star <= review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-dark">{review.rating}.0</span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div className="relative z-10 mb-4">
          <p className="text-[#2D3748] font-normal text-[14.5px] sm:text-[15px] leading-[1.65]">
            &ldquo;{displayText}&rdquo;
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              {isExpanded ? (
                <>
                  Read less <ChevronUp size={13} />
                </>
              ) : (
                <>
                  Read more <ChevronDown size={13} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Review Photos (if present) */}
        {review.reviewPhotos && review.reviewPhotos.length > 0 && (
          <div className="mb-4 relative z-10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Review Photos ({review.reviewPhotos.length})
            </p>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 no-scrollbar">
              {review.reviewPhotos.map((photo, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => onOpenPhoto?.(review.reviewPhotos, pIdx, review.reviewerName)}
                  className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-2xs hover:scale-105 transition-transform duration-300 cursor-pointer group"
                  aria-label={`View photo ${pIdx + 1} from ${review.reviewerName}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.label || `Photo ${pIdx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="72px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Highlight trust banner (fills space cleanly and adds value if no photos) */}
        {(!review.reviewPhotos || review.reviewPhotos.length === 0) && (
          <div className="mb-4 p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200/70 flex items-center gap-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="text-xs min-w-0">
              <p className="font-bold text-dark text-[12.5px]">100% Genuine Google Feedback</p>
              <p className="text-gray-500 text-[11.5px] mt-0.5 leading-snug">
                Review verified through Google Business Profile for GRN Construction.
              </p>
            </div>
          </div>
        )}

        {/* Owner Reply (if present) */}
        {review.ownerReply && (
          <div className="mb-4 p-3.5 rounded-2xl bg-brand-light/60 border-l-2 border-primary text-xs relative z-10">
            <div className="flex items-center gap-1 font-semibold text-primary mb-1">
              <MessageCircle size={13} />
              <span>Response from GRN Construction</span>
            </div>
            <p className="text-gray-600 leading-relaxed italic text-[12px]">
              {review.ownerReply.comment}
            </p>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between relative z-10 text-xs">
        <div className="flex items-center gap-1.5 text-gray-500 font-medium text-xs">
          <GoogleGLogo size={14} />
          <span>Google Verified Review</span>
        </div>
        {review.googleMapsUri && (
          <a
            href={review.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer"
          >
            <span>View on Google</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </article>
  );
}
