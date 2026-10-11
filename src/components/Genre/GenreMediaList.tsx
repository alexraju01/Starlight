'use client';

import { Loader } from 'lucide-react';
import { useState } from 'react';

import MediaCard2 from '@/components/Cards/MediaCard2';
import Button from '@/components/ui/Button/Button';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types';
import { completeRows } from '@/utils/completeRows';
import { fetchGenreMedia } from '@/utils/serverActions/media';

interface GenreMediaListProps {
  initialMedia: any[];
  genreId: number;
  genreMap: Record<number, string>;
}

export default function GenreMediaList({ initialMedia, genreId, genreMap }: GenreMediaListProps) {
  const [media, setMedia] = useState(initialMedia);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerRow = useResponsiveItems(CAROUSEL_BREAKPOINTS);
  // Only whole rows while "Load More" is showing, so the grid never looks like it ended.
  const visibleMedia = completeRows(media, itemsPerRow, hasMore);

  const gridStyle = itemsPerRow
    ? { gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))` }
    : undefined;

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    try {
      const combined = await fetchGenreMedia(genreId, nextPage);

      if (!combined || combined.length === 0) {
        setHasMore(false);
      } else {
        // Movies and shows can share numeric ids, so dedupe on type + id.
        setMedia((prev) => {
          const seen = new Set(prev.map((m) => `${m.media_type}-${m.id}`));
          return [...prev, ...combined.filter((m) => !seen.has(`${m.media_type}-${m.id}`))];
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* The Tailwind columns cover the server render; once hydrated the column count comes
            from the same breakpoints used to trim rows, so the two can never disagree. */}
      <div
        className="relative mb-8 grid w-full grid-cols-2 gap-8 overflow-hidden transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        style={gridStyle}
      >
        {visibleMedia.map((item, index) => (
          <MediaProvider
            key={`${item.media_type}-${item.id}`}
            mediaMode={item.media_type as MediaMode}
            genres={genreMap}
          >
            <MediaCard2
              item={item}
              isLast={itemsPerRow !== null && (index + 1) % itemsPerRow === 0}
            />
          </MediaProvider>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={loading}
            icon={loading && <Loader className="animate-spin" />}
            aria-busy={loading}
          >
            {loading ? 'Loading…' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
