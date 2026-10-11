import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { GenreWithMovies } from '@/types/genre';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName } from '@/utils/stringUtils';

interface GenreCollectionCardProps {
  genre: GenreWithMovies;
}

/** Genre tile for the home page row: a 2×2 poster collage and the genre name. */
const GenreCollectionCard = ({ genre }: GenreCollectionCardProps) => {
  return (
    <Link
      href={ROUTES.GENRE(genre.name)}
      className="flex h-full flex-col gap-[12px] rounded-[13.75px] border-[1.15px] border-solid border-[#262626] bg-[#1A1A1A] p-[12px] transition-colors hover:border-[#E50000] hover:bg-[#E500000F] lg:gap-[16px] lg:p-[16px]"
    >
      <div className="relative grid grid-cols-2 gap-[7px]">
        <div className="genre-gradient absolute inset-0 z-20 rounded-[9px]" />
        {genre.movies?.slice(0, 4).map((movie) => (
          <div key={movie.id} className="relative z-10 aspect-[0.8]">
            <Image
              src={getImageUrl(movie.poster_path, 'poster', 'w185')}
              alt={displayName(movie)}
              fill
              sizes="(min-width: 1024px) 10vw, (min-width: 768px) 13vw, 25vw"
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
