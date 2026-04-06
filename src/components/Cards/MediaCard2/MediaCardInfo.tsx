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
  <div className="flex flex-col  gap-3 py-5 truncate md:px-[10px]">
    <div className="flex justify-between">
      <h3 className="text-2xl text-white font-medium truncate">{title}</h3>
      {hasValidRating && <RatingBadge rating={item.vote_average} />}
    </div>

    <div className="flex gap-3.5 text-gray-400 text-xl">
      <time dateTime={mediaDate}>{dateStr}</time>
      <p>|</p>
      <p className="truncate">{genreText}</p>
    </div>

    <div className="min-h-[28px] flex items-center">
      <SeasonBadge item={item} />
    </div>
  </div>
);
