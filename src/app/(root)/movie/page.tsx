import { Metadata } from 'next';

import BrowseMediaPage, { BrowseSearchParams } from '@/components/Media/BrowseMediaPage';
import { MediaMode } from '@/types/mediaMode';

export const metadata: Metadata = {
  // Filtered views (?genre=, ?sort=) are variations of this page, not separate pages.
  alternates: { canonical: '/movie' },
  title: 'Movies – Discover Popular & Trending Films',
  description:
    'Browse popular movies, trending films, and timeless classics on Starlight. Watch official trailers, explore movie details, and discover new releases.',

  keywords: [
    'movies',
    'films',
    'trending movies',
    'popular movies',
    'movie trailers',
    'watch trailers',
    'latest films',
    'new movie releases',
  ],
};

export default function MoviesPage({ searchParams }: { searchParams: BrowseSearchParams }) {
  return (
    <BrowseMediaPage
      mediaMode={MediaMode.MOVIE}
      heading="Movies"
      searchParams={searchParams}
      tagline="Discover blockbusters, hidden gems, and timeless classics — all in one place."
    />
  );
}
