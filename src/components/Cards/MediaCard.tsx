'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Movie, TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { SearchMedia } from '@/types/searchMedia';

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
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w342${poster_path}`
            : `https://image.tmdb.org/t/p/w342/`
        }
        width={70}
        height={105}
        alt={displayName ?? 'Image poster'}
        priority
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default MediaCard;
