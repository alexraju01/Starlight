'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { SearchForm } from '@/components/Forms/SearchForm';
import { ROUTES } from '@/constants/route';

import MovieGrid from './Media/MovieGrid';
import { LoadingSkeletons } from './Skeletons/LoadingSkeletons';

interface Props {
  results: React.ComponentProps<typeof MovieGrid>['media'];
  genreMap: Record<number, string>;
  initialQuery: string;
}

export default function DiscoverClient({ results, genreMap, initialQuery }: Props) {
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

  const handleSubmit = () => {
    debouncedPush.cancel();
    pushQuery(query);
  };

  const hasQuery = initialQuery.length > 0;

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center gap-12 px-4 py-12 sm:gap-16">
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <h1 className="animate-fadeIn text-4xl font-bold text-white md:text-5xl">
          Discover movies &amp; TV shows
        </h1>
        <p className="text-[16px] text-slate-400">Search by title — results update as you type.</p>
      </div>

      <SearchForm
        query={query}
        onChangeAction={handleInputChange}
        onSubmitAction={handleSubmit}
        isPending={isPending}
      />

      <div
        className="w-full px-2 sm:px-6 lg:px-[68px] 2xl:px-[101px]"
        aria-busy={isPending}
        aria-live="polite"
      >
        {isPending ? (
          <LoadingSkeletons count={12} />
        ) : !hasQuery ? (
          <p className="text-center text-[16px] text-slate-500">
            Start typing to search thousands of movies and TV shows.
          </p>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-2xl font-semibold text-white">No results for “{initialQuery}”</p>
            <p className="text-[16px] text-slate-400">
              Check the spelling or try a different title.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-[14px] text-slate-400">
              {results.length} result{results.length === 1 ? '' : 's'} for “{initialQuery}”
            </p>
            <MovieGrid media={results} genreMap={genreMap} />
          </>
        )}
      </div>
    </div>
  );
}
