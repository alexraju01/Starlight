const GenreHeaderSkeleton = () => {
  return (
    <div className="border-b border-white/5 px-6 py-16 animate-pulse">
      <div className="mx-6 lg:mx-[68px] mt-20">
        {/* Title Skeleton */}
        <div className="h-10 md:h-14 bg-gray-700 rounded w-1/3" />

        {/* Description Skeleton */}
        <div className="mt-4 h-4 bg-gray-600 rounded w-1/4" />
      </div>
    </div>
  );
};

export default GenreHeaderSkeleton;
