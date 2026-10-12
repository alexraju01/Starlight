import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { skeleton } from '@/components/Skeletons/skeleton';

export default function Loading() {
  return (
    <div className="page-gutter pt-[32px] lg:pt-[56px]">
      <div className={`${skeleton} h-[40px] w-[200px] lg:h-[52px]`} />
      <div className="mt-[24px] h-[56px] w-full max-w-[720px] animate-pulse rounded-[14px] bg-white/[0.05] lg:mt-[32px] lg:h-[64px]" />
      <div className="pt-[32px] lg:pt-[48px]">
        <GridSkeleton count={12} />
      </div>
    </div>
  );
}
