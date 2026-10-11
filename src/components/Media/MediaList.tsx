'use client';

import { SortOption } from '@/constants/browse';
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
  genreId: number | null;
  sort: SortOption;
  /** Shown when the current filters match nothing. */
  emptyState: React.ReactNode;
}

/** Paginated grid for the Movies / TV Shows pages (remounted whenever the filters change). */
export default function MediaList({
  initialMedia,
  initialGenres,
  mediaMode,
  genreId,
  sort,
  emptyState,
}: Props) {
  const { items, hasMore, isLoading, hasError, loadMore } = useLoadMore(initialMedia, (page) =>
    getMoreMediaAction(mediaMode, page, genreId ?? undefined, sort),
  );
  const withPosters = items.filter((item) => item.poster_path);

  if (withPosters.length === 0) return emptyState;

  return (
    <div className="animate-fadeIn">
      <MovieGrid media={withPosters} genreMap={initialGenres} hasMore={hasMore} />
      <LoadMore hasMore={hasMore} isLoading={isLoading} hasError={hasError} onLoadMore={loadMore} />
    </div>
  );
}
