'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useRef } from 'react';

import { ROUTES } from '@/constants/route';
import { useMediaContext } from '@/context/MediaContext';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { formatGenres } from '@/utils';
import { formatDate, getMediaDate } from '@/utils/date';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';

import { MediaCardInfo } from './MediaCardInfo';
import { MediaVideoPlayer } from './MediaVideoPlayer';
import PosterImage from './PosterImage';

interface Props {
  item: MediaWithDetails;
  style?: React.CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
}

const MediaCard2 = ({ item, style, isFirst, isLast }: Props) => {
  const { mediaMode, genres } = useMediaContext();
  const [isPlaying, setIsPlaying] = useState(false);
  // The backdrop is only fetched once the card has been hovered, then kept so it can fade
  // out again on leave.
  const [hasHovered, setHasHovered] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  // Hover previews start muted – unexpected audio on hover is a poor experience.
  const [isMuted, setIsMuted] = useState(true);
  const router = useRouter();

  const videoKeyRef = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeId = `yt-player-${item.id}`;

  const title = item.media_type === MediaMode.MOVIE ? item.title : item.name;
  const href = ROUTES.MEDIA(mediaMode, item.id, title);
  const genreText = useMemo(() => formatGenres(item, genres), [item, genres]);
  const mediaDate = useMemo(() => getMediaDate(item), [item]);
  const dateStr = formatDate(item);
  const hasValidRating = typeof item.vote_average === 'number' && item.vote_average > 0;
  const isUpcoming = useMemo(() => new Date(mediaDate) > new Date(), [mediaDate]);

  const loadVideo = async () => {
    if (!videoKeyRef.current) {
      const key = await getVideoKey(mediaMode as 'movie' | 'tv', item.id);
      if (key) {
        videoKeyRef.current = key;
        setVideoKey(key);
      }
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    // IMPORTANT: Stop the click from reaching handleImageClick
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    // Only trigger auto-play on mouse hover (desktop)
    if (e.pointerType === 'mouse') {
      // The enlarged card stays in the layout flow, and its height changes as it widens
      // (poster → landscape). Pin the slot at its resting height so the row – and on the
      // last row, the page height and scroll position – doesn't jump, which could also pull
      // the card out from under the cursor and make the hover flicker on and off.
      if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
      const slot = slotRef.current;
      if (slot && !slot.style.height) slot.style.height = `${slot.offsetHeight}px`;

      setHasHovered(true);
      hoverTimeoutRef.current = setTimeout(async () => {
        setIsPlaying(true);
        await loadVideo();
      }, 400);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      // Release the pin once the card has shrunk back (matches the 300ms transitions).
      unlockTimeoutRef.current = setTimeout(() => {
        if (slotRef.current) slotRef.current.style.height = '';
      }, 300);
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  // Tapping/clicking the artwork opens the title (previously a tap on mobile started
  // a trailer instead, so touch users had to find the small text link to navigate).
  // While a hover preview plays, the player's overlay intercepts clicks to toggle sound.
  const handleImageClick = () => {
    router.push(href);
  };

  const cardClasses = clsx(
    // h-full at rest keeps cards in a mixed movie/TV row the same height.
    'relative h-full group-hover:h-auto w-full px-[12px] pt-[12px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-[width,top,left,right,z-index] duration-300 ',
    'group-hover:z-20 group-hover:w-[70vw] sm:group-hover:w-[53vw] md:group-hover:w-[41vw] lg:group-hover:w-[38vw] xl:group-hover:w-[34vw] 2xl:group-hover:w-[26vw] 2xl:group-hover:max-w-[26vw] group-hover:top-[43%] group-hover:-translate-y-1/2 ',
    {
      ' transform group-hover:right-[calc(70vw-100%)] sm:group-hover:right-[calc(70vw-151%)] md:group-hover:right-[calc(70vw-226%)] lg:group-hover:right-[calc(70vw-257%)] xl:group-hover:right-[calc(70vw-312%)] 2xl:group-hover:right-[calc(70vw-418%)]':
        isLast,
    },
  );

  return (
    <div
      ref={slotRef}
      className="group relative w-full flex-shrink-0 overflow-visible"
      style={{ ...style, display: 'block' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={cardClasses}
        style={{ transformOrigin: isFirst ? 'left' : isLast ? 'right' : 'center' }}
      >
        <figure
          className="relative aspect-2/3 w-full cursor-pointer overflow-hidden rounded-[10.92px] bg-white/5 transition-all duration-300 group-hover:aspect-video"
          onClick={handleImageClick}
        >
          {/* Poster, with the landscape backdrop cross-fading over it as the card widens on
              hover. Both stay underneath the player until the trailer fades in. */}
          <PosterImage src={item.poster_path} alt={title} className="rounded-[10.92px]" />
          {hasHovered && item.backdrop_path && (
            <PosterImage
              src={item.backdrop_path}
              alt=""
              className="rounded-[10.92px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          {isPlaying && videoKey && (
            <MediaVideoPlayer
              videoKey={videoKey}
              iframeId={iframeId}
              title={title}
              isMuted={isMuted}
              onToggleMute={handleToggleMute} // Passed here
            />
          )}

          {isUpcoming && (
            <figcaption className="bg-primary absolute top-2 right-2 z-10 rounded-[7px] px-4 py-2 text-lg font-semibold text-white">
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
