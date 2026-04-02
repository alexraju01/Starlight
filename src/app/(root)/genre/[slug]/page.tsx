import Image from 'next/image';
import { Suspense } from 'react';

import GenreMediaList from '@/components/Genre/GenreMediaList';
import { GenreHeaderSkeleton } from '@/components/Skeletons/GenreHeaderSkeleton';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons/LoadingSkeletons';
import { MediaMode } from '@/types';
import { api } from '@/utils/api';

interface Props {
  params: Promise<{ slug: string }>;
}

async function GenreContent({ slug }: { slug: string }) {
  const genreId = Number(slug);

  const [{ movieGenres, tvGenres }, genreRelatedMovies, genreRelatedTv] = await Promise.all([
    api.genre.getAllGenres(),
    api.media.getMedia(MediaMode.MOVIE, 1, [genreId]),
    api.media.getMedia(MediaMode.TV, 1, [genreId]),
  ]);

  const combineRelatedMedia = [
    ...genreRelatedMovies.map((m) => ({ ...m, media_type: 'movie' })),
    ...genreRelatedTv.map((m) => ({ ...m, media_type: 'tv' })),
  ];

  const foundGenre = [...movieGenres, ...tvGenres].find((g) => g.id === genreId);
  const genreName = foundGenre?.name || 'Unknown Genre';

  const backgroundMedia =
    combineRelatedMedia.find((m) => m.backdrop_path) || combineRelatedMedia[0];
  const backgroundImage = backgroundMedia?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${backgroundMedia.backdrop_path}`
    : null;

  return (
    <>
      {backgroundImage && (
        <div className="pointer-events-none fixed top-0 left-0 w-full h-screen -z-1">
          <Image src={backgroundImage} alt={genreName} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
      )}

      <div className="border-b border-white/5 px-6 py-16">
        <div className="mx-6 lg:mx-[68px] mt-20">
          <h1 className="text-4xl font-black uppercase md:text-6xl">{genreName}</h1>
          <p className="mt-4 text-slate-400">Explore {genreName} movies and TV shows.</p>
        </div>
      </div>

      <div className="lg:mx-[68px] px-6 py-12">
        <GenreMediaList initialMedia={combineRelatedMedia} genreId={genreId} />
      </div>
    </>
  );
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <section className="relative overflow-hidden">
      <Suspense
        fallback={
          <>
            <GenreHeaderSkeleton />
            <LoadingSkeletons />
          </>
        }
      >
        <GenreContent slug={slug} />
      </Suspense>
    </section>
  );
}
