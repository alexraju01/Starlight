import { skeleton } from './skeleton';

/** Mirrors the season page: poster + title, then episode rows. */
export default function SeasonSkeleton() {
  return (
    <div role="status" aria-live="polite" className="pb-[64px]">
      <span className="sr-only">Loading…</span>
      <div className="page-gutter grid grid-cols-[112px_minmax(0,1fr)] items-end gap-x-[16px] pt-[72px] pb-[28px] sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-x-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-[40px] lg:pt-[96px] lg:pb-[40px]">
        <div className={`${skeleton} aspect-[2/3] rounded-[12px] lg:rounded-[16px]`} />
        <div className="flex flex-col gap-[12px]">
          <div className={`${skeleton} h-[18px] w-[120px]`} />
          <div className={`${skeleton} h-[32px] w-3/5 lg:h-[56px]`} />
          <div className={`${skeleton} h-[16px] w-[220px] max-w-full`} />
        </div>
      </div>
      <div className="page-gutter mt-[24px] flex max-w-[1200px] flex-col gap-[12px] lg:mt-[40px]">
        <div className={`${skeleton} mb-[8px] h-[26px] w-[140px]`} />
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex flex-col gap-[14px] rounded-[16px] border border-white/[0.07] p-[12px] sm:flex-row sm:gap-[20px] sm:p-[14px]"
          >
            <div
              className={`${skeleton} aspect-video w-full rounded-[10px] sm:w-[240px] lg:w-[280px]`}
            />
            <div className="flex flex-1 flex-col gap-[10px]">
              <div className={`${skeleton} h-[18px] w-1/2`} />
              <div className={`${skeleton} h-[13px] w-1/3`} />
              <div className={`${skeleton} h-[14px] w-full`} />
              <div className={`${skeleton} h-[14px] w-4/5`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
