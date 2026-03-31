'use client';

import { MediaCard2 } from '@/components';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';

import { LoadingSkeletons } from '../Feedback/LoadingSkeletons/LoadingSkeletons';

interface Props {
  media: MediaWithDetails[];
}

export default function GenreMediaGrid({ media }: Props) {
  const movieGenres = useGenres(MediaMode.MOVIE);
  const tvGenres = useGenres(MediaMode.TV);

  const itemsPerRow = useResponsiveItems(CAROUSEL_BREAKPOINTS);
  if (itemsPerRow === null) {
    return <LoadingSkeletons />;
  }

  return (
    <div
      className="grid gap-8 w-full  mb-8 transition-all relative overflow-hidden
				grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      {media.map((item, index) => {
        const isLastInRow = (index + 1) % itemsPerRow === 0 ? true : false;
        return (
          <MediaCard2
            key={item.id}
            item={item}
            genreMap={item.media_type === 'movie' ? movieGenres : tvGenres}
            mediaMode={item.media_type}
            isLast={isLastInRow}
          />
        );
      })}
    </div>
  );
}
