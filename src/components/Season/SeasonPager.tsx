import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { Season } from '@/types/seasons';
import { formatYear, pluralize } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  showId: number;
  showName: string;
  /** In display order (specials last). */
  seasons: Season[];
  current: number;
}

function PagerLink({
  season,
  href,
  direction,
}: {
  season: Season;
  href: ReturnType<typeof ROUTES.SEASON>;
  direction: 'previous' | 'next';
}) {
  const Arrow = direction === 'previous' ? ArrowLeft : ArrowRight;
  const meta = [
    season.episode_count ? pluralize(season.episode_count, 'Episode') : null,
    formatYear(season.air_date),
  ].filter(Boolean);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-[14px] rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-[12px] transition-colors hover:border-white/25 hover:bg-white/[0.06] ${direction === 'next' ? 'flex-row-reverse text-right' : ''}`}
    >
      <Arrow
        aria-hidden="true"
        className="size-[20px] shrink-0 text-white/50 transition-transform group-hover:text-white"
      />
      <span className="bg-card-bg relative h-[72px] w-[48px] shrink-0 overflow-hidden rounded-[8px] ring-1 ring-white/10">
        {season.poster_path && (
          <Image
            src={getImageUrl(season.poster_path, 'poster', 'w185')}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-semibold tracking-[0.08em] text-white/45 uppercase">
          {direction === 'previous' ? 'Previous' : 'Next'}
        </span>
        <span className="block truncate text-[16px] font-semibold text-white">{season.name}</span>
        {meta.length > 0 && (
          <span className="block text-[13px] text-white/55">{meta.join(' · ')}</span>
        )}
      </span>
    </Link>
  );
}

/** Previous / next season links at the end of the episode list. */
export default function SeasonPager({ showId, showName, seasons, current }: Props) {
  const index = seasons.findIndex((s) => s.season_number === current);
  const previous = index > 0 ? seasons[index - 1] : null;
  const next = index >= 0 && index < seasons.length - 1 ? seasons[index + 1] : null;
  if (!previous && !next) return null;

  return (
    <nav aria-label="More seasons" className="grid gap-[12px] sm:grid-cols-2">
      {previous ? (
        <PagerLink
          season={previous}
          href={ROUTES.SEASON(showId, showName, previous.season_number)}
          direction="previous"
        />
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <PagerLink
          season={next}
          href={ROUTES.SEASON(showId, showName, next.season_number)}
          direction="next"
        />
      )}
    </nav>
  );
}
