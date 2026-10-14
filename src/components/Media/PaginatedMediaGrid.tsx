'use client';

import { useLoadMore } from '@/hooks/useLoadMore';
import { MediaWithDetails } from '@/types/global';

import LoadMore from './LoadMore';
import MediaGrid from './MediaGrid';

interface Props {
  initialMedia: MediaWithDetails[];
  genreMap: Record<number, string>;
  /** Loads page `n` (2, 3, …). Rejecting shows the retry state. */
  fetchPage: (page: number) => Promise<MediaWithDetails[]>;
  /** Shown when nothing matches. */
  emptyState: React.ReactNode;
}

/** Media grid with "Load more". Titles without a poster are left out. */
export default function PaginatedMediaGrid({
  initialMedia,
  genreMap,
  fetchPage,
  emptyState,
}: Props) {
  const { items, hasMore, isLoading, hasError, loadMore } = useLoadMore(initialMedia, fetchPage);
  const withPosters = items.filter((item) => item.poster_path);

  if (withPosters.length === 0) return emptyState;

  return (
    <div className="animate-fadeIn">
      <MediaGrid media={withPosters} genreMap={genreMap} hasMore={hasMore} />
      <LoadMore hasMore={hasMore} isLoading={isLoading} hasError={hasError} onLoadMore={loadMore} />
    </div>
  );
}
