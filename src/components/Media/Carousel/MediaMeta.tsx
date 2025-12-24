import Link from 'next/link';
import { useMemo } from 'react';

import { ROUTES } from '@/constants/route';
import { MoviesWithLogos } from '@/types/global';
import { dateConverter } from '@/utils/date';
import { capitalize } from '@/utils/string';

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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-8 text-white text-[clamp(1.6rem,2vw,2rem)]">
      <span className="whitespace-nowrap">{releaseDate}</span>

      <Separator />

      <span className="whitespace-nowrap capitalize">{mediaType}</span>

      <Separator />

      <div className="flex flex-wrap gap-x-1 gap-y-1">
        {genreLinks.map(({ id, label }, index) => (
          <Link
            key={id}
            href={ROUTES.GENRE(id)}
            className="hover:text-primary focus-visible:text-primary outline-none transition-colors"
          >
            {label}
            {index < genreLinks.length - 1 && <span>, </span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

const Separator = () => (
  <span aria-hidden className="opacity-70">
    |
  </span>
);
