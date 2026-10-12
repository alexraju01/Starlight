'use client';

import clsx from 'clsx';

import MediaCard from '@/components/Cards/MediaCard';
import { MEDIA_COLUMNS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaWithDetails } from '@/types/global';
import { mediaKey } from '@/utils/media';

interface Props {
  media: MediaWithDetails[];
  genreMap: Record<number, string>;
  /** More pages can still load: hide the partial last row so the grid doesn't look finished. */
  hasMore?: boolean;
}

/** Columns per breakpoint (as MEDIA_COLUMNS), spelled out so Tailwind generates the classes. */
const COLUMNS = [
  { cols: 2, hide: 'hidden', show: 'block' },
  { cols: 3, hide: 'sm:hidden', show: 'sm:block' },
  { cols: 4, hide: 'md:hidden', show: 'md:block' },
  { cols: 5, hide: 'xl:hidden', show: 'xl:block' },
  { cols: 6, hide: '2xl:hidden', show: '2xl:block' },
];

/** Hides item `index` at each breakpoint where it falls in an incomplete last row (pure CSS, so SSR is right). */
const partialRowClasses = (index: number, count: number) =>
  COLUMNS.map(({ cols, hide, show }) => {
    const fullRowsEnd = count - (count % cols);
    return fullRowsEnd > 0 && index >= fullRowsEnd ? hide : show;
  });

/** Responsive grid of hover-preview cards: browse, genre, search and 404 pages. */
export default function MediaGrid({ media, genreMap, hasMore = false }: Props) {
  // Only used to find each row's last card (its hover preview grows leftwards).
  const columns = useResponsiveItems(MEDIA_COLUMNS);

  if (media.length === 0) return null;

  return (
    <div className="relative grid w-full grid-cols-2 gap-x-[16px] gap-y-[24px] overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:gap-x-[24px] lg:gap-y-[32px] xl:grid-cols-5 2xl:grid-cols-6">
      {media.map((item, index) => (
        <div
          key={mediaKey(item)}
          className={clsx(hasMore && partialRowClasses(index, media.length))}
        >
          <MediaProvider genres={genreMap} mediaMode={item.media_type}>
            <MediaCard item={item} isLast={columns !== null && (index + 1) % columns === 0} />
          </MediaProvider>
        </div>
      ))}
    </div>
  );
}
