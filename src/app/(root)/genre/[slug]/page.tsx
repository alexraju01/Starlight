// app/genre/[slug]/page.tsx
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

  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <section className="flex flex-col w-full mt-20">
        <h2 className="w-full mt-14 text-[clamp(2rem,5.5vw,4rem)] px-4 font-semibold">
          {`Shows related to ${genreName} ...`}
        </h2>
        <GenreMediaGrid media={combineRelatedMedia} />
      </section>
    </Suspense>
  );
}
