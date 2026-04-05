import { Suspense } from 'react';

import MediaList from '@/components/Media/MediaList';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

async function TvContent() {
  const [tvShows, genres] = await Promise.all([
    api.media.getMedia(MediaMode.TV),
    api.genre.getGenres(MediaMode.TV), // Use your server-side API util
  ]);

  return (
    <MediaList initialGenres={genres.genresMap} initialMedia={tvShows} mediaMode={MediaMode.TV} />
  );
}

export default function TVPage() {
  return (
    <section className="min-h-screen  text-white animate-fadeIn">
      {/* Hero / Header */}
      <div className="relative border-b border-white/5 bg-gradient-to-b from-red-900/10 to-transparent px-6 py-16">
        <div className="lg:mx-[68px] 2xl:mx-[101px]">
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Browse <span className="text-primary">TV Shows</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Binge-worthy series, critically acclaimed dramas, and fan-favorite shows.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="lg:mx-[68px] 2xl:mx-[101px] px-6 py-12">
        <Suspense fallback={<LoadingSkeletons />}>
          <TvContent />
        </Suspense>
      </section>
    </section>
  );
}
