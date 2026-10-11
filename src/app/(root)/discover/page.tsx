import { Metadata } from 'next';

import DiscoverClient from '@/components/DiscoverClient';
import { api } from '@/utils/api';
import { searchMediaAction, getAllGenresAction } from '@/utils/serverActions/media';

export const metadata: Metadata = {
  title: 'Discover Movies & TV Shows – Search & Watch Trailers',
  description:
    'Search movies and TV shows on Starlight. Explore titles, discover new releases, and watch official trailers on hover.',
  alternates: { canonical: '/discover' },
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
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const { search } = await searchParams;
  const query = (Array.isArray(search) ? search[0] : search)?.trim() ?? '';

  const [results, genreMap, trending] = await Promise.all([
    searchMediaAction(query),
    getAllGenresAction(),
    // Only needed for the "nothing searched yet" state.
    query ? [] : api.media.getTrendingAll().catch(() => []),
  ]);

  return (
    <DiscoverClient
      results={results}
      trending={trending}
      genreMap={genreMap}
      initialQuery={query}
    />
  );
}
