import { Suspense } from 'react';

import { LoadingSkeletons } from '@/components/Feedback/LoadingSkeletons/LoadingSkeletons';
import MediaList from '@/components/Media/MediaList';
import { Media } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

async function MovieGrid() {
  const rawMedia = await api.media.getMedia(MediaMode.MOVIE);

  const mediaWithType = rawMedia.map((item) => ({
    ...item,
    media_type: 'movie',
  })) as Media[];

  return <MediaList initialMedia={mediaWithType} mediaMode={MediaMode.MOVIE} />;
}

export default function MoviesPage() {
  return (
    <section className=" text-white animate-fadeIn">
      {/* Hero / Header */}
      <div className=" relative border-b border-white/5 bg-gradient-to-b from-red-900/10 to-transparent px-6 py-16">
        <div className="lg:mx-[68px] 2xl:mx-[101px]">
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Browse <span className="text-primary">Movies</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Discover blockbusters, hidden gems, and timeless classics — all in one place.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className=" lg:mx-[68px] 2xl:mx-[101px] py-12">
        <Suspense fallback={<LoadingSkeletons />}>
          <MovieGrid />
        </Suspense>
      </section>
    </section>
  );
}
