import { console } from 'inspector';

import Image from 'next/image';

import GenreMediaGrid from '@/components/Media/GenreMediaGrid';
import { MediaMode } from '@/types';
import { Movie, TVShow } from '@/types/global';
import { api } from '@/utils/api';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const genreId = Number(slug);
  if (Number.isNaN(genreId)) throw new Error('Invalid genre slug');

  const [{ movieGenres, tvGenres }, genreRelatedMovies, genreRelatedTv] = await Promise.all([
    api.genre.getAllGenres(),
    api.media.getMedia(MediaMode.MOVIE, 1, [genreId]),
    api.media.getMedia(MediaMode.TV, 1, [genreId]),
  ]);

  const combineRelatedMedia = [
    ...(genreRelatedMovies.map((media) => ({ ...media, media_type: 'movie' })) as Movie[]),
    ...(genreRelatedTv.map((media) => ({ ...media, media_type: 'tv' })) as TVShow[]),
  ];

  const combineRelatedGenre = [...movieGenres, ...tvGenres];
  const foundGenre = combineRelatedGenre.find((item) => item.id === parseInt(slug));
  const genreName = foundGenre ? foundGenre.name : 'Unknown Genre';

  const backgroundMedia =
    combineRelatedMedia.find((item) => 'backdrop_path' in item && item.backdrop_path) ||
    combineRelatedMedia[0];

  const backgroundImage = backgroundMedia?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${backgroundMedia.backdrop_path}`
    : null;

  return (
    <section className="relative overflow-hidden">
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
        <div className="mx-6 lg:mx-[68px] 2xl:mx-[101px] mt-20 lg:mt-30">
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">{genreName}</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Explore {genreName} movies and TV shows curated just for you.
          </p>
        </div>
      </div>

      <div className="lg:mx-[68px] 2xl:mx-[101px] px-6 py-12">
        <GenreMediaGrid media={combineRelatedMedia} />
      </div>
    </section>
  );
}
