import clsx from 'clsx';
import Link from 'next/link';

import DragScrollList from '@/components/ui/DragScrollList';
import { ROUTES } from '@/constants/route';
import { Season } from '@/types/seasons';

interface Props {
  showId: number;
  showName: string;
  /** In display order (specials last). */
  seasons: Season[];
  current: number;
}

/** Chips for every season of the show; the current one is highlighted. */
export default function SeasonSwitcher({ showId, showName, seasons, current }: Props) {
  if (seasons.length < 2) return null;

  return (
    <nav aria-label="Seasons" className="min-w-0">
      <DragScrollList className="-mx-[16px] flex gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none] sm:-mx-[24px] sm:px-[24px] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
        {seasons.map((season) => {
          const isCurrent = season.season_number === current;
          return (
            <li key={season.id}>
              <Link
                href={ROUTES.SEASON(showId, showName, season.season_number)}
                aria-current={isCurrent ? 'page' : undefined}
                className={clsx(
                  'inline-flex h-[36px] shrink-0 items-center rounded-full border px-[14px] text-[14px] font-medium whitespace-nowrap transition-colors',
                  isCurrent
                    ? 'border-primary bg-primary text-white'
                    : 'border-white/12 bg-white/[0.04] text-white/75 hover:border-white/30 hover:bg-white/10 hover:text-white',
                )}
              >
                {season.season_number === 0 ? 'Specials' : `Season ${season.season_number}`}
              </Link>
            </li>
          );
        })}
      </DragScrollList>
    </nav>
  );
}
