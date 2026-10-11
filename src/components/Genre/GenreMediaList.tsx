'use client';

import LoadMore from '@/components/Media/LoadMore';
import MovieGrid from '@/components/Media/MovieGrid';
import { useLoadMore } from '@/hooks/useLoadMore';
import { MediaWithDetails } from '@/types/global';
import { fetchGenreMedia } from '@/utils/serverActions/media';

interface GenreMediaListProps {
  initialMedia: MediaWithDetails[];
  genreId: number;
  genreMap: Record<number, string>;
}

/** Paginated grid of movies and shows for one genre. */
export default function GenreMediaList({ initialMedia, genreId, genreMap }: GenreMediaListProps) {
  const { items, hasMore, isLoading, hasError, loadMore } = useLoadMore(initialMedia, (page) =>
    fetchGenreMedia(genreId, page),
  );

  return (
    <div className="animate-fadeIn">
      <MovieGrid media={items} genreMap={genreMap} hasMore={hasMore} />
      <div className="mt-12">
        <LoadMore
          hasMore={hasMore}
          isLoading={isLoading}
          hasError={hasError}
          onLoadMore={loadMore}
        />
      </div>
    </div>
  );
}
