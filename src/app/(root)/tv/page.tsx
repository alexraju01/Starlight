import { Metadata } from 'next';
import { Suspense } from 'react';

import MediaList from '@/components/Media/MediaList';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

export const metadata: Metadata = {
  title: 'TV Shows – Browse Popular & Trending Series',
  description:
    'Explore trending TV shows, binge-worthy series, and critically acclaimed dramas on Starlight. Watch official trailers, explore show details, and discover new releases.',

  keywords: [
    'tv shows',
    'series',
    'trending tv shows',
    'popular series',
    'tv trailers',
    'watch trailers',
    'latest tv shows',
    'new tv releases',
  ],
};
async function TvContent() {
  const [tvShows, genres] = await Promise.all([
    api.media.getMedia(MediaMode.TV),
    api.genre.getGenres(MediaMode.TV),
  ]);

  return (
    <MediaList initialGenres={genres.genresMap} initialMedia={tvShows} mediaMode={MediaMode.TV} />
  );
}

export default function TVPage() {
  return (
    <section className=" animate-fadeIn">
      {/* Hero / Header */}
      <div className="relative border-b border-white/5 bg-gradient-to-b from-red-900/10 to-transparent py-16">
        <div className="content-container">
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Browse <span className="text-primary">TV Shows</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Binge-worthy series, critically acclaimed dramas, and fan-favorite shows.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="content-container">
        <Suspense fallback={<LoadingSkeletons />}>
          <TvContent />
        </Suspense>
      </section>
    </section>
  );
}
