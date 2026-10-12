'use client';

import clsx from 'clsx';

import MediaCard2 from '@/components/Cards/MediaCard2/MediaCard2';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

interface MovieGridProps {
  media: MediaWithDetails[];
  genreMap: Record<number, string>;
  /** More pages can still be loaded – the partial last row is hidden so the grid doesn't look finished. */
  hasMore?: boolean;
}

/**
 * Grid columns per breakpoint – the same values as CAROUSEL_BREAKPOINTS, which drives the
 * JS side (edge cards). Class names are spelled out in full so Tailwind generates them.
 */
const COLUMNS = [
  { cols: 2, hide: 'hidden', show: 'block' },
  { cols: 3, hide: 'sm:hidden', show: 'sm:block' },
  { cols: 4, hide: 'md:hidden', show: 'md:block' },
  { cols: 5, hide: 'xl:hidden', show: 'xl:block' },
  { cols: 6, hide: '2xl:hidden', show: '2xl:block' },
];

/**
 * Classes that hide item `index` while it's in an incomplete last row, per breakpoint.
 * Pure CSS, so the server render is already right – previously the row was trimmed in JS
 * after hydration and visibly disappeared.
 */
const partialRowClasses = (index: number, count: number) =>
  COLUMNS.map(({ cols, hide, show }) => {
    const fullRowsEnd = count - (count % cols);
    // Never hide the only (partial) row.
    return fullRowsEnd > 0 && index >= fullRowsEnd ? hide : show;
  });

/** Responsive grid of hover-preview cards, shared by the browse, genre and search pages. */
const MovieGrid = ({ media, genreMap, hasMore = false }: MovieGridProps) => {
  // Only for which cards sit at a row edge (their hover preview grows inwards).
  const columns = useResponsiveItems(CAROUSEL_BREAKPOINTS);

  if (!media.length) return null;

  return (
    <div className="relative grid w-full grid-cols-2 gap-x-[16px] gap-y-[24px] overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:gap-x-[24px] lg:gap-y-[32px] xl:grid-cols-5 2xl:grid-cols-6">
      {media.map((item, index) => (
        <div
          key={`${item.media_type}-${item.id}`}
          className={clsx(hasMore && partialRowClasses(index, media.length))}
        >
          <MediaProvider genres={genreMap} mediaMode={item.media_type ?? MediaMode.MOVIE}>
            <MediaCard2
              item={item}
              isFirst={columns !== null && index % columns === 0}
              isLast={columns !== null && (index + 1) % columns === 0}
            />
          </MediaProvider>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
