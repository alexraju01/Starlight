'use client';

import { Loader } from 'lucide-react';
import { useState } from 'react';

import MediaCard2 from '@/components/Cards/MediaCard2';
import Button from '@/components/ui/Button/Button';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types';
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

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    try {
      const combined = await fetchGenreMedia(genreId, nextPage);

      if (!combined || combined.length === 0) {
        setHasMore(false);
      } else {
        setMedia((prev) => [...prev, ...combined]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  if (itemsPerRow === null) return null;

  return (
    <div className="animate-fadeIn">
      <div className="relative mb-8 grid w-full grid-cols-2 gap-8 overflow-hidden transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {media.map((item, index) => (
          <MediaProvider
            key={`${item.id}-${index}`}
            mediaMode={item.media_type as MediaMode}
            genres={genreMap}
          >
            <MediaCard2 item={item} isLast={(index + 1) % itemsPerRow === 0} />
          </MediaProvider>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={loading}
            icon={loading && <Loader className="animate-spin" />}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
