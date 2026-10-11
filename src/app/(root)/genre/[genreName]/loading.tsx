import GenreHeaderSkeleton from '@/components/Skeletons/GenreHeaderSkeleton';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="pb-[48px]">
      <GenreHeaderSkeleton />
      <div className="page-gutter pt-[64px] lg:pt-[80px]">
        <LoadingSkeletons count={10} />
      </div>
    </div>
  );
}
