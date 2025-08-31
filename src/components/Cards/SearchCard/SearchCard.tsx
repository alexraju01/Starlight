'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Dot from '@/components/ui/Dot/Dot';
import RatingIcon from '@/components/ui/RatingIcon';
import { ROUTES } from '@/constants/route';
import { SearchMedia } from '@/types/searchMedia';
// import { dateConverter } from "../../utils/date/dateConverter";
// import getSearch from "../../utils/serverActions/getSearch";
// import Dot from "../ui/Dot/Dot";
// import MediaCard from "../cards/MediaCard/MediaCard";
// import RatingIcon from "../RatingIcon/RatingIcon";
import { dateConverter } from '@/utils/date';
import getSearch from '@/utils/serverActions/getSearch';
import { capitalize } from '@/utils/string/capitalize';

import MediaCard from '../MediaCard';

interface Props {
  query: string;
}

export default function SearchCard({ query }: Props) {
  const [result, setResult] = useState<SearchMedia[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim().length > 1) {
        const info: SearchMedia[] = await getSearch(query);
        setResult(info.slice(0, 4));
      }
    };
    fetchData();
  }, [query]);

  return (
    <>
      {query.length > 1 && (
        <div className="absolute left-0 md:left-[clamp(-250px,-90vw,1000px)] lg:-left-40 xl:left-0 z-[99999] flex flex-col bg-[#171717] h-fit w-full md:w-[clamp(25rem,50vw,45rem)] text-[1.3rem]">
          {result.length > 0 ? (
            result
              .filter(({ media_type }) => media_type !== 'person')
              .map((media, idx) => (
                <Link
                  key={media.id}
                  href={ROUTES.MEDIA(media.media_type as any, media.id, media.title || media.name)}
                  className={`flex gap-[1.5rem] px-[1.5rem] py-[1rem] transition-all duration-300 ease-in-out ${
                    idx % 2 === 0 ? 'bg-[#1c1c1e] hover:bg-[#123]' : 'hover:bg-[#123]'
                  }`}
                >
                  <div className="w-[6rem]">
                    <MediaCard media={media} mediaMode={media.media_type} />
                  </div>
                  <div className="flex flex-col gap-[0.75rem] w-full">
                    <div>
                      <h2 className="text-[1.3rem] leading-[1.5rem] overflow-hidden text-ellipsis line-clamp-1">
                        {media.title || media.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-[0.75rem] text-[#777777] text-[1.3rem]">
                      <RatingIcon
                        className="text-[1rem] rounded-[0.4rem]"
                        vote={media.vote_average ?? 0}
                      />
                      <Dot />
                      <p>
                        {media.media_type === 'tv'
                          ? media.media_type.toUpperCase()
                          : capitalize(media.media_type)}
                      </p>
                      <Dot className="hidden sm:block" />
                      <p className="hidden sm:block">
                        {dateConverter(media.release_date || media.first_air_date)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <p className="px-4 py-2">No results found</p>
          )}
        </div>
      )}
    </>
  );
}
