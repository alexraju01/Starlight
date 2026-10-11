import { Metadata } from 'next';

import BrowseMediaPage from '@/components/Media/BrowseMediaPage';
import { MediaMode } from '@/types/mediaMode';

export const metadata: Metadata = {
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

export default function TVPage() {
  return (
    <BrowseMediaPage
      mediaMode={MediaMode.TV}
      heading="TV Shows"
      tagline="Binge-worthy series, critically acclaimed dramas, and fan-favorite shows."
    />
  );
}
