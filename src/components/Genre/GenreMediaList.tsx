'use client';

import LoadMore from '@/components/Media/LoadMore';
import MovieGrid from '@/components/Media/MovieGrid';
import { SortOption } from '@/constants/browse';
import { useLoadMore } from '@/hooks/useLoadMore';
import { MediaWithDetails } from '@/types/global';
import { fetchGenreMedia } from '@/utils/serverActions/media';

import type { GenreIds } from '@/utils/api';

interface GenreMediaListProps {
  initialMedia: MediaWithDetails[];
  genreIds: GenreIds;
  sort: SortOption;
  genreMap: Record<number, string>;
  /** Shown when the current filters match nothing. */
  emptyState: React.ReactNode;
}

/** Paginated grid for one genre (remounted whenever the filters change). */
export default function GenreMediaList({
  initialMedia,
  genreIds,
  sort,
  genreMap,
  emptyState,
}: GenreMediaListProps) {
  const { items, hasMore, isLoading, hasError, loadMore } = useLoadMore(initialMedia, (page) =>
    fetchGenreMedia(genreIds, page, sort),
  );
  const withPosters = items.filter((item) => item.poster_path);

  if (withPosters.length === 0) return emptyState;

  return (
    <div className="animate-fadeIn">
      <MovieGrid media={withPosters} genreMap={genreMap} hasMore={hasMore} />
      <LoadMore hasMore={hasMore} isLoading={isLoading} hasError={hasError} onLoadMore={loadMore} />
    </div>
  );
}
