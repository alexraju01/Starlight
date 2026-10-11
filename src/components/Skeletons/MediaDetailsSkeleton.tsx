const block = 'animate-pulse rounded-[8px] bg-white/[0.07]';

/** Placeholder for a row of portrait cards (cast, seasons). */
export function CardRowSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="flex flex-col gap-[20px]">
      <div className={`${block} h-[26px] w-[160px]`} />
      <div className="flex gap-[16px] overflow-hidden">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="w-[124px] shrink-0 sm:w-[140px] lg:w-[152px]">
            <div className={`${block} aspect-[2/3] rounded-[12px]`} />
            <div className={`${block} mt-[10px] h-[14px] w-4/5`} />
            <div className={`${block} mt-[6px] h-[12px] w-3/5`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mirrors the details page hero so the layout doesn't jump when the data arrives. */
export default function MediaDetailsSkeleton() {
  return (
    <div role="status" aria-live="polite" className="pb-[64px]">
      <span className="sr-only">Loading…</span>

      <div className="relative lg:flex lg:min-h-[min(820px,calc(100svh-var(--nav-h)))] lg:items-end">
        <div className="aspect-[16/10] w-full animate-pulse bg-white/[0.04] sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto" />
        <div className="page-gutter relative -mt-[72px] w-full sm:-mt-[96px] lg:mt-0 lg:pt-[96px] lg:pb-[64px]">
          <div className="grid grid-cols-[112px_minmax(0,1fr)] items-end gap-x-[16px] gap-y-[20px] sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-x-[24px] lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-x-[48px] lg:gap-y-[24px] 2xl:grid-cols-[300px_minmax(0,1fr)]">
            <div
              className={`${block} aspect-[2/3] rounded-[12px] lg:row-span-2 lg:rounded-[16px]`}
            />
            <div className="flex flex-col gap-[12px]">
              <div className={`${block} h-[18px] w-[64px]`} />
              <div className={`${block} h-[28px] w-4/5 lg:h-[56px]`} />
            </div>
            <div className="col-span-2 flex flex-col gap-[20px] lg:col-span-1 lg:col-start-2">
              <div className={`${block} h-[18px] w-[260px] max-w-full`} />
              <div className="flex gap-[8px]">
                {[72, 96, 64].map((w) => (
                  <div key={w} className={`${block} h-[32px] rounded-full`} style={{ width: w }} />
                ))}
              </div>
              <div className="flex max-w-[68ch] flex-col gap-[10px]">
                <div className={`${block} h-[14px] w-full`} />
                <div className={`${block} h-[14px] w-full`} />
                <div className={`${block} h-[14px] w-2/3`} />
              </div>
              <div className="flex flex-col gap-[12px] sm:flex-row">
                <div className={`${block} h-[52px] rounded-[10px] sm:w-[190px]`} />
                <div className={`${block} h-[52px] rounded-[10px] sm:w-[180px]`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-gutter mt-[40px] lg:mt-[56px]">
        <CardRowSkeleton />
      </div>
    </div>
  );
}
