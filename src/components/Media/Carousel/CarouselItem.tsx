import Image from 'next/image';

import { MovieWithLogos } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName } from '@/utils/stringUtils';

import ActionButtons from './ActionButton';
import MediaMeta from './MediaMeta';

interface CarouselItemProps {
  movie: MovieWithLogos;
  genres: Record<number, string>;
  priority?: boolean;
}

export default function CarouselItem({ movie, genres, priority }: CarouselItemProps) {
  const backdropSrc = getImageUrl(movie.backdrop_path, 'backdrop', 'original');

  return (
    <li className="flex-shrink-0 flex-evenly w-full h-full  relative">
      <Image
        src={backdropSrc}
        fill
        quality={75}
        alt={displayName(movie)}
        className="img-cover-center brightness-[80%] carousel-mask-gradiant"
        priority={priority}
      />

      <div className="absolute space-y-4 z-10 max-w-screen lg:w-[854px] bottom-0 sm:pb-0 md:pb-0 inset-x-[25px] lg:left-[102px]">
        {movie.logoImage ? (
          <div className="relative h-[clamp(1rem,14vw,13rem)] w-[clamp(19rem,20vw,33rem)] mb-5">
            <Image
              src={movie.logoImage}
              fill
              loading="eager"
              quality={60}
              alt={`${displayName(movie)} logo`}
              className="img-contain-center"
            />
          </div>
        ) : (
          <h2 className="text-[clamp(2rem,5vw,50px)] font-bold text-white">{displayName(movie)}</h2>
        )}

        <MediaMeta movie={movie} genres={genres} />

        {movie.overview && (
          <div className="hidden md:block">
            <p className="mb-9 max-w-screen text-[clamp(1.6rem,2vw,2rem)] leading-[175%] text-white line-clamp-3-custom">
              {movie.overview}
            </p>
          </div>
        )}

        <ActionButtons />
      </div>
    </li>
  );
}
