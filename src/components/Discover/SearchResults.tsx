'use client';

import { SearchX } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LoadMore from '@/components/Media/LoadMore';
import MediaGrid from '@/components/Media/MediaGrid';
import { buttonClass } from '@/components/ui/buttonStyles';
import { SegmentedButtons } from '@/components/ui/Segmented';
import { useLoadMore } from '@/hooks/useLoadMore';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { searchMediaAction } from '@/utils/serverActions/media';

type TypeFilter = 'all' | MediaMode;

const TABS: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: MediaMode.MOVIE, label: 'Movies' },
  { value: MediaMode.TV, label: 'TV Shows' },
];

interface Props {
  query: string;
  initialResults: MediaWithDetails[];
  genreMap: Record<number, string>;
}

/** Paginated search results with an All / Movies / TV Shows filter. Keyed on the query. */
export default function SearchResults({ query, initialResults, genreMap }: Props) {
  const { items, hasMore, isLoading, hasError, loadMore } = useLoadMore(initialResults, (page) =>
    searchMediaAction(query, page),
  );
  const [type, setType] = useState<TypeFilter>('all');

  if (items.length === 0) return <NoResults query={query} />;

  const countOf = (value: TypeFilter) =>
    value === 'all' ? items.length : items.filter((item) => item.media_type === value).length;
  const visible = type === 'all' ? items : items.filter((item) => item.media_type === type);

  return (
    <>
      <div className="mb-[16px] flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between lg:mb-[24px]">
        <h2 className="text-[15px] text-white/55">
          Results for <span className="font-semibold text-white">“{query}”</span>
        </h2>

        <SegmentedButtons
          label="Show"
          value={type}
          onChange={setType}
          options={TABS.map((tab) => ({
            value: tab.value,
            label: (
              <>
                {tab.label}
                <span className="text-[12px] text-white/40 tabular-nums group-aria-pressed:text-black/50">
                  {countOf(tab.value)}
                </span>
              </>
            ),
          }))}
        />
      </div>

      {visible.length > 0 ? (
        // Whole-row trimming only on "All": a filtered tab must show every title its count promises.
        <MediaGrid media={visible} genreMap={genreMap} hasMore={type === 'all' && hasMore} />
      ) : (
        <p className="py-[48px] text-center text-[15px] text-white/55">
          No {type === MediaMode.TV ? 'TV shows' : 'movies'} in these results
          {hasMore ? ' yet – try loading more.' : '.'}
        </p>
      )}
      <LoadMore hasMore={hasMore} isLoading={isLoading} hasError={hasError} onLoadMore={loadMore} />
    </>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-[12px] py-[64px] text-center lg:py-[96px]">
      <span className="flex size-[64px] items-center justify-center rounded-full bg-white/[0.06]">
        <SearchX aria-hidden="true" className="size-[28px] text-white/60" />
      </span>
      <p className="mt-[8px] text-[20px] font-semibold text-white">No results for “{query}”</p>
      <p className="max-w-[44ch] text-[15px] leading-[1.6] text-white/55">
        Check the spelling, try a shorter title, or browse instead.
      </p>
      <div className="mt-[12px] flex gap-[12px]">
        {[
          { href: '/movie' as const, label: 'Browse movies' },
          { href: '/tv' as const, label: 'Browse TV shows' },
        ].map((link) => (
          <Link key={link.href} href={link.href} className={buttonClass('ghost', 'sm')}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
