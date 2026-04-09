import { Suspense } from 'react';

import MediaList from '@/components/Media/MediaList';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils';

async function MovieContent() {
  const [movies, genres] = await Promise.all([
    api.media.getMedia(MediaMode.MOVIE),
    api.genre.getGenres(MediaMode.MOVIE),
  ]);

  return (
    <MediaList initialMedia={movies} initialGenres={genres.genresMap} mediaMode={MediaMode.MOVIE} />
  );
}
export default function MoviesPage() {
  return (
    <section className="text-white animate-fadeIn ">
      {/* Hero / Header */}
      <div className=" relative border-b border-white/5 bg-gradient-to-b from-red-900/10 to-transparent py-16">
        <div className="content-container ">
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Browse <span className="text-primary">Movies</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Discover blockbusters, hidden gems, and timeless classics — all in one place.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="content-container">
        <Suspense fallback={<LoadingSkeletons />}>
          <MovieContent />
        </Suspense>
      </section>
    </section>
  );
}
