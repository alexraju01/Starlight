'use client';

import { Loader2, Search } from 'lucide-react';

interface Props {
  query: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
  isPending?: boolean;
}

export function SearchForm({ query, onChangeAction, onSubmitAction, isPending = false }: Props) {
  return (
    <form
      role="search"
      className="animate-fadeIn relative w-full max-w-[60rem]"
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
        className="pointer-events-none absolute top-1/2 left-6 size-6 -translate-y-1/2 text-[#878d98]"
      />
      <input
        id="discover-search"
        type="search"
        value={query}
        onChange={(e) => onChangeAction(e.target.value)}
        placeholder="Search movies, TV shows…"
        autoComplete="off"
        enterKeyHint="search"
        // 16px+ prevents iOS Safari from zooming the page on focus.
        className="h-20 w-full rounded-full border border-solid border-white/20 bg-[#100f10] pr-36 pl-16 text-[18px] text-white transition-all duration-300 placeholder:text-[#6b6f78] hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] focus:shadow-[0_0_12px_rgba(255,255,255,0.6)] focus:outline-none sm:h-24 [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-2 flex h-[calc(100%-1rem)] -translate-y-1/2 items-center gap-2 rounded-full bg-white/10 px-6 text-[16px] font-medium text-white transition-colors hover:bg-white/20"
      >
        {isPending ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : null}
        Search
      </button>
    </form>
  );
}
