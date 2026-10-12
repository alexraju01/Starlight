'use client';

import PaginatedMediaGrid from '@/components/Media/PaginatedMediaGrid';
import { SortOption } from '@/constants/browse';
import { MediaWithDetails } from '@/types/global';
import { fetchGenreMedia } from '@/utils/serverActions/media';

import type { GenreIds } from '@/types';

interface Props {
  initialMedia: MediaWithDetails[];
  genreMap: Record<number, string>;
  genreIds: GenreIds;
  sort: SortOption;
  emptyState: React.ReactNode;
}

/** One genre's grid (remounted whenever the filters change). */
export default function GenreMediaList({ genreIds, sort, ...grid }: Props) {
  return (
    <PaginatedMediaGrid {...grid} fetchPage={(page) => fetchGenreMedia(genreIds, page, sort)} />
  );
}
