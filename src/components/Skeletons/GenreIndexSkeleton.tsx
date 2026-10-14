import { skeleton as bar } from './skeleton';

/** Placeholder for the genres index: spotlight hero, mood bar and the first mood section. */
export default function GenreIndexSkeleton() {
  return (
    <div role="status" aria-label="Loading genres">
      <div className="flex min-h-[560px] items-end bg-white/[0.02] lg:min-h-[min(720px,calc(100svh-var(--nav-h)))]">
        <div className="page-gutter w-full pb-[40px] lg:pb-[64px]">
          <div className={`${bar} h-[14px] w-[72px]`} />
          <div className={`${bar} mt-[16px] h-[44px] w-[min(520px,90%)] lg:h-[72px]`} />
          <div className="mt-[28px] flex flex-wrap gap-[8px]">
            {[96, 140, 96, 92, 104, 112].map((w, i) => (
              <div key={i} className={`${bar} h-[40px] rounded-full`} style={{ width: w }} />
            ))}
          </div>
          <div className="mt-[24px] flex gap-[12px]">
            <div className={`${bar} h-[52px] w-[190px] rounded-[10px]`} />
            <div className={`${bar} h-[52px] w-[160px] rounded-[10px]`} />
          </div>
        </div>
      </div>
      <div className="border-y border-white/[0.06] py-[14px]">
        <div className="page-gutter flex gap-[8px]">
          {[150, 100, 130, 120, 120, 130].map((w, i) => (
            <div key={i} className={`${bar} h-[36px] shrink-0 rounded-full`} style={{ width: w }} />
          ))}
        </div>
      </div>
      <div className="page-gutter grid gap-[20px] pt-[40px] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-[48px] lg:pt-[64px]">
        <div>
          <div className={`${bar} h-[30px] w-[200px]`} />
          <div className={`${bar} mt-[12px] h-[14px] w-[220px]`} />
        </div>
        <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 sm:gap-[16px]">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={`${bar} aspect-[4/3] rounded-[16px]`} />
          ))}
        </div>
      </div>
    </div>
  );
}
