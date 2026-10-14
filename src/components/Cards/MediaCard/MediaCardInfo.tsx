import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { formatMonthYear } from '@/utils/format';
import { formatGenres } from '@/utils/genre';
import { getMediaDate } from '@/utils/media';

import RatingBadge from './RatingBadge';
import SeasonBadge from './SeasonBadge';

interface Props {
  item: MediaWithDetails;
  title: string;
  genres: Record<number, string>;
}

/** Title, rating, date, genres and (for shows) the season count under a card's artwork. */
export default function MediaCardInfo({ item, title, genres }: Props) {
  const date = getMediaDate(item);

  return (
    <div className="flex flex-col gap-[8px] truncate py-[12px] md:px-[3px]">
      <div className="flex items-center justify-between gap-[8px]">
        <h3 className="truncate text-[15px] leading-[20px] font-medium text-white">{title}</h3>
        {item.vote_average > 0 && <RatingBadge rating={item.vote_average} />}
      </div>

      <div className="flex gap-[8px] text-[13px] leading-[18px] text-gray-400">
        <time dateTime={date}>{formatMonthYear(date, 'short') ?? 'Unknown'}</time>
        <p>|</p>
        <p className="truncate">{formatGenres(item, genres)}</p>
      </div>

      {item.media_type === MediaMode.TV && (
        <div className="flex min-h-[28px] items-center">
          {item.number_of_seasons ? <SeasonBadge seasons={item.number_of_seasons} /> : null}
        </div>
      )}
    </div>
  );
}
