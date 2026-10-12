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
    <div className="flex flex-col gap-3 truncate py-5 md:px-[3px]">
      <div className="flex-between">
        <h3 className="truncate text-2xl font-medium text-white">{title}</h3>
        {item.vote_average > 0 && <RatingBadge rating={item.vote_average} />}
      </div>

      <div className="flex gap-3.5 text-xl text-gray-400">
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
