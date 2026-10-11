'use client';

import { useLoadMore } from '@/hooks/useLoadMore';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { getMoreMediaAction } from '@/utils/serverActions/media';

import LoadMore from './LoadMore';
import MovieGrid from './MovieGrid';

interface Props {
  initialMedia: MediaWithDetails[];
  initialGenres: Record<number, string>;
  mediaMode: MediaMode;
}

/** Paginated grid for the Movies / TV Shows pages. */
export default function MediaList({ initialMedia, initialGenres, mediaMode }: Props) {
  const { items, hasMore, isLoading, hasError, loadMore } = useLoadMore(initialMedia, (page) =>
    getMoreMediaAction(mediaMode, page),
  );

  return (
    <div className="animate-fadeIn">
      <MovieGrid
        media={items.filter((item) => item.poster_path)}
        genreMap={initialGenres}
        hasMore={hasMore}
      />
      <LoadMore hasMore={hasMore} isLoading={isLoading} hasError={hasError} onLoadMore={loadMore} />
    </div>
  );
}
