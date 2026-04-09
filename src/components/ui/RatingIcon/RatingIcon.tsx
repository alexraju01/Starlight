import Image from 'next/image';
import { memo } from 'react';

export type RatingIconProps = Readonly<{
  vote: number;
  className?: string;
}>;

const RatingIcon = memo(function RatingIcon({ vote, className }: RatingIconProps) {
  const display = Number.isFinite(vote) ? vote.toFixed(1) : '–--';
  const ariaLabel = `TMDB rating ${display}`;

  return (
    <div role="group" aria-label={ariaLabel} className="flex items-center gap-2">
      <span aria-hidden className={['font-bold text-white', className || ''].join(' ')}>
        <Image
          src="/images/TMDB-Primary-Short.svg"
          alt="The Movie Database (TMDB)"
          width={40}
          height={18}
          priority
        />
      </span>

      <span aria-hidden className="font-semibold text-white">
        {display}
      </span>
    </div>
  );
});

export default RatingIcon;
