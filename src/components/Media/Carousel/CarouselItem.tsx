import Image from 'next/image';
import { useMemo } from 'react';

import { MoviesWithLogos } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';

import ActionButtons from './ActionButton';
import MediaMeta from './MediaMeta';

interface Props {
  movie: MoviesWithLogos;
  genres: Record<number, string>;
  isActive: boolean;
}

export default function CarouselItem({ movie, genres, isActive }: Props) {
  const title = movie.title ?? movie.name ?? 'Media';

  const backdropSrc = useMemo(
    () => getImageUrl(movie.backdrop_path, 'backdrop', 'original'),
    [movie.backdrop_path],
  );

  return (
    <li className=" flex-shrink-0 flex w-full h-full sm:h-[80%] md:h-full items-center justify-evenly flex-row relative">
      <Image
        src={backdropSrc}
        fill
        quality={75}
        alt={title}
        className="object-cover object-center brightness-[80%] carousel-mask-gradiant"
        priority={isActive}
      />

      <div className="absolute space-y-4 z-10 max-w-screen lg:w-[854px] bottom-0 sm:pb-0 md:pb-0 left-[25px] right-[25px] lg:left-[102px]">
        {movie.logoImage ? (
          <div className="relative h-[clamp(1rem,14vw,13rem)] w-[clamp(19rem,20vw,33rem)] mb-5">
            <Image
              src={movie.logoImage}
              fill
              quality={60}
              alt={`${title} logo`}
              className="object-contain object-center"
            />
          </div>
        ) : (
          <h2 className="text-[clamp(2rem,5vw,50px)] font-bold">{movie.title}</h2>
        )}

        <MediaMeta movie={movie} genres={genres} />

        {movie.overview && (
          <p className="hidden md:block mb-9 max-w-screen text-[clamp(1.6rem,2vw,2rem)] leading-[175%] text-white line-clamp-2-custom">
            {movie.overview}
          </p>
        )}

        <ActionButtons />
      </div>
    </li>
  );
}
