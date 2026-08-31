'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ExternalLink, MessageCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { GoogleReview } from '@/app/lib/types/googleReviews';
import { GoogleGLogo } from './GoogleAttribution';

interface FeaturedReviewCardProps {
  review: GoogleReview;
  onOpenPhoto?: (photos: GoogleReview['reviewPhotos'], index: number, reviewerName: string) => void;
  className?: string;
}

// Generate consistent background color for initial avatar based on reviewer name
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

export default function FeaturedReviewCard({
  review,
  onOpenPhoto,
  className = '',
}: FeaturedReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const initial = (review.reviewerName || 'G').charAt(0).toUpperCase();
  const avatarGradient = getAvatarBgColor(review.reviewerName);

  // For featured review, allow a generous excerpt before truncation if long
  const shouldTruncate = review.comment.length > 360;
  const displayText = !shouldTruncate || isExpanded
    ? review.comment
    : `${review.comment.slice(0, 360)}...`;

  return (
    <article
      className={`featured-review-card relative flex flex-col justify-between min-h-[260px] rounded-3xl bg-gradient-to-br from-white via-brand-light/20 to-white border-2 border-primary/20 p-6 sm:p-8 lg:p-8.5 shadow-[0_10px_35px_rgba(26,107,124,0.07)] transition-all duration-300 ${className}`}
    >
      {/* Decorative Large Watermark Quote Mark */}
      <span
        aria-hidden="true"
        className="absolute -top-3 right-6 text-8xl sm:text-9xl font-serif font-black text-primary/10 select-none pointer-events-none leading-none"
      >
        &ldquo;
      </span>

      <div>
        {/* Top Header Row: Latest Badge & Date */}
        <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-wide uppercase">
            <Sparkles size={12} className="text-secondary" />
            <span>Latest Client Review</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] text-gray-500 font-medium">
              {review.relativeTime || 'Recent review'}
            </span>
            <div className="p-1 rounded-full bg-gray-100/80 flex items-center justify-center" title="Google Verified">
              <GoogleGLogo size={15} />
            </div>
          </div>
        </div>

        {/* Reviewer Info Row: Large Avatar & Info */}
        <div className="flex items-center gap-4 sm:gap-4.5 mb-5 relative z-10">
          {/* Prominent Reviewer Photo */}
          {review.reviewerPhoto && !imgError ? (
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
              <Image
                src={review.reviewerPhoto}
                alt={review.reviewerName}
                fill
                className="object-cover"
                sizes="64px"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl flex-shrink-0 bg-gradient-to-br ${avatarGradient} shadow-[0_4px_14px_rgba(0,0,0,0.12)]`}
            >
              {initial}
            </div>
          )}

          {/* Name, Verified Status & Stars */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-dark font-display text-lg sm:text-xl truncate">
                {review.reviewerName}
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Verified
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
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

        {/* Large Readable Review Text: 15px, line-height 1.6 */}
        <div className="relative z-10 mb-5">
          <p className="text-[#2D3748] font-normal text-[15px] leading-[1.6]">
            &ldquo;{displayText}&rdquo;
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1 cursor-pointer transition-all duration-150 active:opacity-80"
            >
              {isExpanded ? (
                <>
                  Read less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Read full review <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Review Media / Photos: Shown below with subtle hover scale */}
        {review.reviewPhotos && review.reviewPhotos.length > 0 && (
          <div className="mb-5 relative z-10">
            <p className="text-xs font-semibold text-neutral-600 mb-2">
              Review Photos ({review.reviewPhotos.length})
            </p>
            <div className="flex items-center gap-3 overflow-x-auto pb-1.5 no-scrollbar">
              {review.reviewPhotos.map((photo, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => onOpenPhoto?.(review.reviewPhotos, pIdx, review.reviewerName)}
                  className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ease-out cursor-pointer group"
                  aria-label={`View photo ${pIdx + 1} from ${review.reviewerName}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.label || `Project photo ${pIdx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="88px"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Owner Reply Box (if present) */}
        {review.ownerReply && (
          <div className="mb-5 p-4 rounded-2xl bg-white/80 border border-primary/15 shadow-xs relative z-10 text-xs sm:text-[13px]">
            <div className="flex items-center gap-1.5 font-bold text-primary mb-1.5">
              <MessageCircle size={14} />
              <span>Response from GRN Construction</span>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              {review.ownerReply.comment}
            </p>
          </div>
        )}
      </div>

      {/* Footer Attribution Row */}
      <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <GoogleGLogo size={15} />
          <span>Google Verified Review</span>
        </div>

        {review.googleMapsUri && (
          <a
            href={review.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-semibold text-primary hover:text-primary-dark transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <span>View on Google</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
}
