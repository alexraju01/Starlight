'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import PageHeader from '@/components/Layout/PageHeader';
import MediaGrid from '@/components/Media/MediaGrid';
import SectionHeading from '@/components/Navigation/SectionHeading';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

interface Props {
  results: MediaWithDetails[];
  searchFailed?: boolean;
  /** Shown before the first search. */
  trending: MediaWithDetails[];
  genreMap: Record<number, string>;
  initialQuery: string;
}

/** Discover page: debounced, URL-driven search with trending titles before the first query. */
export default function DiscoverClient({
  results,
  searchFailed = false,
  trending,
  genreMap,
  initialQuery,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const lastPushedRef = useRef(initialQuery);

  // Follow URL changes from elsewhere (back/forward, navbar search), but not our own pushes,
  // which would overwrite newer typing.
  const [syncedQuery, setSyncedQuery] = useState(initialQuery);
  if (initialQuery !== syncedQuery) {
    setSyncedQuery(initialQuery);
    if (initialQuery !== lastPushedRef.current) {
      lastPushedRef.current = initialQuery;
      setQuery(initialQuery);
    }
  }

  const pushQuery = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === lastPushedRef.current) return;
    lastPushedRef.current = trimmed;
    // A transition keeps the current results up while the next ones load.
    startTransition(() => {
      router.replace(trimmed ? ROUTES.DISCOVER(trimmed) : ROUTES.DISCOVER_HOME, { scroll: false });
    });
  };

  const debouncedPush = useDebouncedCallback(pushQuery, 400);

  const handleInputChange = (value: string) => {
    setQuery(value);
    debouncedPush(value);
  };

  const pushNow = (value: string) => {
    debouncedPush.cancel();
    pushQuery(value);
  };

  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <PageHeader
        title="Discover"
        description="Search thousands of movies and TV shows by title — results update as you type."
      >
        <SearchForm
          query={query}
          onChangeAction={handleInputChange}
          onSubmitAction={() => pushNow(query)}
          onClearAction={() => {
            setQuery('');
            pushNow('');
          }}
          isPending={isPending}
        />
      </PageHeader>

      <section
        aria-busy={isPending}
        aria-live="polite"
        className="page-gutter pt-[32px] lg:pt-[48px]"
      >
        {isPending ? (
          <GridSkeleton count={12} />
        ) : initialQuery && searchFailed ? (
          <p role="alert" className="py-[64px] text-center text-[15px] text-red-300">
            Search is unavailable right now. Please try again in a moment.
          </p>
        ) : initialQuery ? (
          // Keyed: a new search starts again from page 1 on "All".
          <SearchResults
            key={initialQuery}
            query={initialQuery}
            initialResults={results}
            genreMap={genreMap}
          />
        ) : (
          trending.length > 0 && (
            <div className="flex flex-col gap-[20px] lg:gap-[24px]">
              <SectionHeading>Trending this week</SectionHeading>
              <MediaGrid media={trending} genreMap={genreMap} />
            </div>
          )
        )}
      </section>
    </div>
  );
}
