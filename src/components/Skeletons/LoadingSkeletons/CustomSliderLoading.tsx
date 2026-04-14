import React from 'react';

const SkeletonCard = () => (
  <div className="aspect-[2/3] w-full animate-pulse rounded-lg bg-[#1f1f1f]" />
);

export default function CustomSliderSkeleton() {
  return (
    <div className="mb-10 flex w-full flex-col gap-[18px] py-6 text-white">
      {/* Title and nav buttons */}
      <div className="flex items-center justify-between">
        <div className="block h-[1.6em] w-[200px] animate-pulse rounded bg-gray-700" />
        <div className="flex gap-2.5 px-4 py-2">
          <div className="h-9 w-9 animate-pulse rounded-full bg-[#2a2a2a]" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-[#2a2a2a]" />
        </div>
      </div>

      {/* Slider Track with padding and scroll safety */}
      <div className="relative w-full px-3 sm:px-6">
        <div className="flex gap-[16px] overflow-x-hidden">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-[calc(50%-8px)] flex-shrink-0 sm:w-[calc(33.333%-10.67px)] md:w-[calc(25%-12px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-12.8px)] 2xl:w-[calc(16.666%-13.33px)]`}
            >
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
