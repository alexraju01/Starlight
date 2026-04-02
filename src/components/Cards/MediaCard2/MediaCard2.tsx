'use client';

import clsx from 'clsx';
import { Volume2, VolumeX } from 'lucide-react'; // Example icons
import Link from 'next/link';
import { useState, useMemo, useRef, useEffect } from 'react';

import { ROUTES } from '@/constants/route';
import { useMediaContext } from '@/context/MediaContext';
import { MediaListItem, MediaWithDetails } from '@/types/global';
import { formatGenres } from '@/utils';
import { formatDate } from '@/utils/date';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';
import { isMovie, isTVShow } from '@/utils/typeGuard';

import PosterImage from './PosterImage';
import RatingBadge from './RatingBadge';
import SeasonBadge from './SeasonBadge';

interface Props {
  item: MediaWithDetails;
  style?: React.CSSProperties;
  isFirst?: boolean;
  isLast?: boolean;
}

// Helper to load YouTube API globally
const loadYouTubeAPI = () => {
  if (window.YT && window.YT.Player) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Polling check for YT readiness
    const checkYT = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkYT);
        resolve();
      }
    }, 100);
  });
};

const getMediaDate = (item: MediaListItem): string => {
  if (isMovie(item)) return item.release_date;
  if (isTVShow(item)) return item.first_air_date;
  return '';
};

const MediaCard2 = ({ item, style, isFirst, isLast }: Props) => {
  const { mediaMode, genres } = useMediaContext();
  const [hovered, setHovered] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const videoKeyRef = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const iframeId = `yt-player-${item.id}`;

  const title = item.name || item.title;
  const genreText = useMemo(() => formatGenres(item, genres), [item, genres]);
  const mediaDate = useMemo(() => getMediaDate(item), [item]);
  const dateStr = formatDate(item, mediaMode);
  const hasValidRating = typeof item.vote_average === 'number' && item.vote_average > 0;
  const transformOrigin = isFirst ? 'left center' : isLast ? 'right center' : 'center';

  const isUpcoming = useMemo(() => {
    const releaseDate = new Date(mediaDate);
    return releaseDate > new Date();
  }, [mediaDate]);

  // Handle Mute/Unmute Logic
  const handleToggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    if (hovered && videoKey) {
      loadYouTubeAPI().then(() => {
        playerRef.current = new window.YT.Player(iframeId, {
          events: {
            onReady: (event: any) => {
              event.target.mute(); // Browser compliance
              event.target.playVideo();
            },
          },
        });
      });
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Player cleanup error', e);
        }
        playerRef.current = null;
      }
    };
  }, [hovered, videoKey, iframeId]);

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
    setIsMuted(true); // Reset mute state for next hover
  };

  // Dynamic Classes
  const cardClasses = clsx(
    'relative w-full px-[12px] pt-[12px] rounded-[10.92px] bg-card-bg border border-solid border-card-stroke transition-[width,top,left,right,z-index] duration-300 ',
    'group-hover:z-50 group-hover:w-[70vw] sm:group-hover:w-[53vw] md:group-hover:w-[41vw] lg:group-hover:w-[38vw] xl:group-hover:w-[34vw] 2xl:group-hover:w-[26vw] 2xl:group-hover:max-w-[26vw] group-hover:top-[43%] group-hover:-translate-y-1/2 ',
    {
      ' transform group-hover:right-[calc(70vw-100%)] sm:group-hover:right-[calc(70vw-151%)] md:group-hover:right-[calc(70vw-226%)] lg:group-hover:right-[calc(70vw-257%)] xl:group-hover:right-[calc(70vw-312%)] 2xl:group-hover:right-[calc(70vw-418%)]':
        isLast,
    },
  );

  const figureClasses = clsx(
    ' relative w-full max-h-[230px] sm:max-h-none overflow-hidden transition-all duration-300 ease-in-out aspect-2/3 group-hover:aspect-video',
  );

  const posterSrc =
    hovered && !videoKey && item.backdrop_path ? item.backdrop_path : item.poster_path;

  return (
    <Link
      href={ROUTES.MEDIA(mediaMode, item.id, title)}
      className="group relative w-full overflow-visible flex-shrink-0"
      style={{ ...style, display: 'block' }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className={cardClasses} style={{ transformOrigin }}>
        <figure className={figureClasses}>
          {hovered && videoKey ? (
            <div className="absolute inset-0 bg-black animate-fadeIn overflow-hidden rounded-[10.92px]">
              {/* This invisible div catches all clicks over the video area */}
              <div className="absolute inset-0 z-40 cursor-pointer" onClick={handleToggleMute} />

              {/* THE MUTE BUTTON */}
              <button
                type="button"
                onClick={handleToggleMute}
                className="absolute bottom-3 right-3 z-50 flex size-13 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 hover:scale-110 transition-all active:scale-95"
              >
                {isMuted ? (
                  <VolumeX className="cursor-pointer" size={23} />
                ) : (
                  <Volume2 className="cursor-pointer" size={23} />
                )}
              </button>

              <div className="w-full h-full pointer-events-none scale-[1.35]">
                <iframe
                  id={iframeId}
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${videoKey}`}
                  allow="autoplay; encrypted-media"
                  title={`${title} Trailer`}
                />
              </div>
            </div>
          ) : (
            <PosterImage
              src={posterSrc || 'Media Poster'}
              alt={title || 'Movie Poster'}
              className={clsx('rounded-[10.92px]', { 'rounded-b-0': hovered && !videoKey })}
            />
          )}

          {isUpcoming && (
            <figcaption className="absolute top-2 right-2 z-10 bg-primary text-white text-lg font-semibold px-4 py-2 rounded-[7px]">
              Upcoming
            </figcaption>
          )}
        </figure>

        <div className="flex flex-col px-6 gap-3 py-5 truncate md:px-[10px]">
          <div className="flex justify-between">
            <h3 className="text-2xl text-white font-medium truncate">{title}</h3>
            {hasValidRating && <RatingBadge rating={item.vote_average} />}
          </div>

          <div className="flex gap-3.5 text-gray-400 text-xl">
            <time dateTime={mediaDate}>{dateStr}</time>
            <p>|</p>
            <p className="truncate">{genreText}</p>
          </div>

          <div className="min-h-[28px] flex items-center">
            <SeasonBadge item={item} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard2;
