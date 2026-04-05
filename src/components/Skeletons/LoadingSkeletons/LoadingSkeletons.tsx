interface LoadingSkeletonsProps {
  count?: number;
}

export const LoadingSkeletons = ({ count = 20 }: LoadingSkeletonsProps) => {
  const skeletons = Array.from({ length: count });

  return (
    /* MATCHING MEDIA LIST GRID BREAKPOINTS */
    <div className="grid gap-8 w-full px-6 mb-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 animate-pulse">
      {skeletons.map((_, idx) => (
        <div
          key={idx}
          className="relative w-full rounded-lg bg-gray-800 border border-gray-700 overflow-hidden"
        >
          <div className="aspect-[2/3] w-full bg-gray-700" />
          <div className="p-4 flex flex-col gap-3">
            <div className="h-5 bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
            <div className="h-3 bg-gray-600 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
