'use client';

import { SearchX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import SearchForm from '@/components/Discover/SearchForm';
import { PersonSummary } from '@/types';
import { searchPeopleAction } from '@/utils/serverActions/person';

import PersonCard from './PersonCard';

const GRID =
  'grid grid-cols-2 gap-x-[12px] gap-y-[28px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';

type SearchState =
  | { status: 'idle' }
  | { status: 'loading'; query: string }
  | { status: 'done'; query: string; results: PersonSummary[] }
  | { status: 'error'; query: string };

/** People search. Until something is typed it shows `children` (the trending casts). */
export default function PeopleBrowser({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [debounced] = useDebounce(query.trim(), 350);
  const [search, setSearch] = useState<SearchState>({ status: 'idle' });

  useEffect(() => {
    if (debounced.length < 2) return;
    // Ignore a response for a query the user has already changed.
    let cancelled = false;
    setSearch({ status: 'loading', query: debounced });
    searchPeopleAction(debounced)
      .then((results) => !cancelled && setSearch({ status: 'done', query: debounced, results }))
      .catch(() => !cancelled && setSearch({ status: 'error', query: debounced }));
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  const isSearching = query.trim().length >= 2;
  const isPending = isSearching && (search.status === 'loading' || debounced !== query.trim());

  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <h2 className="text-[20px] font-semibold text-white lg:text-[24px]">Find anyone</h2>
        <SearchForm
          query={query}
          onChangeAction={setQuery}
          onSubmitAction={() => {}}
          onClearAction={() => setQuery('')}
          isPending={isPending}
          label="Search people"
          placeholder="Search actors, directors…"
        />
      </div>

      <section aria-live="polite" aria-busy={isPending} className="pt-[32px] lg:pt-[48px]">
        {!isSearching ? (
          children
        ) : search.status === 'error' ? (
          <p role="alert" className="py-[48px] text-center text-[15px] text-red-300">
            Search is unavailable right now. Please try again in a moment.
          </p>
        ) : search.status === 'done' &&
          search.query === debounced &&
          search.results.length === 0 ? (
          <div className="flex flex-col items-center gap-[12px] py-[64px] text-center">
            <span className="flex size-[64px] items-center justify-center rounded-full bg-white/[0.06]">
              <SearchX aria-hidden="true" className="size-[28px] text-white/60" />
            </span>
            <p className="text-[18px] font-semibold text-white">
              No people found for “{debounced}”
            </p>
          </div>
        ) : search.status === 'done' && search.query === debounced ? (
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[15px] text-white/55">
              People matching <span className="font-semibold text-white">“{debounced}”</span>
            </h2>
            <ul className={GRID}>
              {search.results.map((person) => (
                <li key={person.id}>
                  <PersonCard person={person} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul aria-hidden="true" className={GRID}>
            {Array.from({ length: 12 }, (_, i) => (
              <li key={i} className="flex flex-col items-center gap-[12px]">
                <div className="size-[112px] animate-pulse rounded-full bg-white/[0.07] sm:size-[128px] lg:size-[144px]" />
                <div className="h-[14px] w-3/5 animate-pulse rounded-[6px] bg-white/[0.07]" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
