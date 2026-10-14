'use client';

import clsx from 'clsx';
import { Info, Loader2, Play, Volume2, VolumeX, X } from 'lucide-react';
import Link from 'next/link';

import { buttonClass } from '@/components/ui/buttonStyles';

import type { Route } from 'next';

interface Props {
  onWatchTrailer: () => void;
  isLoading: boolean;
  isTrailerActive: boolean;
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  detailsHref: Route;
}

/** Hero actions, styled like the details page: red primary, glass secondaries. */
export default function ActionButtons({
  onWatchTrailer,
  isLoading,
  isTrailerActive,
  isMuted,
  onToggleMute,
  detailsHref,
}: Props) {
  const TrailerIcon = isLoading ? Loader2 : isTrailerActive ? X : Play;

  return (
    <div className="relative mb-[22px] flex w-full items-center gap-[12px] sm:mb-[8px] md:mb-[48px]">
      <button
        type="button"
        onClick={onWatchTrailer}
        disabled={isLoading}
        aria-busy={isLoading}
        className={buttonClass(
          isTrailerActive ? 'ghost' : 'primary',
          null,
          clsx(
            'h-[52px] flex-1 gap-[10px] px-[20px] text-[16px] whitespace-nowrap backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[200px] sm:flex-none sm:px-[28px]',
            !isTrailerActive && 'shadow-[0_8px_24px_rgba(158,34,26,0.35)]',
          ),
        )}
      >
        <TrailerIcon
          aria-hidden="true"
          className={clsx(
            'size-[18px]',
            isLoading && 'animate-spin',
            !isLoading && !isTrailerActive && 'fill-current',
          )}
        />
        {isLoading ? 'Loading trailer…' : isTrailerActive ? 'Stop Trailer' : 'Watch Trailer'}
      </button>

      {!isTrailerActive && (
        <Link
          href={detailsHref}
          className={buttonClass(
            'ghost',
            null,
            'h-[52px] gap-[8px] px-[18px] text-[16px] whitespace-nowrap backdrop-blur-md sm:px-[24px]',
          )}
        >
          <Info aria-hidden="true" className="size-[18px]" />
          More Info
        </Link>
      )}

      {/* Wrapper, because buttonClass sets `inline-flex`, which would override `hidden`. */}
      <div className="hidden sm:block">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute trailer' : 'Mute trailer'}
          aria-pressed={!isMuted}
          className={buttonClass('ghost', null, 'size-[52px] backdrop-blur-md')}
        >
          {isMuted ? (
            <VolumeX aria-hidden="true" className="size-[22px]" />
          ) : (
            <Volume2 aria-hidden="true" className="size-[22px]" />
          )}
        </button>
      </div>
    </div>
  );
}
