'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';

import SearchCard from '@/components/Cards/SearchCard/SearchCard';
import { ROUTES } from '@/constants/route';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && search.trim()) {
        router.push(ROUTES.DISCOVER(search.trim()));
        setIsOpen(false);
      }
    },
    [router, search],
  );

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

  const shouldShowDropdown = debouncedSearch.length > 1 && isOpen;

  return (
    <div
      ref={containerRef}
      className="relative md:block md:max-w-[346px] w-full h-[50px] rounded-[13px] border border-[#1D1D1D] border-solid"
    >
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFBFBF] size-[20px] pointer-events-none"
        aria-hidden="true"
      />

      <input
        type="text"
        placeholder="Search for movies, shows etc"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="w-full h-full truncate overflow-hidden whitespace-nowrap
				text-xl pl-14 bg-transparent text-[#BFBFBF] rounded-[13px] focus:outline-none"
      />

      {shouldShowDropdown && <SearchCard query={debouncedSearch} />}
    </div>
  );
}
