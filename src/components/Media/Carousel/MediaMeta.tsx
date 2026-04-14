import Link from 'next/link';
import { useMemo } from 'react';

import { ROUTES } from '@/constants/route';
import { MovieWithLogos } from '@/types/global';
import { dateConverter } from '@/utils/date';
import { capitalize } from '@/utils/stringUtils';

interface Props {
  movie: MovieWithLogos;
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
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(1.3rem,1.2vw,1.8rem)] md:mb-6">
      <span className="font-bold tracking-tight text-white">{releaseDate}</span>

      <DotSeparator />

      <span className="rounded-sm border border-red-600/50 bg-red-600/10 px-2 py-0.5 text-[10px] font-black tracking-widest text-red-500 uppercase md:text-[11px]">
        {mediaType}
      </span>

      <DotSeparator />

      {/* Genres - Using bullet points for a cleaner look*/}
      <div className="flex flex-wrap items-center gap-x-2">
        {genreLinks.map(({ id, label }, index) => (
          <div key={id} className="flex items-center">
            <Link
              href={ROUTES.GENRE(label)}
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
  <span className={`size-1.5 rounded-full bg-white/30 md:size-2 ${className}`} aria-hidden="true" />
);
