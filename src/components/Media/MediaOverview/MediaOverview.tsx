/* eslint-disable camelcase */
import Image from 'next/image';
import Link from 'next/link';

import { CastMember } from '@/types/cast';
import { Genre } from '@/types/genre';
import { Media } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import fetchData from '@/utils/fetchData';
import Icons from '@/utils/icons';

import { isMovie, isTVShow } from '@/utils/typeGuard';
import { dateConverter, displayRuntime } from '@/utils/date';
import GoBack from '@/components/Navigation/GoBack';
import MediaCard from '@/components/Cards/MediaCard';
import RatingIcon from '@/components/ui/RatingIcon';
import SeasonEpisodeInfo from './SeasonEpisodeInfo';
import Button from '@/components/ui/Button/Button';
import CastContainer from '../Cast/CastContainer';
import SimilarMedia from './SimilarMedia';
import Seasons from './Seasons';

interface Props {
  params: string;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

async function fetchMediaData(params: string, mediaMode: MediaMode.TV | MediaMode.MOVIE) {
  try {
    const [mediaDetails, credits] = await Promise.all([
      fetchData<Media>('3', `/${mediaMode}/${params}`),
      fetchData<{ cast: CastMember[] }>('3', `/${mediaMode}/${params}/credits`),
    ]);

    // ✅ Dynamically add media_type based on mediaMode
    if (mediaDetails) {
      mediaDetails.media_type = mediaMode;
    }
    return { mediaDetails, credits };
  } catch (error) {
    console.error('Error fetching media data:', error);
    return { mediaDetails: null, credits: { cast: [] } }; // Handle errors gracefully
  }
}

export default async function MediaOverview({ params, mediaMode }: Props) {
  const { mediaDetails, credits } = await fetchMediaData(params, mediaMode);
  if (!mediaDetails) return <div>Error loading media details.</div>;

  // Destructure shared properties
  const { backdrop_path, poster_path, overview, vote_average, genres } = mediaDetails;

  // Determine type-specific fields
  const mediaTitle = isMovie(mediaDetails) ? mediaDetails.title : mediaDetails.name;
  const releaseDate = isMovie(mediaDetails)
    ? mediaDetails.release_date
    : mediaDetails.first_air_date;

  const mediaSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : poster_path
      ? `https://image.tmdb.org/t/p/original${poster_path}`
      : '/placeholder.jpg';

  return (
    <div className=" w-full h-full">
      <Image
        alt={mediaTitle}
        src={mediaSrc}
        fill
        className="absolute left-0 h-full w-full object-cover z-[-1] brightness-[0.9] animate-fadeIn top-[-10rem] 
                            xl:h-auto xl:brightness-100 mask-gradient-default"
      />
      <GoBack />

      <div className="pt-[30%] px-12 xl:pt-0 xl:pb-[10rem] xl:pl-12 xl:h-screen xl:w-[50rem] xl:box-border xl:flex xl:flex-col xl:justify-end">
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
            <MediaCard media={mediaDetails} mediaMode={mediaMode} />
          </div>

          <div className="flex gap-12 text-[2rem] font-normal mb-6 text-white/50">
            <p>{releaseDate ? dateConverter(releaseDate) : '----'}</p>

            <p>{displayRuntime(mediaDetails)}</p>
            <RatingIcon vote={vote_average} />
          </div>

          <div className="flex flex-wrap justify-center font-normal gap-4 text-[1.7rem] mb-8">
            {genres?.map((genre: Genre) => (
              <Link key={genre.id} href={`/genre/${genre.id}`}>
                <p className="genre-item">{genre.name}</p>
              </Link>
            ))}
          </div>

          {isTVShow(mediaDetails) && (
            <SeasonEpisodeInfo
              metaData={{
                number_of_seasons: mediaDetails.number_of_seasons,
                number_of_episodes: mediaDetails.number_of_episodes,
              }}
            />
          )}

          <p className="font-normal text-[1.8rem] mb-8 text-white/80 xl:line-clamp-7">{overview}</p>

          <Button icon={Icons.play}>Watch Now</Button>
        </div>
      </div>

      {isTVShow(mediaDetails) && <Seasons seasons={mediaDetails.seasons} />}
      <CastContainer castList={credits.cast.slice(0, 10)} />
      <SimilarMedia mediaMode={mediaMode} params={params} />
    </div>
  );
}
