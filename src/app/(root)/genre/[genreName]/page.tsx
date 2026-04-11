import { Metadata } from 'next';
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

/**
 * HELPER: Centralized genre lookup to avoid code duplication
 * Next.js automatically deduplicates fetch requests, but manually
 * handling this ensures we don't trigger unnecessary logic.
 */
async function getGenreData(genreSlug: string) {
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();
  const allGenresList = [...movieGenres, ...tvGenres];
  const foundGenre = allGenresList.find((g) => slugify(g.name) === genreSlug);

  return {
    foundGenre,
    allGenresList,
    movieGenres,
    tvGenres,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genreName } = await params;
  const { foundGenre } = await getGenreData(genreName);

  if (!foundGenre) {
    return {
      title: 'Genre Not Found – Starlight',
    };
  }

  const genreTitle = foundGenre.name;

  const movies = await api.media.getMedia(MediaMode.MOVIE, 1, [foundGenre.id]);
  const backdrop = movies.find((m) => m.backdrop_path);

  const image = backdrop?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${backdrop.backdrop_path}`
    : undefined;

  const title = `${genreTitle} Movies & TV Shows – Starlight`;
  const description = `Explore the best ${genreTitle} movies and TV shows on Starlight. Discover trending, popular, and top-rated ${genreTitle} content.`;

  return {
    title,
    description,
    keywords: [`${genreTitle} movies`, `${genreTitle} tv shows`, `${genreTitle} genre`],
    openGraph: {
      title,
      description,
      type: 'website',
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

async function GenreContent({ genreSlug }: { genreSlug: string }) {
  const { foundGenre, movieGenres, tvGenres } = await getGenreData(genreSlug);

  if (!foundGenre) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-2xl font-semibold">Genre not found</h2>
      </div>
    );
  }

  const genreId = foundGenre.id;
  const genreName = foundGenre.name;

  const genreMap: Record<number, string> = {};
  [...movieGenres, ...tvGenres].forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

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
        <div className="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full">
          <Image
            src={backgroundImage}
            alt={genreName}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
      )}

      <div className="relative border-b border-white/5 py-16 z-1">
        <div className="content-container mt-10">
          <h1 className="text-5xl font-black uppercase md:text-6xl">{genreName}</h1>
          <p className="mt-4 text-lg text-slate-400">Explore {genreName} movies and TV shows.</p>
        </div>
      </div>

      <div className="content-container relative z-10 pb-20">
        <GenreMediaList initialMedia={combineRelatedMedia} genreId={genreId} genreMap={genreMap} />
      </div>
    </>
  );
}

export default async function Page({ params }: Props) {
  const { genreName } = await params;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Suspense
        fallback={
          <div className="content-container pt-32">
            <GenreHeaderSkeleton />
            <LoadingSkeletons />
          </div>
        }
      >
        <GenreContent genreSlug={genreName} />
      </Suspense>
    </section>
  );
}
