import React from 'react';

export function FeaturedReviewSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full rounded-3xl bg-white border-2 border-primary/10 p-6 sm:p-8 lg:p-9 shadow-sm animate-pulse min-h-[380px]">
      <div>
        {/* Badge & time */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-6 bg-primary/10 rounded-full" />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gray-200 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="w-40 h-5 bg-gray-200 rounded" />
            <div className="w-24 h-4 bg-gray-100 rounded" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2.5 mb-6">
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-[95%] h-4 bg-gray-200 rounded" />
          <div className="w-[80%] h-4 bg-gray-200 rounded" />
          <div className="w-[60%] h-4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="w-28 h-3 bg-gray-200 rounded" />
        <div className="w-20 h-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export function SupportingReviewSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-sm animate-pulse min-h-[180px]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="space-y-1.5">
              <div className="w-28 h-4 bg-gray-200 rounded" />
              <div className="w-16 h-3 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-100" />
        </div>

        <div className="w-20 h-3 bg-gray-200 rounded mb-3" />

        <div className="space-y-2 mb-3">
          <div className="w-full h-3.5 bg-gray-200 rounded" />
          <div className="w-[85%] h-3.5 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="w-20 h-3 bg-gray-200 rounded" />
        <div className="w-16 h-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function ReviewSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-7 items-stretch">
      {/* Featured Left Skeleton (3 cols = 60%) */}
      <div className="lg:col-span-3">
        <FeaturedReviewSkeleton />
      </div>

      {/* Supporting Right Stack Skeleton (2 cols = 40%) */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <SupportingReviewSkeleton />
        <SupportingReviewSkeleton />
      </div>
    </div>
  );
}
