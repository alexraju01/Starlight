import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { GenreWithMovies } from '@/types/genre';
import { displayName } from '@/utils/stringUtils';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

interface GenreCollectionCardProps {
  genre: GenreWithMovies;
  totalItems: number;
}

const GenreCollectionCard = ({ genre, totalItems }: GenreCollectionCardProps) => {
  return (
    <Link
      href={ROUTES.GENRE(genre.name)}
      className="flex cursor-pointer flex-col gap-4 rounded-[13.75px] border-[1.15px] border-solid border-[#262626] bg-[#1A1A1A] px-[17px] pt-[17px] pb-[6px] transition hover:border-[#E50000] hover:bg-[#E500000F] xl:px-[34.39px] xl:pt-[34px] xl:pb-[12px]"
      style={{ width: `${100 / totalItems}%` }}
    >
      <div className="relative grid grid-cols-2 gap-[7px]">
        <div className="genre-gradient absolute inset-0 z-20 rounded-[9px]" />
        {genre.movies?.slice(0, 4).map((movie) => (
          <div key={movie.id} className="relative z-10 aspect-[0.8]">
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={displayName(movie)}
              fill
              className="img-cover-center rounded-[11px]"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="leading font-Helvetica flex items-center justify-between text-[14px] leading-[150%] font-medium text-white xl:text-[22px]">
          {genre.name}
        </span>
        <ArrowIcon />
      </div>
    </Link>
  );
};

const ArrowIcon = () => (
  <svg width="21" height="19" viewBox="0 0 25 23" fill="none">
    <path
      d="M1.56702 11.7297L23.0582 11.7297M23.0582 11.7297L13.3872 2.05872M23.0582 11.7297L13.3872 21.4008"
      stroke="white"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default GenreCollectionCard;
