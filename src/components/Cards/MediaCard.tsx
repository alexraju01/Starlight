'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Movie, TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { SearchMedia } from '@/types/searchMedia';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  media: Movie | TVShow | SearchMedia;
  mediaMode: MediaMode;
  className?: string;
}

const MediaCard = ({ media, className }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { poster_path } = media;
  const displayName = media.media_type === MediaMode.MOVIE ? media.title : media.name;

  useEffect(() => {
    if (!poster_path) setIsLoaded(true);
  }, [poster_path]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden brightness-[80%] filter transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-[105%] ${className}`}
    >
      {!isLoaded && (
        <div className="absolute top-0 left-0 z-[1] h-full w-full animate-[pulse_1.5s_ease-in-out_infinite] rounded-md bg-slate-700" />
      )}

      <Image
        className={`h-auto w-full transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} relative z-[2] rounded-xl shadow-md`}
        src={getImageUrl(poster_path, 'poster', 'w342') || '/images/logo.webp'}
        width={342}
        height={513}
        alt={displayName ?? 'Poster'}
        priority
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default MediaCard;
