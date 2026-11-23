'use client';

import { BookmarkPlus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import MediaGrid from '@/components/Media/MediaGrid';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { buttonClass } from '@/components/ui/buttonStyles';
import { SegmentedButtons } from '@/components/ui/Segmented';
import { useMyList } from '@/hooks/useLibrary';
import { MediaMode } from '@/types/mediaMode';
import { pluralize } from '@/utils/format';
import { asMedia, myList } from '@/utils/library';

type Filter = 'all' | MediaMode;

/** The visitor's saved titles, newest first, filterable by type. */
export default function MyListView({ genreMap }: { genreMap: Record<number, string> }) {
  const list = useMyList();
  const [filter, setFilter] = useState<Filter>('all');

  // Not known until the browser has read it.
  if (list === null) return <GridSkeleton count={12} />;

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center gap-[12px] py-[64px] text-center lg:py-[96px]">
        <span className="flex size-[64px] items-center justify-center rounded-full bg-white/[0.06]">
          <BookmarkPlus aria-hidden="true" className="size-[28px] text-white/60" />
        </span>
        <p className="mt-[8px] text-[20px] font-semibold text-white">Your list is empty</p>
        <p className="max-w-[44ch] text-[15px] leading-[1.6] text-white/55">
          Tap the bookmark on any movie or show to save it here for later.
        </p>
        <div className="mt-[12px] flex gap-[12px]">
          <Link href="/movie" className={buttonClass('ghost', 'sm')}>
            Browse movies
          </Link>
          <Link href="/tv" className={buttonClass('ghost', 'sm')}>
            Browse TV shows
          </Link>
        </div>
      </div>
    );
  }

  const count = (f: Filter) =>
    f === 'all' ? list.length : list.filter((t) => t.media_type === f).length;
  const visible = filter === 'all' ? list : list.filter((t) => t.media_type === filter);

  return (
    <>
      <div className="mb-[16px] flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between lg:mb-[24px]">
        <SegmentedButtons
          label="Show"
          value={filter}
          onChange={setFilter}
          options={(
            [
              ['all', 'All'],
              [MediaMode.MOVIE, 'Movies'],
              [MediaMode.TV, 'TV Shows'],
            ] as const
          ).map(([value, label]) => ({
            value,
            label: (
              <>
                {label}
                <span className="text-[12px] text-white/40 tabular-nums group-aria-pressed:text-black/50">
                  {count(value)}
                </span>
              </>
            ),
          }))}
        />
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Remove all ${pluralize(list.length, 'title')} from My List?`))
              myList.clear();
          }}
          className="self-start text-[14px] font-medium text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline sm:self-auto"
        >
          Clear list
        </button>
      </div>

      {visible.length > 0 ? (
        <MediaGrid media={visible.map(asMedia)} genreMap={genreMap} />
      ) : (
        <p className="py-[48px] text-center text-[15px] text-white/55">
          No {filter === MediaMode.TV ? 'TV shows' : 'movies'} in your list yet.
        </p>
      )}
    </>
  );
}
