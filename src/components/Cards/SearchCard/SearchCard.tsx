'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Dot from '@/components/ui/Dot/Dot';
import RatingIcon from '@/components/ui/RatingIcon/RatingIcon';
import { ROUTES } from '@/constants/route';
import { MediaProvider } from '@/context/MediaContext';
import { MediaMode } from '@/types/mediaMode';
import { SearchMedia } from '@/types/searchMedia';
import { capitalize, dateConverter } from '@/utils';
import getSearch from '@/utils/serverActions/getSearch';

import MediaCard from '../MediaCard';

interface Props {
  query: string;
  genreMap?: Record<number, string>;
}

export default function SearchCard({ query, genreMap }: Props) {
  const [result, setResult] = useState<SearchMedia[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length > 1) {
        setIsLoading(true);
        try {
          const info: SearchMedia[] = await getSearch(trimmedQuery);
          setResult(info.slice(0, 4));
          setHasSearched(true);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResult([]);
        setHasSearched(false);
      }
    };
    fetchData();
  }, [query]);

  return (
    <>
      {query.length > 1 && (
        <div className="absolute top-full left-0 z-50 mt-2 flex w-full flex-col overflow-y-auto rounded-[13px] border border-[#1D1D1D] bg-[#171717] shadow-xl">
          {isLoading ? (
            <p className="px-4 py-4 text-slate-400">Searching...</p>
          ) : hasSearched && result.length === 0 ? (
            <p className="px-4 py-4 text-white">No results found</p>
          ) : (
            result
              // Filter only for types supported by your MediaMode
              .filter((media) => media.media_type === 'movie' || media.media_type === 'tv')
              .map((media, idx) => {
                const mode = media.media_type as MediaMode;
                const title = media.title || media.name || 'Untitled';
                const date = media.release_date || media.first_air_date;

                return (
                  <MediaProvider key={media.id} genres={genreMap ?? {}} mediaMode={mode}>
                    <Link
                      href={ROUTES.MEDIA(mode, media.id, title)}
                      className={clsx(
                        'relative z-[10] flex max-h-[200px] gap-[1.5rem] px-[1.5rem] py-[1rem] transition-all duration-300 ease-in-out hover:bg-[#123]',
                        idx % 2 === 0 ? 'bg-[#1c1c1e]' : 'bg-[#171717]',
                      )}
                    >
                      <div className="w-[6rem] flex-shrink-0">
                        <MediaCard media={media} mediaMode={mode} />
                      </div>

                      <div className="flex w-full min-w-0 flex-col gap-[0.75rem]">
                        <h2 className="line-clamp-1 overflow-hidden text-[1.3rem] leading-[1.5rem] font-medium text-ellipsis text-white">
                          {title}
                        </h2>

                        <div className="flex items-center gap-[0.75rem] text-[1.1rem] text-[#777777]">
                          <RatingIcon
                            className="rounded-[0.4rem] text-[0.9rem]"
                            vote={media.vote_average ?? 0}
                          />
                          <Dot />
                          <p className="whitespace-nowrap">
                            {mode === 'tv' ? 'TV Series' : capitalize(mode)}
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
                  </MediaProvider>
                );
              })
          )}
        </div>
      )}
    </>
  );
}
