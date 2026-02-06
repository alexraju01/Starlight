import Link from 'next/link';
import { useMemo } from 'react';

import { ROUTES } from '@/constants/route';
import { MoviesWithLogos } from '@/types/global';
import { dateConverter } from '@/utils/date';
import { capitalize } from '@/utils/stringUtils';

interface Props {
  movie: MoviesWithLogos;
  genres: Record<string, string>;
}

export default function MediaMeta({ movie, genres }: Props) {
  const releaseDate = useMemo(() => dateConverter(movie.release_date), [movie.release_date]);
  const mediaType = useMemo(() => capitalize(movie.media_type), [movie.media_type]);

  const genreLinks = useMemo(
    () =>
      (movie.genre_ids ?? []).map((id) => ({
        id,
        label: genres[id] ?? 'Unknown',
      })),
    [movie.genre_ids, genres],
  );

  return (
    <div className="flex flex-wrap items-center text-[clamp(1.3rem,1.2vw,1.8rem)] gap-x-3 gap-y-2 md:mb-6">
      {/* Date - Clean white with slight tracking */}
      <span className=" font-bold text-white tracking-tight">{releaseDate}</span>

      <DotSeparator />

      {/* Media Type - Using your Brand Red for the border/text accent */}
      <span
        className="
        px-2 py-0.5 
        rounded-sm 
        bg-red-600/10 
        border border-red-600/50 
        text-red-500 
        text-[10px] md:text-[11px] 
        font-black uppercase tracking-widest
      "
      >
        {mediaType}
      </span>

      <DotSeparator />

      {/* Genres - Using bullet points for a cleaner look than commas */}
      <div className="flex flex-wrap items-center gap-x-2">
        {genreLinks.map(({ id, label }, index) => (
          <div key={id} className="flex items-center">
            <Link
              href={ROUTES.GENRE(id)}
              className="text-[clamp(1.1rem,1.1vw,1.5rem)] text-gray-300 transition-colors hover:text-white"
            >
              {label}
            </Link>
            {index < genreLinks.length - 1 && <DotSeparator className="ml-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

const DotSeparator = ({ className }: { className?: string }) => (
  <span
    className={`size-1.5 md:size-2 rounded-full bg-white/30  ${className}`}
    aria-hidden="true"
  />
);
