'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';

import { ROUTES } from '@/constants/route';
import { MediaListItem, MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { formatGenres } from '@/utils';
import { formatDate } from '@/utils/date';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';
import { isMovie, isTVShow } from '@/utils/typeGuard';

import PosterImage from './PosterImage';
import RatingBadge from './RatingBadge';
import SeasonBadge from './SeasonBadge';

interface Props {
  item: MediaWithDetails;
  genreMap: Record<number, string>;
  mediaMode: MediaMode;
  style?: React.CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
}

const getMediaDate = (item: MediaListItem): string => {
  if (isMovie(item)) return item.release_date;
  if (isTVShow(item)) return item.first_air_date;
  return '';
};

const MediaCard2 = ({ item, genreMap, mediaMode, style, isFirst, isLast }: Props) => {
  const title = item.name || item.title;
  const genreText = useMemo(() => formatGenres(item, genreMap), [item, genreMap]);

  //   const dateStr = useMemo(() => formatDate(item), [item]);
  const mediaDate = useMemo(() => getMediaDate(item), [item]);

  const hasValidRating = typeof item.vote_average === 'number' && item.vote_average > 0;
  const transformOrigin = isFirst ? 'left center' : isLast ? 'right center' : 'center';

  const [hovered, setHovered] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const videoKeyRef = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isUpcoming = useMemo(() => {
    const releaseDate = new Date(mediaDate);
    return releaseDate > new Date();
  }, [mediaDate]);

  const handlePointerEnter = async () => {
    hoverTimeoutRef.current = setTimeout(async () => {
      setHovered(true);

      if (!videoKeyRef.current) {
        // Call the server action
        const key = await getVideoKey(mediaMode as 'movie' | 'tv', item.id);

        if (key) {
          videoKeyRef.current = key;
          setVideoKey(key);
        }
      }
    }, 300);
  };

  const handlePointerLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHovered(false);
  };
  const dateStr = formatDate(item, mediaMode);

  const cardClasses = clsx(
    '  relative w-full px-[12px] pt-[12px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-[width,top,left,right,z-index] duration-300',
    'group-hover:z-50 group-hover:w-[70vw] sm:group-hover:w-[54vw] md:group-hover:w-[41vw] lg:group-hover:w-[38vw] xl:group-hover:w-[34vw] 2xl:group-hover:w-[26vw] 2xl:group-hover:max-w-[26vw] group-hover:top-1/2 group-hover:-translate-y-1/2 ',
    // 'group-hover:z-50 group-hover:w-[70vw] sm:group-hover:w-[60vw] md:group-hover:w-[47vw] lg:group-hover:w-[37vw] xl:group-hover:w-[35vw] 2xl:group-hover:w-[30vw] 2xl:group-hover:max-w-[26vw] group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:px-0 group-hover:pt-0',
    {
      ' transform group-hover:right-[calc(70vw-103%)] sm:group-hover:right-[calc(70vw-151%)] md:group-hover:right-[calc(70vw-226%)] lg:group-hover:right-[calc(70vw-257%)] xl:group-hover:right-[calc(70vw-312%)] 2xl:group-hover:right-[calc(70vw-418%)]':
        isLast,
    },
  );

  //   const cardClasses = clsx(
  //     'relative w-full rounded-[10.92px] bg-card-bg border border-solid border-card-stroke',
  //     // Use a transition that covers transform and layout properties
  //     'transition-all duration-300 ease-in-out',
  //     'z-10',
  //     // On hover, scale it up and ensure it sits on top
  //     'hover:z-50 hover:scale-125 hover:shadow-2xl',
  //     {
  //       'origin-left': isFirst,
  //       'origin-right': isLast,
  //     },
  //   );

  //   const figureClasses = clsx(
  //     'relative overflow-hidden w-full',
  //     'h-[clamp(250px,60vw,370px)] sm:h-[clamp(250px,40vw,300px)] md:h-[clamp(200px,30vw,300px)] lg:h-[clamp(280px,27vw,340px)] group-hover:h-[240px] sm:group-hover:h-[260px]',
  //     'transition-[height] duration-300',
  //   );

  const figureClasses = clsx(
    ' relative w-full overflow-hidden transition-all duration-300 ease-in-out aspect-2/3 group-hover:aspect-video',
  );

  const posterClass = clsx({
    'rounded-[10.92px]  ': !hovered || (hovered && videoKey),
    'rounded-[10.92px] rounded-b-0 ': hovered && !videoKey,
  });
  const posterSrc =
    hovered && !videoKey && item.backdrop_path ? item.backdrop_path : item.poster_path;

  return (
    <Link
      href={ROUTES.MEDIA(mediaMode, item.id, title)}
      className="group relative  w-full  overflow-visible flex-shrink-0"
      style={{ ...style, display: 'block' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className={cardClasses} style={{ transformOrigin }}>
        <figure className={figureClasses}>
          {hovered && videoKey ? (
            <iframe
              className="w-full h-full group-hover:rounded-[10.92px] group-hover:rounded-b-0 "
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoKey}`}
              title={`${title} Trailer`}
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <PosterImage
              src={posterSrc || 'Media Poster'}
              alt={title || 'Movie Poster'}
              className={posterClass}
            />
          )}

          {isUpcoming && (
            <figcaption className="absolute top-2 right-2 bg-primary text-white text-lg font-Helvetica font-semibold px-4 py-2 rounded-[7px]">
              Upcoming
            </figcaption>
          )}
        </figure>

        <div className="flex flex-col px-6  gap-3 py-5 truncate md:px-[10px]">
          <div className="flex justify-between">
            <h3 className="text-2xl text-white font-medium truncate">{title}</h3>
            {hasValidRating && <RatingBadge rating={item.vote_average} />}
          </div>

          <div className="flex gap-3.5 text-gray-400 text-xl">
            <time dateTime={mediaDate}>{dateStr}</time>
            <p>|</p>
            <p className="truncate">{genreText}</p>
          </div>

          <SeasonBadge item={item} />
        </div>
      </div>
    </Link>
  );
};

export default MediaCard2;
