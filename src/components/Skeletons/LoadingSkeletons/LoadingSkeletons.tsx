interface LoadingSkeletonsProps {
  count?: number;
}

const LoadingSkeletons = ({ count = 20 }: LoadingSkeletonsProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="mb-8 grid w-full animate-pulse grid-cols-2 gap-8 px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {skeletons.map((_, idx) => (
        <div
          key={idx}
          className="relative w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-800"
        >
          <div className="aspect-[2/3] w-full bg-gray-700" />
          <div className="flex flex-col gap-3 p-4">
            <div className="h-5 w-3/4 rounded bg-gray-600"></div>
            <div className="h-3 w-1/2 rounded bg-gray-600"></div>
            <div className="h-3 w-2/3 rounded bg-gray-600"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletons;
