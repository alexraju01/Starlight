import Link from 'next/link';
import { Suspense } from 'react';

import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { SORT_OPTIONS, SortOption, parseSort } from '@/constants/browse';
import { Genre } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import BrowseToolbar, { browseHref } from './BrowseToolbar';
import MediaList from './MediaList';

export type BrowseSearchParams = Promise<{ genre?: string | string[]; sort?: string | string[] }>;

interface Props {
  mediaMode: MediaMode.MOVIE | MediaMode.TV;
  /** Page title, e.g. "Movies". */
  heading: string;
  tagline: string;
  searchParams: BrowseSearchParams;
}

interface Filters {
  genreId: number | null;
  sort: SortOption;
}

const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

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
      initialGenres={genresMap}
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
            className="mt-[8px] inline-flex h-[44px] items-center rounded-[10px] border border-white/20 bg-white/[0.06] px-[20px] text-[15px] font-medium text-white transition-colors hover:bg-white/15"
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

  // Unknown genre ids (stale links, typos) are ignored rather than showing an empty page.
  const requestedGenre = Number(first(params.genre));
  const activeGenre = genres.find((g) => g.id === requestedGenre);
  const filters: Filters = {
    genreId: activeGenre?.id ?? null,
    sort: parseSort(first(params.sort)),
  };

  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <header className="page-gutter relative overflow-hidden pt-[32px] lg:pt-[56px]">
        <div
          aria-hidden="true"
          className="from-primary/20 pointer-events-none absolute inset-x-0 -top-[120px] h-[320px] bg-gradient-to-b to-transparent blur-2xl"
        />
        <div className="relative flex flex-col gap-[8px] lg:gap-[12px]">
          <h1 className="text-[clamp(32px,4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-white">
            {heading}
          </h1>
          <p className="max-w-[56ch] text-[15px] leading-[1.6] text-pretty text-white/60 lg:text-[16px]">
            {tagline}
          </p>
        </div>
      </header>

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
        {/* Keyed on the filters so changing them shows the skeleton and resets pagination. */}
        <Suspense key={`${filters.genreId}-${filters.sort}`} fallback={<LoadingSkeletons />}>
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
