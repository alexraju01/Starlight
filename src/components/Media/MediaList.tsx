'use client';

import { SortOption } from '@/constants/browse';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { getMoreMediaAction } from '@/utils/serverActions/media';

import PaginatedMediaGrid from './PaginatedMediaGrid';

interface Props {
  initialMedia: MediaWithDetails[];
  genreMap: Record<number, string>;
  mediaMode: MediaMode;
  genreId: number | null;
  sort: SortOption;
  emptyState: React.ReactNode;
}

/** Movies / TV Shows grid (remounted whenever the filters change). */
export default function MediaList({ mediaMode, genreId, sort, ...grid }: Props) {
  return (
    <PaginatedMediaGrid
      {...grid}
      fetchPage={(page) => getMoreMediaAction(mediaMode, page, genreId ?? undefined, sort)}
    />
  );
}
