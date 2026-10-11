import clsx from 'clsx';
import Link from 'next/link';

import DragScrollList from '@/components/ui/DragScrollList';
import { DEFAULT_SORT, SORT_OPTIONS, SortOption } from '@/constants/browse';
import { Genre } from '@/types';

import type { Route } from 'next';

interface Props {
  basePath: '/movie' | '/tv';
  genres: Genre[];
  activeGenreId: number | null;
  activeSort: SortOption;
}

/** Builds a filter URL, leaving defaults out so the plain page keeps a clean URL. */
export const browseHref = (
  basePath: Props['basePath'],
  genreId: number | null,
  sort: SortOption,
): Route => {
  const params = new URLSearchParams();
  if (genreId) params.set('genre', String(genreId));
  if (sort !== DEFAULT_SORT) params.set('sort', sort);
  const query = params.toString();
  return (query ? `${basePath}?${query}` : basePath) as Route;
};

const chip =
  'inline-flex h-[36px] shrink-0 items-center rounded-full border px-[16px] text-[14px] font-medium whitespace-nowrap transition-colors';

/**
 * Genre chips + sort control. Plain links rather than client state: filtered views are
 * shareable, work with back/forward, and render on the server.
 */
export default function BrowseToolbar({ basePath, genres, activeGenreId, activeSort }: Props) {
  const genreChips = [{ id: null, name: 'All' }, ...genres];

  return (
    <div className="flex flex-col gap-[12px] lg:flex-row lg:items-center lg:gap-[32px]">
      <nav aria-label="Filter by genre" className="min-w-0 lg:flex-1">
        <DragScrollList className="-mx-[16px] flex gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none] sm:-mx-[24px] sm:px-[24px] lg:mx-0 lg:[mask-image:linear-gradient(to_right,#000_calc(100%-48px),transparent)] lg:px-0 [&::-webkit-scrollbar]:hidden">
          {genreChips.map((genre) => {
            const isActive = genre.id === activeGenreId;
            return (
              <li key={genre.id ?? 'all'}>
                <Link
                  href={browseHref(basePath, genre.id, activeSort)}
                  scroll={false}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    chip,
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : 'border-white/12 bg-white/[0.04] text-white/75 hover:border-white/30 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {genre.name}
                </Link>
              </li>
            );
          })}
        </DragScrollList>
      </nav>

      <div
        role="group"
        aria-label="Sort by"
        className="grid shrink-0 grid-cols-3 rounded-[10px] border border-white/10 bg-white/[0.04] p-[4px] sm:inline-grid sm:w-fit"
      >
        {SORT_OPTIONS.map((option) => {
          const isActive = option.value === activeSort;
          return (
            <Link
              key={option.value}
              href={browseHref(basePath, activeGenreId, option.value)}
              scroll={false}
              aria-current={isActive ? 'true' : undefined}
              className={clsx(
                'flex h-[36px] items-center justify-center rounded-[7px] px-[16px] text-[14px] font-medium whitespace-nowrap transition-colors',
                isActive ? 'bg-white text-[#100f10]' : 'text-white/70 hover:text-white',
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
