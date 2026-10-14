import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { MovieWithLogos } from '@/types/global';
import { formatMonthYear } from '@/utils/format';

interface Props {
  movie: MovieWithLogos;
  genres: Record<string, string>;
}

const Dot = () => <span aria-hidden="true" className="size-[4px] rounded-full bg-white/40" />;

/** Date · type badge · genre links, under the hero title. */
export default function MediaMeta({ movie, genres }: Props) {
  // Ids missing from the genre list are skipped rather than linking to a 404.
  const genreNames = (movie.genre_ids ?? []).flatMap((id) => genres[id] ?? []);
  const date = formatMonthYear(movie.release_date);

  return (
    <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[6px] text-[14px] md:mb-[16px] lg:text-[16px]">
      {date && (
        <>
          <span className="font-semibold text-white">{date}</span>
          <Dot />
        </>
      )}

      <span className="border-primary/60 bg-primary/15 text-accent-soft rounded-[4px] border px-[8px] py-[3px] text-[10px] leading-none font-bold tracking-[0.14em] uppercase lg:text-[11px]">
        Movie
      </span>

      {genreNames.map((name) => (
        <span key={name} className="flex items-center gap-x-[12px]">
          <Dot />
          <Link
            href={ROUTES.GENRE(name)}
            className="inline-flex min-h-[24px] items-center text-white/75 transition-colors hover:text-white"
          >
            {name}
          </Link>
        </span>
      ))}
    </div>
  );
}
