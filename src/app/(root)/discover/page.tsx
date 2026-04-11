import { Metadata } from 'next';

import DiscoverClient from '@/components/DiscoverClient';
import { searchMediaAction, getAllGenresAction } from '@/utils/serverActions/media';

export const metadata: Metadata = {
  title: 'Discover Movies & TV Shows – Search & Watch Trailers',
  description:
    'Search movies and TV shows on Starlight. Explore titles, discover new releases, and watch official trailers on hover.',

  keywords: [
    'search movies',
    'search tv shows',
    'discover movies',
    'discover tv shows',
    'movie search',
    'tv search',
    'watch trailers',
  ],
};

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const cleanQuery = search ? search.replace(/-/g, ' ') : '';

  const [movies, genreMap] = await Promise.all([
    searchMediaAction(cleanQuery),
    getAllGenresAction(),
  ]);

  return <DiscoverClient initialMovies={movies} genreMap={genreMap} initialQuery={cleanQuery} />;
}
