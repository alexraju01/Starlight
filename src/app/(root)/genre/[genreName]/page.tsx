import Image from 'next/image';
import { Suspense } from 'react';

import GenreMediaList from '@/components/Genre/GenreMediaList';
import GenreHeaderSkeleton from '@/components/Skeletons/GenreHeaderSkeleton';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { MediaMode } from '@/types';
import { slugify } from '@/utils';
import { api } from '@/utils/api';

interface Props {
  params: Promise<{ genreName: string }>;
}

async function GenreContent({ genreSlug }: { genreSlug: string }) {
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();

  // 2. Create the genreMap (ID -> Name)
  // This turns two arrays into one fast lookup object
  const genreMap: Record<number, string> = {};
  [...movieGenres, ...tvGenres].forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  // 3. Find the genre matching the URL slug
  // We use the arrays we already fetched to find the current genre
  const allGenresList = [...movieGenres, ...tvGenres];
  const foundGenre = allGenresList.find((g) => slugify(g.name) === genreSlug);

  if (!foundGenre) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-2xl">Genre not found</h2>
      </div>
    );
  }

  const genreId = foundGenre.id;
  const genreName = foundGenre.name;

  // 4. Fetch initial media
  const [genreRelatedMovies, genreRelatedTv] = await Promise.all([
    api.media.getMedia(MediaMode.MOVIE, 1, [genreId]),
    api.media.getMedia(MediaMode.TV, 1, [genreId]),
  ]);

  const combineRelatedMedia = [
    ...genreRelatedMovies.map((m) => ({ ...m, media_type: MediaMode.MOVIE })),
    ...genreRelatedTv.map((m) => ({ ...m, media_type: MediaMode.TV })),
  ];

  const backgroundMedia =
    combineRelatedMedia.find((m) => m.backdrop_path) || combineRelatedMedia[0];
  const backgroundImage = backgroundMedia?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${backgroundMedia.backdrop_path}`
    : null;

  return (
    <>
      {backgroundImage && (
        <div className="pointer-events-none fixed top-0 left-0 -z-1 h-screen w-full">
          <Image src={backgroundImage} alt={genreName} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
      )}

      <div className="border-b border-white/5 py-16">
        <div className="content-container mt-10">
          <h1 className="text-5xl font-black uppercase md:text-6xl">{genreName}</h1>
          <p className="mt-4 text-lg text-slate-400">Explore {genreName} movies and TV shows.</p>
        </div>
      </div>

      <div className="content-container ">
        <GenreMediaList initialMedia={combineRelatedMedia} genreId={genreId} genreMap={genreMap} />
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
