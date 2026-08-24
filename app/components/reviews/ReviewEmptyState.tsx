import { ExternalLink, Edit3 } from 'lucide-react';
import { GoogleReviewSummary } from '@/app/lib/types/googleReviews';
import { GoogleGLogo } from './GoogleAttribution';

interface ReviewEmptyStateProps {
  summary: GoogleReviewSummary;
}

export default function ReviewEmptyState({ summary }: ReviewEmptyStateProps) {
  return (
    <div className="max-w-2xl mx-auto rounded-[24px] bg-gradient-to-br from-brand-light to-white p-8 md:p-12 text-center border border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-5 shadow-xs">
        <GoogleGLogo size={32} />
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-dark font-display mb-3">
        See What Our Clients Say on Google
      </h3>

      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
        GRN Construction is proud to maintain a <strong>{summary.rating.toFixed(1)} / 5.0 rating</strong> across{' '}
        <strong>{summary.reviewCount}+ Google reviews</strong>. Explore our client testimonials directly on Google Maps or share your experience with us.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={summary.writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium text-sm shadow-[0_4px_16px_rgba(26,107,124,0.25)] hover:shadow-[0_6px_20px_rgba(26,107,124,0.35)] transition-all cursor-pointer"
        >
          <Edit3 size={16} />
          <span>Write a Review on Google</span>
        </a>

        <a
          href={summary.viewAllReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-dark border border-gray-200 hover:border-gray-300 font-medium text-sm shadow-xs transition-all cursor-pointer"
        >
          <span>View All Google Reviews</span>
          <ExternalLink size={15} className="text-gray-500" />
        </a>
      </div>
    </div>
  );
}
