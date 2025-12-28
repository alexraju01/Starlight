import { Suspense } from 'react';

// import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons';
import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons/LoadingSkeletons';
import MediaList from '@/components/Media/MediaHandlers/MediaList';
import { Media } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

async function TvContent() {
  const rawMedia = await api.media.getMedia(MediaMode.TV);
  //   await sleep(5000);
  const mediaWithType = rawMedia.map((item) => ({
    ...item,
    media_type: 'tv',
  })) as Media[];

  return <MediaList initialMedia={mediaWithType} mediaMode={MediaMode.TV} />;
}

export default function TVPage() {
  return (
    <div className="flex flex-col mt-54 md:mt-40 w-full">
      <h2 className="text-3xl mb-10 text-center">TV Shows List</h2>

      <Suspense fallback={<LoadingSkeletons />}>
        <TvContent />
      </Suspense>
    </div>
  );
}
