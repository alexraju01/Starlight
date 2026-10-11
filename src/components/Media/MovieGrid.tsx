'use client';

import MediaCard2 from '@/components/Cards/MediaCard2/MediaCard2';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { completeRows } from '@/utils/completeRows';

interface MovieGridProps {
  media: MediaWithDetails[];
  genreMap: Record<number, string>;
  /** More pages can still be loaded – only whole rows are shown so the grid doesn't look finished. */
  hasMore?: boolean;
}

/** Responsive grid of hover-preview cards, shared by the browse, genre and search pages. */
const MovieGrid = ({ media, genreMap, hasMore = false }: MovieGridProps) => {
  const columns = useResponsiveItems(CAROUSEL_BREAKPOINTS);
  const visibleMedia = completeRows(media, columns, hasMore);

  if (!visibleMedia.length) return null;

  return (
    // The Tailwind columns cover the server render; once hydrated the column count comes from
    // the same breakpoints used for row trimming and edge cards, so they can never disagree.
    <div
      className="relative grid w-full grid-cols-2 gap-x-[16px] gap-y-[24px] overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-[24px] lg:gap-y-[32px] xl:grid-cols-5 2xl:grid-cols-6"
      style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
    >
      {visibleMedia.map((item, index) => (
        <MediaProvider
          key={`${item.media_type}-${item.id}`}
          genres={genreMap}
          mediaMode={item.media_type ?? MediaMode.MOVIE}
        >
          <MediaCard2
            item={item}
            isFirst={columns !== null && index % columns === 0}
            isLast={columns !== null && (index + 1) % columns === 0}
          />
        </MediaProvider>
      ))}
    </div>
  );
};

export default MovieGrid;
