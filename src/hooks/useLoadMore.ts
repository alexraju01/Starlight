import { useState } from 'react';

import { MediaWithDetails } from '@/types/global';
import { mediaKey } from '@/utils/media';

/**
 * "Load More" pagination for a media grid: appends the next page (skipping titles already
 * shown) and stops once a page comes back empty.
 */
export function useLoadMore(
  initialItems: MediaWithDetails[],
  fetchPage: (page: number) => Promise<MediaWithDetails[]>,
) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialItems.length > 0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    setHasError(false);
    const nextPage = page + 1;

    try {
      const nextItems = await fetchPage(nextPage);
      if (nextItems.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => {
        const seen = new Set(prev.map(mediaKey));
        return [...prev, ...nextItems.filter((item) => !seen.has(mediaKey(item)))];
      });
      setPage(nextPage);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { items, hasMore, isLoading, hasError, loadMore };
}
