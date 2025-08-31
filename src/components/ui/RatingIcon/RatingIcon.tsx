import { memo } from 'react';

export type RatingIconProps = Readonly<{
  vote: number; // TMDB average score (0–10)
  className?: string; // Extra classes for the badge
  'data-testid'?: string; // For RTL/Jest/Vitest
}>;

const RatingIcon = memo(function RatingIcon({
  vote,
  className,
  'data-testid': dataTestId,
}: RatingIconProps) {
  const display = Number.isFinite(vote) ? vote.toFixed(1) : '–--';
  const ariaLabel = `TMDB rating ${display}`;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-testid={dataTestId}
      className="flex items-center gap-2"
    >
      <span
        aria-hidden
        className={[
          'font-bold text-black bg-[#edc017] border border-[#edc017]',
          'rounded-md px-1 py-0.5 text-xl',
          className || '',
        ].join(' ')}
      >
        TMDB
      </span>

      <span aria-hidden className="text-white font-medium">
        {display}
      </span>
    </div>
  );
});

export default RatingIcon;
