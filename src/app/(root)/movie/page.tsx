import { Suspense } from 'react';

// import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons';
import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons/LoadingSkeletons';
import MediaList from '@/components/Media/MediaList';
import { Media } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

async function MovieContent() {
  const rawMedia = await api.media.getMedia(MediaMode.MOVIE);

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
