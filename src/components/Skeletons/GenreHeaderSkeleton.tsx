const bar = 'animate-pulse rounded-[8px] bg-white/[0.07]';

/** Placeholder for the genre page hero + filter bar. */
const GenreHeaderSkeleton = () => (
  <div aria-hidden="true">
    <div className="page-gutter flex flex-col gap-[12px] pt-[24px] pb-[32px] sm:pt-[32px] lg:min-h-[340px] lg:justify-end lg:pt-[56px] lg:pb-[48px]">
      <div className={`${bar} h-[20px] w-[96px]`} />
      <div className={`${bar} h-[40px] w-[220px] lg:h-[60px] lg:w-[320px]`} />
      <div className={`${bar} h-[16px] w-[280px] max-w-full`} />
    </div>
    <div className="border-y border-white/[0.06] py-[16px]">
      <div className="page-gutter flex justify-between gap-[12px]">
        <div className={`${bar} h-[46px] w-[260px] rounded-[10px]`} />
        <div className={`${bar} hidden h-[46px] w-[300px] rounded-[10px] sm:block`} />
      </div>
    </div>
  </div>
);

export default GenreHeaderSkeleton;
