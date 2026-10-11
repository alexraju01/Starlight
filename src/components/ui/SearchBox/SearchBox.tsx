'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { useDebounce } from 'use-debounce';

import SearchCard from '@/components/Cards/SearchCard/SearchCard';
import { ROUTES } from '@/constants/route';

interface Props {
  autoFocus?: boolean;
}

export default function SearchBox({ autoFocus = false }: Props) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 300);
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Reset after navigating to a result so the dropdown doesn't linger on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
    setSearch('');
  }

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = search.trim();
      if (!query) return;
      router.push(ROUTES.DISCOVER(query));
      setIsOpen(false);
      inputRef.current?.blur();
    },
    [router, search],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  const clearSearch = () => {
    setSearch('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const shouldShowDropdown = debouncedSearch.trim().length > 1 && isOpen;

  return (
    <div
      ref={containerRef}
      className="relative h-[50px] rounded-[13px] border border-solid border-[#1D1D1D] transition-colors focus-within:border-white/40 lg:block lg:w-[346px]"
    >
      <form role="search" onSubmit={handleSubmit} className="h-full">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-[20px] -translate-y-1/2 text-[#BFBFBF]"
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          name="q"
          aria-label="Search movies and TV shows"
          aria-expanded={shouldShowDropdown}
          aria-controls={listboxId}
          autoComplete="off"
          enterKeyHint="search"
          autoFocus={autoFocus}
          placeholder="Search movies, TV shows…"
          value={search}
          onChange={handleSearchChange}
          onFocus={() => search && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          // 16px minimum stops iOS Safari from zooming the page on focus.
          className="h-full w-full truncate rounded-[13px] bg-transparent pr-12 pl-14 text-[16px] text-[#E5E5E5] placeholder:text-[#8a8a8a] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[#BFBFBF] transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-[18px]" aria-hidden="true" />
          </button>
        )}
      </form>

      {shouldShowDropdown && <SearchCard id={listboxId} query={debouncedSearch} />}
    </div>
  );
}
