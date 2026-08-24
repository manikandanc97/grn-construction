'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ExternalLink, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { GoogleReview } from '@/app/lib/types/googleReviews';
import { GoogleGLogo } from './GoogleAttribution';

interface ReviewCardProps {
  review: GoogleReview;
  onOpenPhoto?: (photos: GoogleReview['reviewPhotos'], index: number, reviewerName: string) => void;
  className?: string;
}

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }
        />
      ))}
    </div>
  );
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

export default function ReviewCard({
  review,
  onOpenPhoto,
  className = '',
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const initial = (review.reviewerName || 'G').charAt(0).toUpperCase();
  const avatarGradient = getAvatarBgColor(review.reviewerName);

  const shouldTruncate = review.comment.length > 180;
  const displayText = !shouldTruncate || isExpanded
    ? review.comment
    : `${review.comment.slice(0, 180)}...`;

  return (
    <article
      className={`review-card-item flex flex-col h-full rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-[0_4px_24px_rgba(26,107,124,0.06)] hover:shadow-[0_12px_36px_rgba(26,107,124,0.12)] transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          {review.reviewerPhoto && !imgError ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white shadow-xs">
              <Image
                src={review.reviewerPhoto}
                alt={review.reviewerName}
                fill
                className="object-cover"
                sizes="40px"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br ${avatarGradient} shadow-xs`}
            >
              {initial}
            </div>
          )}

          {/* Name & Time */}
          <div className="min-w-0">
            <h4 className="font-semibold text-dark font-display text-[14.5px] sm:text-[15px] truncate flex items-center gap-1.5">
              {review.reviewerName}
            </h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <span>{review.relativeTime || 'Recent review'}</span>
            </div>
          </div>
        </div>

        {/* Google G Logo icon */}
        <div className="p-1 rounded-full bg-gray-50 flex-shrink-0" title="Verified Google Review">
          <GoogleGLogo size={15} />
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1.5 mb-3">
        <StarRating rating={review.rating} size={14} />
      </div>

      {/* Review Body */}
      <div className="flex-grow text-gray-700 text-[13.5px] sm:text-[14px] leading-relaxed mb-3.5">
        <p className="whitespace-pre-line font-normal italic text-[#2D3748]">
          &ldquo;{displayText}&rdquo;
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1.5 text-xs font-semibold text-primary hover:text-primary-light inline-flex items-center gap-1 cursor-pointer transition-colors"
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

      {/* Review Media / Photos Strip */}
      {review.reviewPhotos && review.reviewPhotos.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-400 mb-2">Project Photos</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {review.reviewPhotos.map((photo, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => onOpenPhoto?.(review.reviewPhotos, pIdx, review.reviewerName)}
                className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 hover:opacity-90 hover:scale-105 transition-all cursor-pointer group"
                aria-label={`View photo ${pIdx + 1} from ${review.reviewerName}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.label || `Photo ${pIdx + 1} by ${review.reviewerName}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Owner Reply Box (if present) */}
      {review.ownerReply && (
        <div className="mt-auto mb-4 p-3.5 rounded-xl bg-brand-light border-l-3 border-primary text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-primary mb-1">
            <MessageCircle size={13} />
            <span>Response from GRN Construction</span>
          </div>
          <p className="text-gray-600 leading-relaxed italic">
            {review.ownerReply.comment}
          </p>
        </div>
      )}

      {/* Footer / Attribution link */}
      <div className="pt-3.5 mt-auto border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1 text-gray-500 font-medium">
          Verified Review
        </span>
        {review.googleMapsUri && (
          <a
            href={review.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer"
          >
            View on Google <ExternalLink size={12} />
          </a>
        )}
      </div>
    </article>
  );
}
