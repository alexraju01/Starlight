import { CardRowSkeleton } from './MediaDetailsSkeleton';
import { skeleton } from './skeleton';

/** Mirrors the person page: portrait + name, biography lines, then a poster row. */
export default function PersonSkeleton() {
  return (
    <div role="status" aria-live="polite" className="pb-[64px]">
      <span className="sr-only">Loading…</span>
      <div className="page-gutter grid grid-cols-[112px_minmax(0,1fr)] items-end gap-x-[16px] pt-[72px] pb-[32px] sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-x-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-[40px] lg:pt-[96px] lg:pb-[48px]">
        <div className={`${skeleton} aspect-[2/3] rounded-[12px] lg:rounded-[16px]`} />
        <div className="flex flex-col gap-[12px]">
          <div className={`${skeleton} h-[18px] w-[64px]`} />
          <div className={`${skeleton} h-[32px] w-4/5 lg:h-[56px]`} />
          <div className={`${skeleton} h-[16px] w-[260px] max-w-full`} />
        </div>
      </div>
      <div className="page-gutter mt-[24px] flex max-w-[900px] flex-col gap-[10px] lg:mt-[40px]">
        <div className={`${skeleton} mb-[6px] h-[26px] w-[160px]`} />
        <div className={`${skeleton} h-[14px] w-full`} />
        <div className={`${skeleton} h-[14px] w-full`} />
        <div className={`${skeleton} h-[14px] w-2/3`} />
      </div>
      <div className="page-gutter mt-[40px] lg:mt-[56px]">
        <CardRowSkeleton />
      </div>
    </div>
  );
}
