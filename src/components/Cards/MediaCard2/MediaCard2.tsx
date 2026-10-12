'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';

import { ROUTES } from '@/constants/route';
import { useMediaContext } from '@/context/MediaContext';
import { useHoverPreview } from '@/hooks/useHoverPreview';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { formatGenres } from '@/utils';
import { formatDate, getMediaDate } from '@/utils/date';

import { MediaCardInfo } from './MediaCardInfo';
import { MediaVideoPlayer } from './MediaVideoPlayer';
import PosterImage from './PosterImage';

interface Props {
  item: MediaWithDetails;
  style?: React.CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
}

/** Poster card that grows into a muted trailer preview on mouse hover. */
const MediaCard2 = ({ item, style, isFirst, isLast }: Props) => {
  const { mediaMode, genres } = useMediaContext();
  const preview = useHoverPreview(mediaMode, item.id);
  const iframeId = `yt-player-${item.id}`;

  const title = item.media_type === MediaMode.MOVIE ? item.title : item.name;
  const href = ROUTES.MEDIA(mediaMode, item.id, title);
  const genreText = useMemo(() => formatGenres(item, genres), [item, genres]);
  const mediaDate = useMemo(() => getMediaDate(item), [item]);
  const dateStr = formatDate(item);
  const hasValidRating = typeof item.vote_average === 'number' && item.vote_average > 0;
  const isUpcoming = useMemo(() => new Date(mediaDate) > new Date(), [mediaDate]);

  const cardClasses = clsx(
    // h-full at rest keeps cards in a mixed movie/TV row the same height.
    // The open card stays top-aligned in its slot. Every animated offset needs a numeric
    // resting value (right-0): `auto` can't be interpolated, so the card would jump on
    // hover and out from under the cursor, then jump back – a flicker at its edge.
    'relative right-0 h-full group-hover:h-auto w-full px-[12px] pt-[12px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-[width,right,z-index] duration-300 ',
    // --open-w: the card's width while open, per breakpoint – defined once so the width
    // and the last card's offset below can't drift apart.
    '[--open-w:70vw] sm:[--open-w:53vw] md:[--open-w:41vw] lg:[--open-w:38vw] xl:[--open-w:34vw] 2xl:[--open-w:26vw]',
    'group-hover:z-20 group-hover:w-(--open-w)',
    // The last card on screen opens leftwards: shifted by exactly the extra width (the
    // % is the slot's width), so its right edge stays on the row's edge.
    isLast && 'group-hover:right-[calc(var(--open-w)-100%)]',
  );

  return (
    <div
      ref={preview.slotRef}
      className="group relative w-full flex-shrink-0 overflow-visible"
      style={{ ...style, display: 'block' }}
      {...preview.hoverHandlers}
    >
      <div
        className={cardClasses}
        style={{ transformOrigin: isFirst ? 'left' : isLast ? 'right' : 'center' }}
      >
        <figure className="relative aspect-2/3 w-full overflow-hidden rounded-[10.92px] bg-white/5 transition-all duration-300 group-hover:aspect-video">
          {/* Poster, with the landscape backdrop cross-fading over it as the card widens on
              hover. Both stay underneath the player until the trailer fades in. */}
          <PosterImage src={item.poster_path} alt={title} className="rounded-[10.92px]" />
          {preview.hasHovered && item.backdrop_path && (
            <PosterImage
              src={item.backdrop_path}
              alt=""
              variant="backdrop"
              className="rounded-[10.92px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          {/* The artwork is a real link (open in new tab, prefetch, middle-click) instead of a
              click handler on a <figure>. Hidden from keyboard/screen readers because the
              title link below goes to the same place; the trailer's controls sit above it. */}
          <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-[1]" />
          {preview.showTrailer && preview.videoKey && (
            <MediaVideoPlayer
              videoKey={preview.videoKey}
              iframeId={iframeId}
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
          <MediaCardInfo
            item={item}
            title={title}
            dateStr={dateStr}
            mediaDate={mediaDate}
            genreText={genreText}
            hasValidRating={hasValidRating}
          />
        </Link>
      </div>
    </div>
  );
};

export default MediaCard2;
