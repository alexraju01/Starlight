import { MediaWithDetails } from '@/types/global';

import RatingBadge from './RatingBadge';
import SeasonBadge from './SeasonBadge';

interface MediaCardInfoProps {
  item: MediaWithDetails;
  title: string;
  dateStr: string;
  mediaDate: string;
  genreText: string;
  hasValidRating: boolean;
}

export const MediaCardInfo = ({
  item,
  title,
  dateStr,
  mediaDate,
  genreText,
  hasValidRating,
}: MediaCardInfoProps) => (
  <div className="flex flex-col gap-3 truncate py-5 md:px-[3px]">
    <div className="flex-between">
      <h3 className="truncate text-2xl font-medium text-white">{title}</h3>
      {hasValidRating && <RatingBadge rating={item.vote_average} />}
    </div>

    <div className="flex gap-3.5 text-xl text-gray-400">
      <time dateTime={mediaDate}>{dateStr}</time>
      <p>|</p>
      <p className="truncate">{genreText}</p>
    </div>

    <div className="flex min-h-[28px] items-center">
      <SeasonBadge item={item} />
    </div>
  </div>
);
