import { Metadata } from 'next';

import BrowseMediaPage from '@/components/Media/BrowseMediaPage';
import { MediaMode } from '@/types/mediaMode';

export const metadata: Metadata = {
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

export default function MoviesPage() {
  return (
    <BrowseMediaPage
      mediaMode={MediaMode.MOVIE}
      heading="Movies"
      tagline="Discover blockbusters, hidden gems, and timeless classics — all in one place."
    />
  );
}
