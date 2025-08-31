import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ROUTES } from '@/constants/route';
import { APIResponse, Media } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import fetchData from '../../../utils/fetchData';
import MediaCard from '../../Cards/MediaCard';
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselNext,
// 	CarouselPrevious,
// } from "../carousel";

interface Props {
  mediaMode: MediaMode;
  endpoint: string;
}

export default async function Slider({ mediaMode, endpoint }: Props) {
  const getTopRated = await fetchData<APIResponse>('3', endpoint);
  const topRatedMovies = getTopRated.results;

  return (
    <Carousel
      className="w-full "
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent>
        {topRatedMovies.map((topRated: Media) =>
          topRated.poster_path ? (
            <CarouselItem
              key={topRated.id}
              className={`
								basis-[calc((100%-1rem)/3)]
								sm:basis-[calc((100%-1rem)/4)]
								md:basis-[calc((100%-1rem)/5)]
								lg:basis-[calc((100%-1rem)/6)]
								xl:basis-[calc((100%-1rem)/6)]
								2xl:basis-[calc((100%-1rem)/8)]
								w-full
								py-8
								pl-8
														
								xl:pr-[0.8rem]
							`}
            >
              <Link href={ROUTES.MEDIA(mediaMode, topRated.id, topRated.title || topRated.name)}>
                <MediaCard className="rounded-2xl" media={topRated} mediaMode={mediaMode} />
              </Link>
            </CarouselItem>
          ) : null,
        )}
      </CarouselContent>
      <CarouselPrevious className="text-[1.5rem]" />
      <CarouselNext />
    </Carousel>
  );
}
