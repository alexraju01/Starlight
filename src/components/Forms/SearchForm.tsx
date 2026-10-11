'use client';

import { Loader2, Search, X } from 'lucide-react';
import { useRef } from 'react';

interface Props {
  query: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
  onClearAction: () => void;
  isPending?: boolean;
}

/** Large search field for the discover page: live results, Enter to search now, one-tap clear. */
export function SearchForm({
  query,
  onChangeAction,
  onSubmitAction,
  onClearAction,
  isPending = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      role="search"
      className="relative w-full max-w-[720px]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitAction();
      }}
    >
      <label htmlFor="discover-search" className="sr-only">
        Search movies and TV shows
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[20px] size-[20px] -translate-y-1/2 text-white/45"
      />
      <input
        ref={inputRef}
        id="discover-search"
        type="search"
        value={query}
        onChange={(e) => onChangeAction(e.target.value)}
        placeholder="Search movies, TV shows…"
        autoComplete="off"
        enterKeyHint="search"
        // 16px+ prevents iOS Safari from zooming the page on focus.
        className="h-[56px] w-full rounded-[14px] border border-white/12 bg-white/[0.04] pr-[96px] pl-[52px] text-[16px] text-white transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/40 hover:border-white/25 focus:border-white/40 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.06)] focus:outline-none lg:h-[64px] lg:text-[18px] [&::-webkit-search-cancel-button]:hidden"
      />

      <div className="absolute top-1/2 right-[12px] flex -translate-y-1/2 items-center gap-[4px]">
        {isPending && (
          <Loader2 aria-hidden="true" className="size-[18px] animate-spin text-white/60" />
        )}
        {query && (
          <button
            type="button"
            onClick={() => {
              onClearAction();
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="flex size-[36px] items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden="true" className="size-[18px]" />
          </button>
        )}
      </div>
    </form>
  );
}
