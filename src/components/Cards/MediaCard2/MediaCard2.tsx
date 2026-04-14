'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';

import { ROUTES } from '@/constants/route';
import { useMediaContext } from '@/context/MediaContext';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { formatGenres } from '@/utils';
import { formatDate } from '@/utils/date';
import { getMediaDate } from '@/utils/date/formatDate';
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
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const videoKeyRef = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeId = `yt-player-${item.id}`;

  const title = item.media_type === MediaMode.MOVIE ? item.title : item.name;
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
      hoverTimeoutRef.current = setTimeout(async () => {
        setIsPlaying(true);
        await loadVideo();
      }, 400);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  const handleImageClick = async (e: React.MouseEvent) => {
    // This is the main toggle for mobile taps
    e.stopPropagation();

    if (!isPlaying) {
      setIsPlaying(true);
      await loadVideo();
    } else {
      // On mobile, if already playing, clicking the image area again stops it
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  const cardClasses = clsx(
    'relative w-full px-[12px] pt-[12px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-[width,top,left,right,z-index] duration-300 ',
    'group-hover:z-20 group-hover:w-[70vw] sm:group-hover:w-[53vw] md:group-hover:w-[41vw] lg:group-hover:w-[38vw] xl:group-hover:w-[34vw] 2xl:group-hover:w-[26vw] 2xl:group-hover:max-w-[26vw] group-hover:top-[43%] group-hover:-translate-y-1/2 ',
    {
      ' transform group-hover:right-[calc(70vw-100%)] sm:group-hover:right-[calc(70vw-151%)] md:group-hover:right-[calc(70vw-226%)] lg:group-hover:right-[calc(70vw-257%)] xl:group-hover:right-[calc(70vw-312%)] 2xl:group-hover:right-[calc(70vw-418%)]':
        isLast,
    },
  );

  return (
    <div
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
          className="relative aspect-2/3 w-full cursor-pointer overflow-hidden transition-all duration-300 group-hover:aspect-video"
          onClick={handleImageClick}
        >
          {isPlaying && videoKey ? (
            <MediaVideoPlayer
              videoKey={videoKey}
              iframeId={iframeId}
              title={title}
              isMuted={isMuted}
              onToggleMute={handleToggleMute} // Passed here
            />
          ) : (
            <PosterImage
              src={
                (isPlaying && !videoKey ? item.backdrop_path : item.poster_path) || 'Media Poster'
              }
              alt={title}
              className={clsx('rounded-[10.92px]', isPlaying && !videoKey && 'rounded-b-0')}
            />
          )}

          {isUpcoming && (
            <figcaption className="bg-primary absolute top-2 right-2 z-10 rounded-[7px] px-4 py-2 text-lg font-semibold text-white">
              Upcoming
            </figcaption>
          )}
        </figure>

        <Link href={ROUTES.MEDIA(mediaMode, item.id, title)}>
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
