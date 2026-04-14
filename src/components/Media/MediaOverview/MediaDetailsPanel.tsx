import Link from 'next/link';

import { MediaCard } from '@/components/Cards';
import { RatingIcon } from '@/components/ui';
import { ROUTES } from '@/constants/route';
import { Genre, MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { dateConverter, displayRuntime } from '@/utils';
import { displayName } from '@/utils/stringUtils';

import SeasonEpisodeInfo from './SeasonEpisodeInfo';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

export default function MediaDetailsPanel({ media, mediaMode }: Props) {
  const { overview, vote_average, genres } = media;
  const releaseDate =
    media.media_type === MediaMode.MOVIE ? media.release_date : media.first_air_date;
  return (
    <div className="pt-[30%] xl:box-border xl:flex xl:h-[calc(100vh-100px)] xl:w-[50rem] xl:flex-col xl:justify-end xl:pt-0 xl:pb-[10rem] xl:pl-12">
      <h1 className="mb-8 text-center text-[3.5rem] font-bold drop-shadow-[2px_5px_5px_black]">
        {displayName(media)}
      </h1>

      <div className="flex w-full flex-col items-center text-[2.5rem] xl:mt-12 xl:rounded-[1.5rem] xl:border xl:border-white/90 xl:bg-white/10 xl:p-10 xl:shadow-[0_8px_32px_rgba(0,0,0,0.5)] xl:backdrop-blur-xl">
        <div className="relative mb-10 h-[40rem] w-[26rem] xl:hidden">
          <MediaCard media={media} mediaMode={mediaMode} />
        </div>

        <div className="mb-6 flex gap-12 text-[2rem] font-normal text-white/50">
          <p>{releaseDate ? dateConverter(releaseDate) : '----'}</p>
          <p>{displayRuntime(media)}</p>
          <RatingIcon vote={vote_average} />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4 text-[1.7rem] font-normal">
          {genres?.map((genre: Genre) => {
            return (
              <Link key={genre.id} href={ROUTES.GENRE(genre.name)}>
                <p className="genre-item">{genre.name}</p>
              </Link>
            );
          })}
        </div>

        {media.media_type === MediaMode.TV && (
          <SeasonEpisodeInfo
            seasons={media.number_of_seasons}
            episodes={media.number_of_episodes}
          />
        )}

        <p className="mb-8 text-[1.8rem] font-normal text-white/80 xl:line-clamp-7">{overview}</p>
      </div>
    </div>
  );
}
