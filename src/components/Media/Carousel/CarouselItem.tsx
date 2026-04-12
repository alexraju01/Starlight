'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState, useTransition } from 'react';

import { MediaVideoPlayer } from '@/components/Cards/MediaCard2/MediaVideoPlayer';
import { MediaMode } from '@/types';
import { MovieWithLogos } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';
import { displayName } from '@/utils/stringUtils';

import ActionButtons from './ActionButton';
import MediaMeta from './MediaMeta';

interface CarouselItemProps {
  movie: MovieWithLogos;
  genres: Record<number, string>;
  priority?: boolean;
  mediaMode: MediaMode;
}

export default function CarouselItem({ movie, genres, priority, mediaMode }: CarouselItemProps) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isPlaying = !!videoKey;

  const handleToggleTrailer = () => {
    if (isPlaying) {
      setVideoKey(null);
      return;
    }

    startTransition(async () => {
      const key = await getVideoKey(mediaMode as 'movie' | 'tv', movie.id);
      if (key) {
        setVideoKey(key);
      } else {
        alert('Trailer not available.');
      }
    });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const backdropSrc = getImageUrl(movie.backdrop_path, 'backdrop', 'original');

  return (
    <li className="flex-evenly relative h-full w-full flex-shrink-0 overflow-hidden">
      {isPlaying ? (
        <MediaVideoPlayer
          videoKey={videoKey!}
          iframeId={`player-${movie.id}`}
          title={displayName(movie)}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />
      ) : (
        <Image
          src={backdropSrc}
          fill
          quality={75}
          alt={displayName(movie)}
          className="img-cover-center carousel-mask-gradiant brightness-[80%]"
          priority={priority}
        />
      )}

      <div className="absolute inset-x-[25px] bottom-0 z-10 max-w-screen space-y-4 sm:pb-0 md:pb-0 lg:left-[102px] lg:w-[854px]">
        <div
          className={clsx(
            'space-y-4 transition-all duration-500 ease-in-out',
            isPlaying
              ? 'pointer-events-none translate-y-10 opacity-0'
              : 'translate-y-0 opacity-100',
          )}
        >
          {movie.logoImage ? (
            <div className="relative mb-5 h-[clamp(1rem,14vw,13rem)] w-[clamp(19rem,20vw,33rem)]">
              <Image
                src={movie.logoImage}
                fill
                loading="eager"
                quality={60}
                alt={`${displayName(movie)} logo`}
                className="img-contain-center"
              />
            </div>
          ) : (
            <h2 className="text-[clamp(2rem,5vw,50px)] font-bold text-white">
              {displayName(movie)}
            </h2>
          )}

          <MediaMeta movie={movie} genres={genres} />

          {movie.overview && (
            <div className="hidden md:block">
              <p className="line-clamp-3-custom mb-9 max-w-screen text-[clamp(1.6rem,2vw,2rem)] leading-[175%] text-white">
                {movie.overview}
              </p>
            </div>
          )}
        </div>

        <div
          className={clsx(
            'mt-6 transition-opacity duration-500',
            isPlaying ? 'opacity-40 hover:opacity-100' : 'opacity-100',
          )}
        >
          <ActionButtons
            onWatchTrailer={handleToggleTrailer}
            isLoading={isPending}
            isTrailerActive={isPlaying}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    </li>
  );
}
