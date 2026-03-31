import Image from 'next/image';

import { MoviesWithLogos } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';

import ActionButtons from './ActionButton';
import MediaMeta from './MediaMeta';

interface CarouselItemProps {
  movie: MoviesWithLogos;
  genres: Record<number, string>;
  priority?: boolean;
}

export default function CarouselItem({ movie, genres, priority }: CarouselItemProps) {
  const title = movie.title ?? movie.name ?? 'Media';
  const backdropSrc = getImageUrl(movie.backdrop_path, 'backdrop', 'original');

  return (
    <li className="flex-shrink-0 flex w-full h-full items-center justify-evenly relative">
      <Image
        src={backdropSrc}
        fill
        quality={75}
        alt={title}
        className="object-cover object-center brightness-[80%] carousel-mask-gradiant"
        priority={priority}
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
          <h2 className="text-[clamp(2rem,5vw,50px)] font-bold text-white">{title}</h2>
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
