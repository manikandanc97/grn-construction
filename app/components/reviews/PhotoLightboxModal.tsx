'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GoogleReviewPhoto } from '@/app/lib/types/googleReviews';

interface PhotoLightboxModalProps {
  photos: GoogleReviewPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  reviewerName?: string;
}

export default function PhotoLightboxModal({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  reviewerName,
}: PhotoLightboxModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) onNavigate(currentIndex + 1);
    },
    [isOpen, currentIndex, photos.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Review photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      {/* Container */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 text-white transition-all duration-200 ease-out cursor-pointer"
          aria-label="Close photo modal"
        >
          <X size={24} />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-[65vh] max-h-[600px] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40">
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.label || `Photo by ${reviewerName || 'Reviewer'}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
          />
        </div>

        {/* Footer info & Controls */}
        <div className="mt-4 flex items-center justify-between w-full text-white/80 text-sm">
          <p className="truncate">
            {reviewerName ? `Uploaded by ${reviewerName}` : 'Customer Photo'}
          </p>
          <div className="flex items-center gap-3">
            <span>
              {currentIndex + 1} / {photos.length}
            </span>
            {photos.length > 1 && (
              <div className="flex gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => onNavigate(currentIndex - 1)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed text-white transition-all duration-200 ease-out cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  disabled={currentIndex === photos.length - 1}
                  onClick={() => onNavigate(currentIndex + 1)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed text-white transition-all duration-200 ease-out cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
