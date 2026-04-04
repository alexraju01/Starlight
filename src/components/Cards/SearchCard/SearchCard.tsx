'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import Dot from '@/components/ui/Dot/Dot';
import RatingIcon from '@/components/ui/RatingIcon/RatingIcon';
import { ROUTES } from '@/constants/route';
import { MediaProvider } from '@/context/MediaContext'; // Import your provider
import { MediaMode } from '@/types/mediaMode';
import { SearchMedia } from '@/types/searchMedia';
import { dateConverter } from '@/utils/date';
import getSearch from '@/utils/serverActions/getSearch';
import { capitalize } from '@/utils/stringUtils';

import MediaCard from '../MediaCard';

interface Props {
  query: string;
  genreMap?: Record<number, string>; // Accept the map as a prop
}

export default function SearchCard({ query, genreMap }: Props) {
  const [result, setResult] = useState<SearchMedia[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim().length > 1) {
        setIsLoading(true);
        try {
          const info: SearchMedia[] = await getSearch(query);
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
        <div className="absolute top-full left-0 mt-2 z-50 flex flex-col w-full overflow-y-auto rounded-[13px] bg-[#171717] border border-[#1D1D1D] shadow-xl">
          {isLoading ? (
            <p className="px-4 py-4 text-slate-400">Searching...</p>
          ) : hasSearched && result.length === 0 ? (
            <p className="px-4 py-4">No results found</p>
          ) : (
            result
              .filter(({ media_type }) => media_type !== 'person')
              .map((media, idx) => (
                // Wrap each result in a Provider so MediaCard can see the genres
                <MediaProvider
                  key={media.id}
                  genres={genreMap}
                  mediaMode={media.media_type as MediaMode}
                >
                  <Link
                    href={ROUTES.MEDIA(
                      media.media_type as any,
                      media.id,
                      media.title || media.name,
                    )}
                    className={`relative z-[10] max-h-[200px] flex gap-[1.5rem] px-[1.5rem] py-[1rem] transition-all duration-300 ease-in-out ${
                      idx % 2 === 0
                        ? 'bg-[#1c1c1e] hover:bg-[#123]'
                        : 'bg-[#171717] hover:bg-[#123]'
                    }`}
                  >
                    <div className="w-[6rem]">
                      <MediaCard media={media} mediaMode={media.media_type} />
                    </div>
                    <div className="flex flex-col gap-[0.75rem] w-full">
                      <div>
                        <h2 className="text-[1.3rem] leading-[1.5rem] overflow-hidden text-ellipsis line-clamp-1 text-white">
                          {media.title || media.name}
                        </h2>
                      </div>
                      <div className="flex items-center gap-[0.75rem] text-[#777777] text-[1.3rem]">
                        <RatingIcon
                          className="text-[1rem] rounded-[0.4rem]"
                          vote={media.vote_average ?? 0}
                        />
                        <Dot />
                        <p>{media.media_type === 'tv' ? 'TV' : capitalize(media.media_type)}</p>
                        <Dot className="hidden sm:block" />
                        <p className="hidden sm:block">
                          {dateConverter(media.release_date || media.first_air_date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </MediaProvider>
              ))
          )}
        </div>
      )}
    </>
  );
}
