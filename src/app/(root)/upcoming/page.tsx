import { Suspense } from 'react';

import { Spinner } from '@/components/Feedback/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';

import MediaWrapper from '@/components/Media/MediaHandlers/MediaWrapper';

export default async function UpcomingPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-60 md:mt-30">
      <h2 className=" text-3xl mt-54 md:mt-40">Upcoming shows</h2>
      <Suspense fallback={<Spinner />}>
        <MediaWrapper mediaMode={MediaMode.UPCOMING} />
      </Suspense>
    </div>
  );
}
