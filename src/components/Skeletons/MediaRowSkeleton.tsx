import { skeleton as bar } from './skeleton';

/** Placeholder for a media row: heading + a page of poster cards (widths follow MEDIA_COLUMNS). */
export default function MediaRowSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-[16px] lg:gap-[20px]">
      <div className="flex items-center justify-between">
        <div className={`${bar} h-[26px] w-[200px]`} />
        <div className="hidden gap-[8px] sm:flex">
          <div className={`${bar} size-[40px] rounded-full lg:size-[44px]`} />
          <div className={`${bar} size-[40px] rounded-full lg:size-[44px]`} />
        </div>
      </div>
      <div className="flex gap-[16px] overflow-hidden">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="border-card-stroke bg-card-bg w-[calc((100%-16px)/2)] shrink-0 rounded-[10.92px] border p-[12px] sm:w-[calc((100%-32px)/3)] md:w-[calc((100%-48px)/4)] xl:w-[calc((100%-64px)/5)] 2xl:w-[calc((100%-80px)/6)]"
          >
            <div className={`${bar} aspect-[2/3] rounded-[10.92px]`} />
            <div className={`${bar} mt-[16px] h-[14px] w-3/4`} />
            <div className={`${bar} mt-[10px] h-[12px] w-1/2`} />
          </div>
        ))}
      </div>
    </div>
  );
}
