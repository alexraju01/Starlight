'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState, useMemo, useRef } from 'react';

import { ROUTES } from '@/constants/route';
import { Media } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { fetchData } from '@/utils';
import { formatDate } from '@/utils/date';
import { formatGenres } from '@/utils/genre';
import { isMovie, isTVShow } from '@/utils/typeGuard';

import PosterImage from './PosterImage';
import RatingBadge from './RatingBadge';
import SeasonBadge from './SeasonBadge';

interface Props {
  item: Media;
  genreMap: Record<number, string>;
  mediaMode: MediaMode;
  style?: React.CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
}

const getMediaDate = (item: Media): string => {
  if (isMovie(item)) return item.release_date;
  if (isTVShow(item)) return item.first_air_date;
  return '';
};

const MediaCard2 = ({ item, genreMap, mediaMode, style, isFirst, isLast }: Props) => {
  const title = item.name || item.title;
  const genreText = useMemo(() => formatGenres(item, genreMap), [item, genreMap]);
  const dateStr = useMemo(() => formatDate(item), [item]);
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

  const handlePointerEnter = () => {
    hoverTimeoutRef.current = setTimeout(async () => {
      setHovered(true);

      if (!videoKeyRef.current) {
        try {
          const mediaType = isMovie(item) ? 'movie' : 'tv';
          const data = await fetchData<VideoResponse>('3', `${mediaType}/${item.id}/videos`);

          let trailer = data.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube',
          );

          if (!trailer) {
            trailer = data.results.find(
              (video) => video.type === 'Teaser' && video.site === 'YouTube',
            );
          }

          if (trailer) {
            videoKeyRef.current = trailer.key;
            setVideoKey(trailer.key);
          }
        } catch (err) {
          console.error('Failed to fetch video:', err);
        }
      }
    }, 300); // Add a slight delay like Netflix (300ms)
  };

  const handlePointerLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHovered(false);
  };

  const cardClasses = clsx(
    'relative w-full px-[15px] pt-[15px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-transform duration-300 transform-gpu',
    'group-hover:w-[70vw] sm:group-hover:w-[60vw] md:group-hover:w-[47vw] lg:group-hover:w-[40vw] xl:group-hover:w-[35vw] 2xl:group-hover:w-[30vw] 2xl:group-hover:max-w-[26vw]  group-hover:z-3 group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:px-0 group-hover:pt-0',
    {
      'absolute transform  group-hover:right-[calc(70vw-103%)] sm:group-hover:right-[calc(70vw-140%)] md:group-hover:right-[calc(70vw-210%)] lg:group-hover:right-[calc(70vw-250%)] xl:group-hover:right-[calc(70vw-310%)] 2xl:group-hover:right-[calc(70vw-425%)] 3xl:group-hover:right-[calc(70vw-420%)]':
        // "group-hover:-translate-x-[calc(70vw-64%)] sm:group-hover:-translate-x-[calc(70vw-68%)] md:group-hover:-translate-x-[calc(63vw-72%)] lg:group-hover:-translate-x-[calc(57vw-94%)] xl:group-hover:-translate-x-[calc(50vw-90%)] 2xl:group-hover:-translate-x-[calc(50vw-146%)] ":
        isLast, // Shift left on hover
    },
  );

  const figureClasses = clsx(
    'relative aspect-[0.7] w-full overflow-hidden',
    'group-hover:aspect-video',
  );

  const posterClass = clsx({
    'rounded-[10.92px]': !hovered || (hovered && videoKey),
    'rounded-t-[10.92px] rounded-b-0': hovered && !videoKey,
  });

  return (
    <Link
      href={ROUTES.MEDIA(mediaMode, item.id, title)}
      style={{ ...style, flex: '0 0 auto' }}
      className="group"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className={cardClasses} style={{ transformOrigin }}>
        <figure className={figureClasses}>
          {hovered && videoKey ? (
            <iframe
              className="w-full h-full group-hover:rounded-t-[10.92px] group-hover:rounded-b-0 "
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoKey}`}
              title={`${title} Trailer`}
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <PosterImage
              src={
                hovered && !videoKey && item.backdrop_path ? item.backdrop_path : item.poster_path
              }
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

        <div className="flex  flex-col gap-3 py-5 truncate px-[10px]">
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
