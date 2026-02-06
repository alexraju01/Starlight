import Image from 'next/image';
import { memo } from 'react';

import TMDB_SHORT_LOGO from 'public/images/TMDB Primary Short.svg';

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
        <Image src={TMDB_SHORT_LOGO} alt="The Movie Database (TMDB)" width={40} priority />
      </span>

      <span aria-hidden className="font-semibold text-white">
        {display}
      </span>
    </div>
  );
});

export default RatingIcon;
