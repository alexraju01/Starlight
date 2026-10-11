interface LoadingSkeletonsProps {
  count?: number;
}

const bar = 'animate-pulse rounded-[6px] bg-white/[0.07]';

/** Placeholder grid shaped like the media cards (same columns and gaps as MovieGrid). */
const LoadingSkeletons = ({ count = 20 }: LoadingSkeletonsProps) => (
  <div
    role="status"
    aria-label="Loading"
    className="grid w-full grid-cols-2 gap-x-[16px] gap-y-[24px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-[24px] lg:gap-y-[32px] xl:grid-cols-5 2xl:grid-cols-6"
  >
    {Array.from({ length: count }, (_, idx) => (
      <div
        key={idx}
        className="border-card-stroke bg-card-bg rounded-[10.92px] border px-[12px] pt-[12px] pb-[20px]"
      >
        <div className={`${bar} aspect-[2/3] rounded-[10.92px]`} />
        <div className={`${bar} mt-[20px] h-[14px] w-3/4`} />
        <div className={`${bar} mt-[12px] h-[12px] w-1/2`} />
      </div>
    ))}
  </div>
);

export default LoadingSkeletons;
