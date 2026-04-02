'use client';

import { MediaCard2 } from '@/components';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';

import { LoadingSkeletons } from '../Skeletons/LoadingSkeletons/LoadingSkeletons';
// 1. Import the Provider

interface Props {
  media: MediaWithDetails[];
}

export default function GenreMediaGrid({ media }: Props) {
  // Fetching both sets of genres to pass into the provider
  const movieGenres = useGenres(MediaMode.MOVIE);
  const tvGenres = useGenres(MediaMode.TV);

  // Combine genres so the card can find the name regardless of type
  const allGenres = { ...movieGenres, ...tvGenres };

  const itemsPerRow = useResponsiveItems(CAROUSEL_BREAKPOINTS);

  if (itemsPerRow === null) {
    return <LoadingSkeletons />;
  }

  return (
    <div
      className="grid gap-8 w-full mb-8 transition-all relative overflow-hidden
              grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      {media.map((item, index) => {
        const isLastInRow = (index + 1) % itemsPerRow === 0;

        const currentMediaMode = (item.media_type as MediaMode) || MediaMode.MOVIE;

        return (
          <MediaProvider key={item.id} mediaMode={currentMediaMode} genres={allGenres}>
            <MediaCard2 item={item} isLast={isLastInRow} />
          </MediaProvider>
        );
      })}
    </div>
  );
}
