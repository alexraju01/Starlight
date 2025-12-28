// app/genre/[slug]/page.tsx
import Image from 'next/image';
import { Suspense } from 'react';

import GenreMediaGrid from '@/components/Media/GenreMediaGrid';
import { Genre } from '@/types/genre';
import { Movie, TVShow } from '@/types/global';
import fetchData from '@/utils/fetchData';

interface Props {
  params: Promise<{ slug: string }>;
}

interface GenreResponse {
  genres: Genre[];
}

interface MediaResponse {
  page: number;
  results: (Movie | TVShow)[];
  total_pages: number;
  total_results: number;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const [movieGenre, tvGenre, genreRelatedMovies, genreRelatedTv] = await Promise.all([
    fetchData<GenreResponse>('3', 'genre/movie/list'),
    fetchData<GenreResponse>('3', 'genre/tv/list'),
    fetchData<MediaResponse>('3', `discover/movie?with_genres=${slug}`),
    fetchData<MediaResponse>('3', `discover/tv?with_genres=${slug}`),
  ]);

  const combineRelatedMedia = [
    ...(genreRelatedMovies.results.map((media) => ({ ...media, media_type: 'movie' })) as Movie[]),
    ...(genreRelatedTv.results.map((media) => ({ ...media, media_type: 'tv' })) as TVShow[]),
  ];

  const combineRelatedGenre = [...movieGenre.genres, ...tvGenre.genres];
  const foundGenre = combineRelatedGenre.find((item) => item.id === parseInt(slug));
  const genreName = foundGenre ? foundGenre.name : 'Unknown Genre';

  const backgroundMedia =
    combineRelatedMedia.find((item) => 'backdrop_path' in item && item.backdrop_path) ||
    combineRelatedMedia[0];

  const backgroundImage = backgroundMedia?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${backgroundMedia.backdrop_path}`
    : null;

  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <section className="relative overflow-hidden">
        {/* Background layer (visual only) */}
        {/* Viewport background */}
        {backgroundImage && (
          <div className="pointer-events-none fixed top-0 left-0 w-full h-screen -z-10">
            <Image
              src={backgroundImage}
              alt={genreName}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Fade mask */}
            <div className="absolute inset-0 bg-gradient-to-b  from-black/80  via-black/70  to-black" />
          </div>
        )}

        {/* Header */}
        <div className="border-b border-white/5 px-6 py-16">
          <div className="mx-6 lg:mx-[68px] 2xl:mx-[101px] md:mt-20 lg:mt-30">
            <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
              {genreName}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              Explore {genreName} movies and TV shows curated just for you.
            </p>
          </div>
        </div>

        {/* Media grid (normal flow) */}
        <div className="mx-6 lg:mx-[68px] 2xl:mx-[101px] py-10">
          <GenreMediaGrid media={combineRelatedMedia} />
        </div>
      </section>
    </Suspense>
  );
}
