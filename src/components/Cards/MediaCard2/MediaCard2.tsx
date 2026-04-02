'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';

import { ROUTES } from '@/constants/route';
import { useMediaContext } from '@/context/MediaContext';
import { MediaWithDetails } from '@/types/global';
import { formatGenres } from '@/utils';
import { formatDate } from '@/utils/date';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';
import { isMovie, isTVShow } from '@/utils/typeGuard';

import { MediaCardInfo } from './MediaCardInfo';
import { MediaVideoPlayer } from './MediaVideoPlayer';
import PosterImage from './PosterImage';

const getMediaDate = (item: any): string => {
  if (isMovie(item)) return item.release_date;
  if (isTVShow(item)) return item.first_air_date;
  return '';
};

interface Props {
  item: MediaWithDetails;
  style?: React.CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
}

const MediaCard2 = ({ item, style, isFirst, isLast }: Props) => {
  const { mediaMode, genres } = useMediaContext();
  const [hovered, setHovered] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const videoKeyRef = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeId = `yt-player-${item.id}`;

  const title = item.name || item.title;
  const genreText = useMemo(() => formatGenres(item, genres), [item, genres]);
  const mediaDate = useMemo(() => getMediaDate(item), [item]);
  const dateStr = formatDate(item, mediaMode);
  const hasValidRating = typeof item.vote_average === 'number' && item.vote_average > 0;

  const isUpcoming = useMemo(() => new Date(mediaDate) > new Date(), [mediaDate]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handlePointerEnter = async () => {
    hoverTimeoutRef.current = setTimeout(async () => {
      setHovered(true);
      if (!videoKeyRef.current) {
        const key = await getVideoKey(mediaMode as 'movie' | 'tv', item.id);
        if (key) {
          videoKeyRef.current = key;
          setVideoKey(key);
        }
      }
    }, 400);
  };

  const handlePointerLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHovered(false);
    setIsMuted(true);
  };

  // Dynamic Classes
  const cardClasses = clsx(
    'relative w-full px-[12px] pt-[12px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-[width,top,left,right,z-index] duration-300 ',
    'group-hover:z-10 group-hover:w-[70vw] sm:group-hover:w-[53vw] md:group-hover:w-[41vw] lg:group-hover:w-[38vw] xl:group-hover:w-[34vw] 2xl:group-hover:w-[26vw] 2xl:group-hover:max-w-[26vw] group-hover:top-[43%] group-hover:-translate-y-1/2 ',
    {
      ' transform group-hover:right-[calc(70vw-100%)] sm:group-hover:right-[calc(70vw-151%)] md:group-hover:right-[calc(70vw-226%)] lg:group-hover:right-[calc(70vw-257%)] xl:group-hover:right-[calc(70vw-312%)] 2xl:group-hover:right-[calc(70vw-418%)]':
        isLast,
    },
  );

  return (
    <Link
      href={ROUTES.MEDIA(mediaMode, item.id, title)}
      className="group relative w-full overflow-visible flex-shrink-0"
      style={{ ...style, display: 'block' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={cardClasses}
        style={{ transformOrigin: isFirst ? 'left' : isLast ? 'right' : 'center' }}
      >
        <figure className="relative w-full overflow-hidden transition-all duration-300 aspect-2/3 group-hover:aspect-video">
          {hovered && videoKey ? (
            <MediaVideoPlayer
              videoKey={videoKey}
              iframeId={iframeId}
              title={title}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          ) : (
            <PosterImage
              src={(hovered && !videoKey ? item.backdrop_path : item.poster_path) || 'Media Poster'}
              alt={title}
              className={clsx('rounded-[10.92px]', hovered && !videoKey && 'rounded-b-0')}
            />
          )}

          {isUpcoming && (
            <figcaption className="absolute top-2 right-2 z-10 bg-primary text-white text-lg font-semibold px-4 py-2 rounded-[7px]">
              Upcoming
            </figcaption>
          )}
        </figure>

        <MediaCardInfo
          item={item}
          title={title}
          dateStr={dateStr}
          mediaDate={mediaDate}
          genreText={genreText}
          hasValidRating={hasValidRating}
        />
      </div>
    </Link>
  );
};

export default MediaCard2;
