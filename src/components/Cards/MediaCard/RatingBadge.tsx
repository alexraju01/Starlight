import { Star } from 'lucide-react';

/** Star and score (one decimal) on a media card. */
export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex-center gap-2">
      <span aria-hidden="true">
        <Star fill="#FACC15" color="#FACC15" size={20} />
      </span>
      <p className="text-2xl">{Math.round(rating * 10) / 10}</p>
    </div>
  );
}
