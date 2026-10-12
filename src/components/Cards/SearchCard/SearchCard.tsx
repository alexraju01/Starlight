'use client';

import clsx from 'clsx';
import { ArrowRight, ImageOff, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { getMediaDate } from '@/utils/date/formatDate';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { formatYear } from '@/utils/mediaFormat';
import { searchMediaAction } from '@/utils/serverActions/media';
import { displayName } from '@/utils/stringUtils';

import type { Route } from 'next';

interface Props {
  /** Listbox id; options get `${id}-option-${index}` for aria-activedescendant. */
  id: string;
  query: string;
  /** Highlighted option (keyboard / hover), or -1. */
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  /** Reports the options' destinations (results, then "See all") whenever they change. */
  onOptionsChange: (hrefs: Route[]) => void;
  /** Navbar: a wider panel anchored to the field's right edge on desktop. */
  alignRight?: boolean;
}

const MAX_RESULTS = 5;

export const optionId = (listboxId: string, index: number) => `${listboxId}-option-${index}`;

/** "Upcoming" for unreleased titles, the score once people have voted, otherwise nothing. */
function ratingLabel(media: MediaWithDetails) {
  const date = getMediaDate(media);
  if (date && Date.parse(date) > Date.now()) return 'upcoming';
  return media.vote_count > 0 ? media.vote_average.toFixed(1) : null;
}

/** Live results dropdown for the navbar / 404 search field (a combobox listbox). */
export default function SearchCard({
  id,
  query,
  activeIndex,
  onActiveIndexChange,
  onOptionsChange,
  alignRight = false,
}: Props) {
  const [state, setState] = useState<{
    query: string;
    results: MediaWithDetails[];
    status: 'loading' | 'done' | 'error';
  }>({ query: '', results: [], status: 'loading' });
  const listRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length <= 1) return;

    // Ignore responses that arrive after the user has typed something newer.
    let cancelled = false;

    searchMediaAction(trimmedQuery)
      .then((results) => {
        if (!cancelled) setState({ query: trimmedQuery, results, status: 'done' });
      })
      .catch(() => {
        if (!cancelled) setState({ query: trimmedQuery, results: [], status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [trimmedQuery]);

  // Results for an older query are treated as still loading.
  const isLoading = state.query !== trimmedQuery || state.status === 'loading';
  const results = useMemo(
    () => (isLoading ? [] : state.results.slice(0, MAX_RESULTS)),
    [isLoading, state.results],
  );
  const seeAllHref = ROUTES.DISCOVER(trimmedQuery);

  // Tell the field which options exist, so ↑/↓/Enter can work from the input. Memoized so
  // the effect only fires when the list actually changes.
  const options = useMemo(
    () =>
      results.length
        ? [...results.map((m) => ROUTES.MEDIA(m.media_type, m.id, displayName(m))), seeAllHref]
        : [],
    [results, seeAllHref],
  );
  useEffect(() => {
    onOptionsChange(options);
  }, [options, onOptionsChange]);

  // Keep the highlighted option in view when moving with the keyboard.
  useEffect(() => {
    if (activeIndex < 0) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(optionId(id, activeIndex))}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, id]);

  if (trimmedQuery.length <= 1) return null;

  const optionClass = (index: number) =>
    clsx(
      'flex items-center gap-[12px] rounded-[10px] p-[8px] transition-colors',
      index === activeIndex ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]',
    );

  return (
    <div
      ref={listRef}
      className={clsx(
        'absolute top-full z-50 mt-[8px] flex max-h-[min(70vh,560px)] w-full flex-col overflow-y-auto overscroll-contain rounded-[14px] border border-white/10 bg-[#161616]/95 p-[6px] shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl',
        alignRight ? 'right-0 lg:w-[420px]' : 'left-0',
      )}
    >
      <p className="sr-only" aria-live="polite">
        {isLoading ? 'Searching' : `${results.length} results`}
      </p>

      {isLoading ? (
        <ul aria-hidden="true" className="flex flex-col">
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="flex animate-pulse items-center gap-[12px] p-[8px]">
              <div className="h-[66px] w-[44px] rounded-[6px] bg-white/[0.08]" />
              <div className="flex flex-1 flex-col gap-[8px]">
                <div className="h-[14px] w-3/4 rounded-[4px] bg-white/[0.08]" />
                <div className="h-[12px] w-1/2 rounded-[4px] bg-white/[0.08]" />
              </div>
            </li>
          ))}
        </ul>
      ) : state.status === 'error' ? (
        <p className="p-[14px] text-[14px] text-red-300">Search is unavailable right now.</p>
      ) : results.length === 0 ? (
        <p className="p-[14px] text-[14px] text-white/70">
          No results for “<span className="font-semibold text-white">{trimmedQuery}</span>”
        </p>
      ) : (
        <ul id={id} role="listbox" aria-label="Search results" className="flex flex-col">
          {results.map((media, index) => {
            const title = displayName(media);
            const poster = getImageUrl(media.poster_path, 'poster', 'w92');
            const rating = ratingLabel(media);
            const meta = [
              media.media_type === MediaMode.TV ? 'TV Series' : 'Movie',
              formatYear(getMediaDate(media)),
            ].filter(Boolean);

            return (
              <li key={`${media.media_type}-${media.id}`}>
                <Link
                  id={optionId(id, index)}
                  role="option"
                  aria-selected={index === activeIndex}
                  href={ROUTES.MEDIA(media.media_type, media.id, title)}
                  onMouseEnter={() => onActiveIndexChange(index)}
                  className={optionClass(index)}
                >
                  <div className="relative h-[66px] w-[44px] shrink-0 overflow-hidden rounded-[6px] bg-white/[0.06]">
                    {poster ? (
                      <Image src={poster} alt="" fill sizes="44px" className="object-cover" />
                    ) : (
                      <ImageOff
                        aria-hidden="true"
                        className="absolute inset-0 m-auto size-[18px] text-white/30"
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col gap-[4px]">
                    <p className="line-clamp-1 text-[14px] leading-[1.35] font-semibold text-white">
                      {title}
                    </p>
                    <p className="flex flex-wrap items-center gap-x-[8px] text-[13px] text-white/50">
                      {meta.join(' · ')}
                      {rating === 'upcoming' ? (
                        <span className="border-primary/60 bg-primary/15 rounded-[4px] border px-[6px] py-[1px] text-[10px] font-bold tracking-[0.1em] text-[#ff7a6e] uppercase">
                          Upcoming
                        </span>
                      ) : rating ? (
                        <span className="flex items-center gap-[4px] text-white/70">
                          <Star
                            aria-hidden="true"
                            className="size-[12px] fill-[#FACC15] text-[#FACC15]"
                          />
                          {rating}
                        </span>
                      ) : (
                        <span>Not rated yet</span>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
          <li className="mt-[4px] border-t border-white/[0.06] pt-[4px]">
            <Link
              id={optionId(id, results.length)}
              role="option"
              aria-selected={activeIndex === results.length}
              href={seeAllHref}
              onMouseEnter={() => onActiveIndexChange(results.length)}
              className={clsx(
                optionClass(results.length),
                'justify-between px-[12px] text-[14px] font-medium text-white/80',
              )}
            >
              See all results for “{trimmedQuery}”
              <ArrowRight aria-hidden="true" className="size-[16px]" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
