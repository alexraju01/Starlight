import Link from 'next/link';

import { MediaCard } from '@/components/Cards';
import { RatingIcon } from '@/components/ui';
import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';
import { isMovie, isTVShow, dateConverter, displayRuntime } from '@/utils';

import { SeasonEpisodeInfo } from '.';

import type { Genre, MediaMode } from '@/types';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

export default function MediaDetailsPanel({ media, mediaMode }: Props) {
  const { overview, vote_average, genres } = media;
  const mediaTitle = isMovie(media) ? media.title : media.name;
  const releaseDate = isMovie(media) ? media.release_date : media.first_air_date;

  return (
    <div className="pt-[30%] px-12 xl:pt-0 xl:pb-[10rem] xl:pl-12 xl:h-[calc(100vh-100px)] xl:w-[50rem] xl:box-border xl:flex xl:flex-col xl:justify-end">
      <h1 className="text-center text-[3.5rem] mb-8 font-bold drop-shadow-[2px_5px_5px_black]">
        {mediaTitle}
      </h1>

      <div
        className="flex flex-col items-center text-[2.5rem] w-full 
        xl:rounded-[1.5rem] xl:border xl:border-white/90 
        xl:bg-white/10 xl:p-10 xl:mt-12 
        xl:backdrop-blur-xl xl:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="relative h-[40rem] w-[26rem] mb-10 xl:hidden">
          <MediaCard media={media} mediaMode={mediaMode} />
        </div>

        <div className="flex gap-12 text-[2rem] font-normal mb-6 text-white/50">
          <p>{releaseDate ? dateConverter(releaseDate) : '----'}</p>
          <p>{displayRuntime(media)}</p>
          <RatingIcon vote={vote_average} />
        </div>

        <div className="flex flex-wrap justify-center font-normal gap-4 text-[1.7rem] mb-8">
          {genres?.map((genre: Genre) => (
            <Link key={genre.id} href={ROUTES.GENRE(genre.id)}>
              <p className="genre-item">{genre.name}</p>
            </Link>
          ))}
        </div>

        {isTVShow(media) && media.number_of_seasons != null && media.number_of_episodes != null && (
          <SeasonEpisodeInfo
            metaData={{
              number_of_seasons: media.number_of_seasons,
              number_of_episodes: media.number_of_episodes,
            }}
          />
        )}

        <p className="font-normal text-[1.8rem] mb-8 text-white/80 xl:line-clamp-7">{overview}</p>
      </div>
    </div>
  );
}
