'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState, useTransition, useEffect } from 'react';

import MediaVideoPlayer from '@/components/Cards/MediaCard/MediaVideoPlayer';
import { ROUTES } from '@/constants/route';
import { useCarousel } from '@/context/CarouselContext';
import { MediaMode } from '@/types';
import { MovieWithLogos } from '@/types/global';
import { getImageSrcSet, getImageUrl } from '@/utils/image/getImageUrl';
import { displayName } from '@/utils/media';
import { getVideoKey } from '@/utils/serverActions/getVideoKey';

import ActionButtons from './ActionButtons';
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
  const [trailerError, setTrailerError] = useState(false);
  const { setIsAnyVideoPlaying } = useCarousel();

  const isPlaying = !!videoKey;

  useEffect(() => {
    setIsAnyVideoPlaying(isPlaying);
    return () => setIsAnyVideoPlaying(false);
  }, [isPlaying, setIsAnyVideoPlaying]);

  const handleToggleTrailer = () => {
    if (isPlaying) {
      setVideoKey(null);
      return;
    }

    setTrailerError(false);
    startTransition(async () => {
      const key = await getVideoKey(mediaMode, movie.id);
      if (key) setVideoKey(key);
      else setTrailerError(true);
    });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  // Poster below 840px, backdrop above. w1280 serves up to 1600px wide: the art is darkened
  // and masked, so the slight upscale is invisible and saves over a megabyte vs `original`.
  const backdropSrcSet = getImageSrcSet(movie.backdrop_path, 'backdrop', [
    ['w780', 780],
    ['w1280', 1600],
    ['original', 3840],
  ]);
  const posterSrcSet = getImageSrcSet(movie.poster_path, 'poster', [
    ['w342', 342],
    ['w500', 500],
    ['w780', 780],
    ['original', 2000],
  ]);
  const title = displayName(movie);
  const detailsHref = ROUTES.MEDIA(mediaMode, movie.id, title);

  return (
    <li className="carousel-slide flex-evenly max-[840px]:bg-card-bg absolute inset-0 overflow-hidden">
      {/* Drifts for the parallax; stays under the trailer until the video fades in. */}
      <div className="carousel-parallax absolute inset-0">
        <picture>
          <source media="(min-width: 840px)" srcSet={backdropSrcSet} sizes="100vw" />
          <img
            src={getImageUrl(movie.poster_path || movie.backdrop_path, 'poster', 'w780')}
            srcSet={posterSrcSet || backdropSrcSet}
            sizes="100vw"
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="img-cover-center carousel-mask-gradiant absolute inset-0 size-full brightness-[80%]"
          />
        </picture>
      </div>
      {isPlaying ? (
        <MediaVideoPlayer
          videoKey={videoKey!}
          iframeId={`player-${movie.id}`}
          title={title}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          isCarousel
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent min-[840px]:hidden" />
      )}

      <div className="absolute inset-x-[16px] bottom-0 z-10 max-w-screen space-y-4 sm:inset-x-[24px] lg:left-[68px] lg:w-[854px] 2xl:left-[101px]">
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
              {/* The logo is an image: keep a real heading for screen readers and SEO. */}
              <h2 className="sr-only">{title}</h2>
              <Image
                src={movie.logoImage}
                fill
                sizes="330px"
                alt=""
                className="img-contain-center"
              />
            </div>
          ) : (
            <h2 className="text-[clamp(2rem,5vw,50px)] font-bold text-white">{title}</h2>
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
            detailsHref={detailsHref}
          />
          {trailerError && (
            <p role="status" className="-mt-6 mb-6 text-[14px] text-white/80">
              Sorry — no trailer is available for this title yet.
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
