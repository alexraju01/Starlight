import { Star } from 'lucide-react';

/** Star and score (one decimal) on a media card. */
export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex shrink-0 items-center gap-[5px]">
      <Star aria-hidden="true" className="fill-rating text-rating size-[18px]" />
      <p className="text-[15px] leading-[20px]">{Math.round(rating * 10) / 10}</p>
    </div>
  );
}
