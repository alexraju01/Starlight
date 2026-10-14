import { Metadata } from 'next';

import BrowseMediaPage, { BrowseSearchParams } from '@/components/Media/BrowseMediaPage';
import { MediaMode } from '@/types/mediaMode';

export const metadata: Metadata = {
  // Filtered views (?genre=, ?sort=) are variations of this page, not separate pages.
  alternates: { canonical: '/tv' },
  title: 'TV Shows – Browse Popular & Trending Series',
  description:
    'Explore trending TV shows, binge-worthy series, and critically acclaimed dramas on Starlight. Watch official trailers, explore show details, and discover new releases.',

  keywords: [
    'tv shows',
    'series',
    'trending tv shows',
    'popular series',
    'tv trailers',
    'watch trailers',
    'latest tv shows',
    'new tv releases',
  ],
};

export default function TVPage({ searchParams }: { searchParams: BrowseSearchParams }) {
  return (
    <BrowseMediaPage
      mediaMode={MediaMode.TV}
      heading="TV Shows"
      searchParams={searchParams}
      tagline="Binge-worthy series, critically acclaimed dramas, and fan-favorite shows."
    />
  );
}
