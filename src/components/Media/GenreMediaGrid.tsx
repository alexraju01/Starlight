'use client';

import { MediaCard2 } from '@/components';
import { DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types';
import { Movie, TVShow } from '@/types/global';

interface Props {
  media: (Movie | TVShow)[];
}

export default function GenreMediaGrid({ media }: Props) {
  const movieGenres = useGenres(MediaMode.MOVIE);
  const tvGenres = useGenres(MediaMode.TV);

  const itemsPerRow = useResponsiveItems(DISCOVER_BREAKPOINTS);
  if (itemsPerRow === null) {
    return <div className="p-6 text-center">Loading layout...</div>;
  }

  return (
    <div className="grid w-full gap-6 p-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 transition-all duration-300">
      {media.map((item, index) => {
        const isLastInRow = (index + 1) % itemsPerRow === 0 ? true : false;
        console.log('======', item);
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
