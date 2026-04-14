const GenreHeaderSkeleton = () => {
  return (
    <div className="animate-pulse border-b border-white/5 px-6 py-16">
      <div className="mx-6 mt-20 lg:mx-[68px]">
        {/* Title Skeleton */}
        <div className="h-10 w-1/3 rounded bg-gray-700 md:h-14" />

        {/* Description Skeleton */}
        <div className="mt-4 h-4 w-1/4 rounded bg-gray-600" />
      </div>
    </div>
  );
};

export default GenreHeaderSkeleton;
