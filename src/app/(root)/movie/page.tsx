import { Suspense } from 'react';

import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons';
import MediaList from '@/components/Media/MediaHandlers/MediaList';
import { Media } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import getMedia from '@/utils/serverActions/getMedia';

async function MovieContent() {
  const rawMedia = await getMedia(MediaMode.MOVIE);

  const mediaWithType = rawMedia.map((item) => ({
    ...item,
    media_type: 'movie',
  })) as Media[];

  return <MediaList initialMedia={mediaWithType} mediaMode={MediaMode.MOVIE} />;
}

export default async function MoviesPage() {
  return (
    <div className="flex flex-col mt-54 md:mt-40 w-full animate-fadeIn">
      <h2 className="text-3xl mb-10 text-center">Movies List</h2>
      <Suspense fallback={<LoadingSkeletons />}>
        <MovieContent />
      </Suspense>
    </div>
  );
}
