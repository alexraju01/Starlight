interface LoadingSkeletonsProps {
  count?: number; // Number of skeleton cards to render
}

export const LoadingSkeletons = ({ count = 20 }: LoadingSkeletonsProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid gap-8 w-full px-6 mb-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 animate-pulse">
      {skeletons.map((_, idx) => (
        <div
          key={idx}
          className="relative w-full rounded-lg bg-gray-800 border border-gray-700 overflow-hidden"
        >
          {/* Poster skeleton */}
          <div className="aspect-[0.7] w-full bg-gray-700 animate-pulse" />

          {/* Content skeleton */}
          <div className="p-4 flex flex-col gap-3">
            <div className="h-5 bg-gray-600 rounded w-3/4"></div> {/* Title */}
            <div className="h-3 bg-gray-600 rounded w-1/2"></div> {/* Date */}
            <div className="h-3 bg-gray-600 rounded w-2/3"></div> {/* Genres */}
          </div>
        </div>
      ))}
    </div>
  );
};
