const bar = 'animate-pulse rounded-[8px] bg-white/[0.07]';

/** Placeholder for the genres index: a section heading and a grid of artwork tiles. */
export default function GenreSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading genres" className="flex flex-col gap-[20px]">
      <div className={`${bar} h-[26px] w-[180px]`} />
      <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 sm:gap-[16px] lg:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={`${bar} aspect-[16/10] rounded-[14px]`} />
        ))}
      </div>
    </div>
  );
}
