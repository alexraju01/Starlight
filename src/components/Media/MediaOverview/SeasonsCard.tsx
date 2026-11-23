import Link from 'next/link';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { ROUTES } from '@/constants/route';
import { Season } from '@/types/seasons';
import { formatYear, pluralize } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  season: Season;
  showId: number;
  showName: string;
}

/** Season poster card; opens that season's episode list. */
export default function SeasonsCard({ season, showId, showName }: Props) {
  const meta = [
    season.episode_count ? pluralize(season.episode_count, 'Episode') : null,
    formatYear(season.air_date),
  ].filter(Boolean);

  return (
    <li className="w-[132px] shrink-0 snap-start sm:w-[148px] lg:w-[160px]">
      <Link href={ROUTES.SEASON(showId, showName, season.season_number)} className="group block">
        <div className="bg-card-bg relative aspect-[2/3] overflow-hidden rounded-[12px] ring-1 ring-white/[0.06] transition-[box-shadow] group-hover:ring-white/30">
          <ImageWithFallback
            src={getImageUrl(season.poster_path, 'poster', 'w342')}
            alt=""
            className="transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <p className="mt-[10px] line-clamp-1 text-[14px] leading-[1.4] font-semibold text-white decoration-white/40 underline-offset-2 group-hover:underline">
          {season.name}
        </p>
        {meta.length > 0 && (
          <p className="mt-[2px] text-[13px] leading-[1.4] text-white/55">{meta.join(' · ')}</p>
        )}
      </Link>
    </li>
  );
}
