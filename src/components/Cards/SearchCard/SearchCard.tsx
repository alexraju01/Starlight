'use client';

import clsx from 'clsx';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Dot from '@/components/ui/Dot/Dot';
import RatingIcon from '@/components/ui/RatingIcon/RatingIcon';
import { ROUTES } from '@/constants/route';
import { MediaMode } from '@/types/mediaMode';
import { SearchMedia } from '@/types/searchMedia';
import { capitalize, dateConverter } from '@/utils';
import { getImageUrl } from '@/utils/image/getImageUrl';
import getSearch from '@/utils/serverActions/getSearch';

interface Props {
  id?: string;
  query: string;
}

const MAX_RESULTS = 5;

export default function SearchCard({ id, query }: Props) {
  const [state, setState] = useState<{
    query: string;
    results: SearchMedia[];
    status: 'loading' | 'done' | 'error';
  }>({ query: '', results: [], status: 'loading' });

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length <= 1) return;

    // Ignore responses that arrive after the user has typed something newer.
    let cancelled = false;

    getSearch(trimmedQuery)
      .then((results: SearchMedia[]) => {
        if (!cancelled) setState({ query: trimmedQuery, results, status: 'done' });
      })
      .catch(() => {
        if (!cancelled) setState({ query: trimmedQuery, results: [], status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [trimmedQuery]);

  if (trimmedQuery.length <= 1) return null;

  // Results for an older query are treated as still loading.
  const isLoading = state.query !== trimmedQuery || state.status === 'loading';
  const results = state.results.slice(0, MAX_RESULTS);

  return (
    <div
      id={id}
      className="absolute top-full left-0 z-50 mt-2 flex max-h-[min(70vh,600px)] w-full flex-col overflow-y-auto overscroll-contain rounded-[13px] border border-[#1D1D1D] bg-[#171717] shadow-xl"
    >
      <p className="sr-only" aria-live="polite">
        {isLoading ? 'Searching' : `${state.results.length} results`}
      </p>

      {isLoading ? (
        <ul aria-hidden="true" className="flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex animate-pulse gap-[1.5rem] px-[1.5rem] py-[1rem]">
              <div className="h-[9rem] w-[6rem] rounded-md bg-white/10" />
              <div className="flex flex-1 flex-col gap-3 py-2">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
              </div>
            </li>
          ))}
        </ul>
      ) : state.status === 'error' ? (
        <p className="px-4 py-4 text-[14px] text-red-300">Search is unavailable right now.</p>
      ) : results.length === 0 ? (
        <p className="px-4 py-4 text-[14px] text-white">
          No results for “<span className="font-semibold">{trimmedQuery}</span>”
        </p>
      ) : (
        <>
          <ul className="flex flex-col">
            {results.map((media, idx) => {
              const mode = media.media_type as MediaMode;
              const title = media.title || media.name || 'Untitled';
              const date = media.release_date || media.first_air_date;
              const poster = getImageUrl(media.poster_path, 'poster', 'w92');

              return (
                <li key={`${mode}-${media.id}`}>
                  <Link
                    href={ROUTES.MEDIA(mode, media.id, title)}
                    className={clsx(
                      'relative flex gap-[1.5rem] px-[1.5rem] py-[1rem] transition-colors duration-200 hover:bg-white/10 focus-visible:bg-white/10',
                      idx % 2 === 0 ? 'bg-[#1c1c1e]' : 'bg-[#171717]',
                    )}
                  >
                    <div className="relative h-[9rem] w-[6rem] flex-shrink-0 overflow-hidden rounded-md bg-white/5">
                      {poster ? (
                        <Image src={poster} alt="" fill sizes="60px" className="object-cover" />
                      ) : (
                        <ImageOff className="absolute inset-0 m-auto size-6 text-white/30" />
                      )}
                    </div>

                    <div className="flex w-full min-w-0 flex-col justify-center gap-[0.75rem]">
                      <p className="line-clamp-1 text-[14px] leading-[1.4] font-medium text-white">
                        {title}
                      </p>

                      <div className="flex items-center gap-[0.75rem] text-[12px] text-[#9a9a9a]">
                        <RatingIcon
                          className="rounded-[0.4rem] text-[0.9rem]"
                          vote={media.vote_average ?? 0}
                        />
                        <Dot />
                        <p className="whitespace-nowrap">
                          {mode === MediaMode.TV ? 'TV Series' : capitalize(mode)}
                        </p>
                        {date && (
                          <>
                            <Dot className="hidden sm:block" />
                            <p className="hidden whitespace-nowrap sm:block">
                              {dateConverter(date)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={ROUTES.DISCOVER(trimmedQuery)}
            className="border-t border-white/10 px-[1.5rem] py-[1.2rem] text-center text-[14px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            See all results for “{trimmedQuery}”
          </Link>
        </>
      )}
    </div>
  );
}
