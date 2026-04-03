import Image from 'next/image';
import { Suspense } from 'react';

import GenreMediaList from '@/components/Genre/GenreMediaList';
import { GenreHeaderSkeleton } from '@/components/Skeletons/GenreHeaderSkeleton';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons/LoadingSkeletons';
import { MediaMode } from '@/types';
import { slugify } from '@/utils';
import { api } from '@/utils/api';

interface Props {
  params: Promise<{ genreName: string }>;
}

async function GenreContent({ genreSlug }: { genreSlug: string }) {
  // 1. Fetch the genre list to find the ID for this slug
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();
  const allGenres = [...movieGenres, ...tvGenres];

  // 2. Find the genre matching the URL slug
  const foundGenre = allGenres.find((g) => slugify(g.name) === genreSlug);

  // Fallback if the user types a fake genre in the URL
  if (!foundGenre) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-2xl">Genre not found</h2>
      </div>
    );
  }

  const genreId = foundGenre.id;
  const genreName = foundGenre.name;

  // 3. Fetch media using the ID we just found
  const [genreRelatedMovies, genreRelatedTv] = await Promise.all([
    api.media.getMedia(MediaMode.MOVIE, 1, [genreId]),
    api.media.getMedia(MediaMode.TV, 1, [genreId]),
  ]);

  const combineRelatedMedia = [
    ...genreRelatedMovies.map((m) => ({ ...m, media_type: MediaMode.MOVIE })),
    ...genreRelatedTv.map((m) => ({ ...m, media_type: MediaMode.TV })),
  ];

  //   const foundGenre = [...movieGenres, ...tvGenres].find((g) => g.id === genreId);
  //   const genreName = foundGenre?.name || 'Unknown Genre';

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
  const { genreName } = await params;
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
        <GenreContent genreSlug={genreName} />
      </Suspense>
    </section>
  );
}
