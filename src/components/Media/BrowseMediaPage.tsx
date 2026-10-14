import Link from 'next/link';
import { Suspense } from 'react';

import PageHeader from '@/components/Layout/PageHeader';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { buttonClass } from '@/components/ui/buttonStyles';
import { SORT_OPTIONS, SortOption, parseSort } from '@/constants/browse';
import { Genre } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';
import { firstParam } from '@/utils/searchParams';

import BrowseToolbar, { browseHref } from './BrowseToolbar';
import MediaList from './MediaList';

export type BrowseSearchParams = Promise<{ genre?: string | string[]; sort?: string | string[] }>;

interface Props {
  mediaMode: MediaMode;
  heading: string;
  tagline: string;
  searchParams: BrowseSearchParams;
}

interface Filters {
  genreId: number | null;
  sort: SortOption;
}

async function BrowseContent({
  mediaMode,
  heading,
  genreId,
  sort,
  genresMap,
}: Pick<Props, 'mediaMode' | 'heading'> & Filters & { genresMap: Record<number, string> }) {
  const media = await api.media.getMedia(mediaMode, 1, genreId ? [genreId] : undefined, sort);
  const basePath = mediaMode === MediaMode.TV ? '/tv' : '/movie';

  return (
    <MediaList
      initialMedia={media}
      genreMap={genresMap}
      mediaMode={mediaMode}
      genreId={genreId}
      sort={sort}
      emptyState={
        <div className="flex flex-col items-center gap-[12px] py-[80px] text-center">
          <p className="text-[20px] font-semibold text-white">
            No {heading.toLowerCase()} match these filters
          </p>
          <p className="text-[15px] text-white/55">Try another genre or sort order.</p>
          <Link
            href={browseHref(basePath, null, sort)}
            scroll={false}
            className={buttonClass('ghost', 'sm', 'mt-[8px]')}
          >
            Show all {heading.toLowerCase()}
          </Link>
        </div>
      }
    />
  );
}

/** e.g. "Top Rated · Action". */
const resultsLabel = (sort: SortOption, genre?: Genre) =>
  [SORT_OPTIONS.find((o) => o.value === sort)?.label, genre?.name].filter(Boolean).join(' · ');

/** Shared /movie and /tv page: header, sticky filter toolbar and a paginated grid. */
export default async function BrowseMediaPage({
  mediaMode,
  heading,
  tagline,
  searchParams,
}: Props) {
  const [params, { genres, genresMap }] = await Promise.all([
    searchParams,
    api.genre.getGenres(mediaMode),
  ]);

  // Unknown genre ids (stale links, typos) are ignored rather than showing nothing.
  const requestedGenre = Number(firstParam(params.genre));
  const activeGenre = genres.find((g) => g.id === requestedGenre);
  const filters: Filters = {
    genreId: activeGenre?.id ?? null,
    sort: parseSort(firstParam(params.sort)),
  };

  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <PageHeader title={heading} description={tagline} />

      <div className="bg-secondary/95 border-b border-white/[0.06] py-[16px] backdrop-blur-xl lg:sticky lg:top-[var(--nav-h)] lg:z-30 lg:mt-[16px]">
        <div className="page-gutter">
          <BrowseToolbar
            basePath={mediaMode === MediaMode.TV ? '/tv' : '/movie'}
            genres={genres}
            activeGenreId={filters.genreId}
            activeSort={filters.sort}
          />
        </div>
      </div>

      <section aria-labelledby="results-heading" className="page-gutter pt-[24px] lg:pt-[32px]">
        <h2
          id="results-heading"
          className="mb-[16px] text-[14px] font-medium tracking-[0.02em] text-white/50 lg:mb-[24px]"
        >
          {resultsLabel(filters.sort, activeGenre)}
        </h2>
        {/* Keyed: a filter change shows the skeleton and resets pagination. */}
        <Suspense key={`${filters.genreId}-${filters.sort}`} fallback={<GridSkeleton />}>
          <BrowseContent
            mediaMode={mediaMode}
            heading={heading}
            genresMap={genresMap}
            {...filters}
          />
        </Suspense>
      </section>
    </div>
  );
}
