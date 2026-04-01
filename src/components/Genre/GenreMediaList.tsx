'use client';

import { Loader } from 'lucide-react';
import { useState } from 'react';

import MediaCard2 from '@/components/Cards/MediaCard2';
import Button from '@/components/ui/Button/Button';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types';
import { api } from '@/utils/api';

export default function GenreMediaList({
  initialMedia,
  genreId,
}: {
  initialMedia: any[];
  genreId: number;
}) {
  const [media, setMedia] = useState(initialMedia);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Get all genres for the Provider
  const movieGenres = useGenres(MediaMode.MOVIE);
  const tvGenres = useGenres(MediaMode.TV);
  const allGenres = { ...movieGenres, ...tvGenres };

  const itemsPerRow = useResponsiveItems(CAROUSEL_BREAKPOINTS);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    const [newMovies, newTv] = await Promise.all([
      api.media.getMedia(MediaMode.MOVIE, nextPage, [genreId]),
      api.media.getMedia(MediaMode.TV, nextPage, [genreId]),
    ]);

    const combined = [
      ...newMovies.map((m) => ({ ...m, media_type: 'movie' })),
      ...newTv.map((m) => ({ ...m, media_type: 'tv' })),
    ];

    if (combined.length === 0) setHasMore(false);

    setMedia((prev) => [...prev, ...combined]);
    setPage(nextPage);
    setLoading(false);
  };

  if (itemsPerRow === null) return null;

  return (
    <div className="animate-fadeIn">
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {media.map((item, index) => (
          <MediaProvider
            key={`${item.id}-${index}`}
            mediaMode={item.media_type as MediaMode}
            genres={allGenres}
          >
            <MediaCard2 item={item} isLast={(index + 1) % itemsPerRow === 0} />
          </MediaProvider>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
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
