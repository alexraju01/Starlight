'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { useMediaContext } from '@/context/MediaContext';
import { useHoverPreview } from '@/hooks/useHoverPreview';
import { MediaWithDetails } from '@/types/global';
import { displayName, getMediaDate } from '@/utils/media';

import MediaCardInfo from './MediaCardInfo';
import MediaVideoPlayer from './MediaVideoPlayer';
import PosterImage from './PosterImage';

interface Props {
  item: MediaWithDetails;
  /** Last card on screen in its row: opens leftwards so it stays inside the row. */
  isLast?: boolean;
}

// Every animated offset needs a numeric resting value (`right-0`): `auto` can't be
// interpolated, so the card would jump out from under the cursor and flicker.
// `--open-w` is the open width per breakpoint, shared by the width and the last card's offset.
const CARD_CLASSES = clsx(
  'relative right-0 h-full w-full rounded-[10.92px] border border-solid border-card-stroke bg-card-bg px-[12px] pt-[12px] transition-[width,right,z-index] duration-300',
  '[--open-w:70vw] sm:[--open-w:53vw] md:[--open-w:41vw] lg:[--open-w:38vw] xl:[--open-w:34vw] 2xl:[--open-w:26vw]',
  'group-hover:z-20 group-hover:h-auto group-hover:w-(--open-w)',
);

/** Poster card that grows into a muted trailer preview on mouse hover. */
export default function MediaCard({ item, isLast = false }: Props) {
  const { mediaMode, genres } = useMediaContext();
  const preview = useHoverPreview(mediaMode, item.id);
  const title = displayName(item);
  const href = ROUTES.MEDIA(mediaMode, item.id, title);
  const isUpcoming = Date.parse(getMediaDate(item)) > Date.now();

  return (
    <div
      ref={preview.slotRef}
      className="group relative w-full shrink-0"
      {...preview.hoverHandlers}
    >
      <div
        className={clsx(
          CARD_CLASSES,
          // Shift left by exactly the extra width (% = the slot's width).
          isLast && 'group-hover:right-[calc(var(--open-w)-100%)]',
        )}
      >
        <figure className="relative aspect-2/3 w-full overflow-hidden rounded-[10.92px] bg-white/5 transition-all duration-300 group-hover:aspect-video">
          <PosterImage src={item.poster_path} alt={title} className="rounded-[10.92px]" />
          {preview.hasHovered && item.backdrop_path && (
            <PosterImage
              src={item.backdrop_path}
              alt=""
              variant="backdrop"
              className="rounded-[10.92px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          {/* Duplicate of the title link below, so hidden from keyboard and screen readers. */}
          <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-[1]" />
          {preview.showTrailer && preview.videoKey && (
            <MediaVideoPlayer
              videoKey={preview.videoKey}
              iframeId={`yt-player-${item.id}`}
              title={title}
              isMuted={preview.isMuted}
              onToggleMute={preview.toggleMute}
            />
          )}
          {isUpcoming && (
            <figcaption className="bg-primary pointer-events-none absolute top-2 right-2 z-10 rounded-[7px] px-4 py-2 text-lg font-semibold text-white">
              Upcoming
            </figcaption>
          )}
        </figure>

        <Link href={href} className="block rounded-md">
          <MediaCardInfo item={item} title={title} genres={genres} />
        </Link>
      </div>
    </div>
  );
}
