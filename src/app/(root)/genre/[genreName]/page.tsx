import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import GenreMediaList from '@/components/Genre/GenreMediaList';
import GenreHeaderSkeleton from '@/components/Skeletons/GenreHeaderSkeleton';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { MediaMode } from '@/types';
import { slugify } from '@/utils';
import { api } from '@/utils/api';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  params: Promise<{ genreName: string }>;
}

/** Finds the genre for a URL slug (shared by the metadata and the page). */
async function getGenreData(genreSlug: string) {
  const { movieGenres, tvGenres, genresMap } = await api.genre.getAllGenres();
  const foundGenre = [...movieGenres, ...tvGenres].find((g) => slugify(g.name) === genreSlug);
  return { foundGenre, genresMap };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genreName } = await params;
  const { foundGenre } = await getGenreData(genreName);

  if (!foundGenre) notFound();

  const genreTitle = foundGenre.name;

  const movies = await api.media.getMedia(MediaMode.MOVIE, 1, [foundGenre.id]);
  const image =
    getImageUrl(movies.find((m) => m.backdrop_path)?.backdrop_path, 'backdrop', 'w780') ||
    undefined;

  // The root layout template already appends "| Starlight".
  const title = `${genreTitle} Movies & TV Shows`;
  const description = `Explore the best ${genreTitle} movies and TV shows on Starlight. Discover trending, popular, and top-rated ${genreTitle} content.`;

  return {
    title,
    description,
    alternates: { canonical: `/genre/${genreName}` },
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
  const { foundGenre, genresMap } = await getGenreData(genreSlug);

  if (!foundGenre) notFound();

  const { id: genreId, name: genreName } = foundGenre;
  const media = await api.media.getGenreMedia(genreId);
  const backgroundImage = getImageUrl(
    media.find((m) => m.backdrop_path)?.backdrop_path,
    'backdrop',
    'w1280',
  );

  return (
    <>
      {backgroundImage && (
        <div className="pointer-events-none fixed top-0 left-0 z-0 h-screen w-full">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
      )}

      <div className="relative z-1 border-b border-white/5 py-16">
        <div className="content-container mt-10">
          <h1 className="text-5xl font-black uppercase md:text-6xl">{genreName}</h1>
          <p className="mt-4 text-lg text-slate-400">Explore {genreName} movies and TV shows.</p>
        </div>
      </div>

      <div className="content-container relative z-10 pb-20">
        <GenreMediaList initialMedia={media} genreId={genreId} genreMap={genresMap} />
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
