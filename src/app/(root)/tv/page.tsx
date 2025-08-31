import { Suspense } from 'react';

import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons';
import MediaWrapper from '@/components/Media/MediaHandlers/MediaWrapper';
import { MediaMode } from '@/types/mediaMode';

export default function Tv() {
  return (
    <div className="flex flex-col mt-54 md:mt-40 w-full">
      <h2 className="text-3xl mb-10 text-center">TV Shows List</h2>
      <Suspense fallback={<LoadingSkeletons />}>
        <MediaWrapper mediaMode={MediaMode.TV} />
      </Suspense>
    </div>
  );
}
