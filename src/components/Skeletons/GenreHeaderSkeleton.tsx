import { skeleton as bar } from './skeleton';

/** Placeholder for a genre page: the tall hero, then the Top 10 row. */
export default function GenreHeaderSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex min-h-[500px] items-end bg-white/[0.02] lg:min-h-[600px]">
        <div className="page-gutter w-full pb-[36px] lg:pb-[56px]">
          <div className={`${bar} h-[14px] w-[160px]`} />
          <div className={`${bar} mt-[16px] h-[52px] w-[260px] lg:h-[96px] lg:w-[420px]`} />
          <div className={`${bar} mt-[16px] h-[16px] w-[320px] max-w-full`} />
          <div className={`${bar} mt-[28px] h-[98px] w-full max-w-[440px] rounded-[14px]`} />
        </div>
      </div>
      <div className="page-gutter flex gap-[16px] overflow-hidden pt-[32px] lg:pt-[48px]">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className={`${bar} aspect-[2/3] w-[120px] shrink-0 rounded-[12px] lg:w-[150px]`}
          />
        ))}
      </div>
    </div>
  );
}
