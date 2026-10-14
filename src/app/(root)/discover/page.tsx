import { Metadata } from 'next';

import DiscoverClient from '@/components/Discover/DiscoverClient';
import { SITE_NAME } from '@/constants/site';
import { api } from '@/utils/api';
import { firstParam } from '@/utils/searchParams';
import { searchMediaAction, getAllGenresAction } from '@/utils/serverActions/media';

export const metadata: Metadata = {
  title: 'Discover Movies & TV Shows – Search & Watch Trailers',
  description: `Search movies and TV shows on ${SITE_NAME}. Explore titles, discover new releases, and watch official trailers on hover.`,
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
  const params = await searchParams;
  const query = firstParam(params.search)?.trim() ?? '';

  const [search, genreMap, trending] = await Promise.all([
    // A failed search shows an error state rather than a misleading "No results".
    searchMediaAction(query)
      .then((results) => ({ results, failed: false }))
      .catch(() => ({ results: [], failed: true })),
    getAllGenresAction(),
    // Only needed for the "nothing searched yet" state.
    query ? [] : api.media.getTrendingAll().catch(() => []),
  ]);

  return (
    <DiscoverClient
      results={search.results}
      searchFailed={search.failed}
      trending={trending}
      genreMap={genreMap}
      initialQuery={query}
    />
  );
}
