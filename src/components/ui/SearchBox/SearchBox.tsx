'use client';

import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { useDebounce } from 'use-debounce';

import SearchCard, { optionId } from '@/components/Cards/SearchCard/SearchCard';
import { ROUTES } from '@/constants/route';

import type { Route } from 'next';

interface Props {
  autoFocus?: boolean;
  /** Desktop navbar: pressing "/" anywhere on the page focuses this field. */
  shortcut?: boolean;
  /** Fill the parent at every width (instead of the navbar's fixed desktop width). */
  fullWidth?: boolean;
}

/** Focus is in a text field, so "/" is typing, not the shortcut. */
const isTypingTarget = (el: EventTarget | null) =>
  el instanceof HTMLElement &&
  (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

export default function SearchBox({
  autoFocus = false,
  shortcut = false,
  fullWidth = false,
}: Props) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 300);
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const [options, setOptions] = useState<Route[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleOptionsChange = useCallback((hrefs: Route[]) => {
    setOptions(hrefs);
    setActiveIndex(-1);
  }, []);

  // Reset after navigating so the dropdown doesn't linger on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
    setSearch('');
  }

  const shouldShowDropdown = debouncedSearch.trim().length > 1 && isOpen;

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = search.trim();
      if (!query) return;
      // Enter on a highlighted option opens it; otherwise search everything.
      const highlighted = activeIndex >= 0 ? options[activeIndex] : undefined;
      router.push(highlighted ?? ROUTES.DISCOVER(query));
      setIsOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    },
    [router, search, activeIndex, options],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (!shouldShowDropdown || options.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? options.length - 1 : i - 1));
    }
  };

  const clearSearch = () => {
    setSearch('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut]);

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

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative h-[44px] w-full rounded-[12px] border border-white/12 bg-white/[0.04] transition-colors focus-within:border-white/40 focus-within:bg-white/[0.06] hover:border-white/25',
        !fullWidth && 'lg:w-[300px] xl:w-[360px]',
      )}
    >
      <form role="search" onSubmit={handleSubmit} className="h-full">
        <Search
          className="pointer-events-none absolute top-1/2 left-[14px] size-[18px] -translate-y-1/2 text-white/45"
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          name="q"
          role="combobox"
          aria-label="Search movies and TV shows"
          aria-autocomplete="list"
          aria-expanded={shouldShowDropdown}
          aria-controls={listboxId}
          aria-activedescendant={
            shouldShowDropdown && activeIndex >= 0 ? optionId(listboxId, activeIndex) : undefined
          }
          autoComplete="off"
          enterKeyHint="search"
          autoFocus={autoFocus}
          placeholder="Search movies, TV shows…"
          value={search}
          onChange={handleSearchChange}
          onFocus={() => search && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          // 16px+ stops iOS Safari zooming on focus.
          className="h-full w-full truncate rounded-[12px] bg-transparent pr-[44px] pl-[42px] text-[16px] text-white placeholder:text-white/40 focus:outline-none lg:text-[15px] [&::-webkit-search-cancel-button]:hidden"
        />

        {shortcut && !search && (
          <kbd
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[10px] flex size-[22px] -translate-y-1/2 items-center justify-center rounded-[6px] border border-white/15 font-sans text-[12px] text-white/45"
          >
            /
          </kbd>
        )}
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute top-1/2 right-[6px] flex size-[32px] -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-[18px]" aria-hidden="true" />
          </button>
        )}
      </form>

      {shouldShowDropdown && (
        <SearchCard
          id={listboxId}
          query={debouncedSearch}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onOptionsChange={handleOptionsChange}
          alignRight={!fullWidth}
        />
      )}
    </div>
  );
}
