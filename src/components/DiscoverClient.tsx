'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import SearchResults from '@/components/Discover/SearchResults';
import { SearchForm } from '@/components/Forms/SearchForm';
import MovieGrid from '@/components/Media/MovieGrid';
import SectionHeading from '@/components/Navigation/SectionHeading';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';

interface Props {
  results: MediaWithDetails[];
  /** Shown before the user has searched for anything. */
  trending: MediaWithDetails[];
  genreMap: Record<number, string>;
  initialQuery: string;
}

export default function DiscoverClient({ results, trending, genreMap, initialQuery }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const lastPushedRef = useRef(initialQuery);

  // Sync the input when the URL changes from outside (back/forward, navbar search),
  // but not when the change came from our own typing – that would clobber newer input.
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
    // Transition keeps the current results on screen while the next ones load.
    startTransition(() => {
      router.replace(trimmed ? ROUTES.DISCOVER(trimmed) : ROUTES.DISCOVER_HOME, { scroll: false });
    });
  };

  // Previously every keystroke triggered a server render + TMDB request.
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
      <header className="page-gutter relative overflow-hidden pt-[32px] lg:pt-[56px]">
        <div
          aria-hidden="true"
          className="from-primary/20 pointer-events-none absolute inset-x-0 -top-[120px] h-[320px] bg-gradient-to-b to-transparent blur-2xl"
        />
        <div className="relative flex flex-col gap-[8px] lg:gap-[12px]">
          <h1 className="text-[clamp(32px,4vw,52px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-white">
            Discover
          </h1>
          <p className="max-w-[56ch] text-[15px] leading-[1.6] text-pretty text-white/60 lg:text-[16px]">
            Search thousands of movies and TV shows by title — results update as you type.
          </p>
        </div>
        <div className="relative mt-[24px] lg:mt-[32px]">
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
        </div>
      </header>

      <section
        aria-busy={isPending}
        aria-live="polite"
        className="page-gutter pt-[32px] lg:pt-[48px]"
      >
        {isPending ? (
          <LoadingSkeletons count={12} />
        ) : initialQuery ? (
          // Keyed so a new search starts again from page 1 with the "All" tab.
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
              <MovieGrid media={trending} genreMap={genreMap} />
            </div>
          )
        )}
      </section>
    </div>
  );
}
