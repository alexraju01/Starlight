import Image from 'next/image';

import { MediaWithDetails } from '@/types/global';
import { isMovie } from '@/utils';

import type { MediaMode } from '@/types';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

export default function MediaBackdrop({ media }: Props) {
  const { backdrop_path, poster_path, title, name } = media;
  const mediaTitle = isMovie(media) ? title : name;
  const mediaSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : poster_path
      ? `https://image.tmdb.org/t/p/original${poster_path}`
      : '/placeholder.jpg';

  return (
    <div className="absolute inset-0">
      <Image
        alt={mediaTitle}
        src={mediaSrc}
        fill
        className="absolute left-0 h-full w-full object-cover brightness-[0.9] animate-fadeIn top-[-10rem] 
        xl:h-auto xl:brightness-100 mask-gradient-default"
      />
    </div>
  );
}
