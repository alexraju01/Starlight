import Image from 'next/image';

import { MediaWithDetails } from '@/types/global';
import { displayName } from '@/utils/stringUtils';

interface Props {
  media: MediaWithDetails;
}

export default function MediaBackdrop({ media }: Props) {
  const { backdrop_path, poster_path } = media;
  const mediaTitle = displayName(media) || 'Media backdrop';
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
        className="animate-fadeIn mask-gradient-default absolute top-[-10rem] left-0 h-full w-full object-cover brightness-[0.9] xl:h-auto xl:brightness-100"
      />
    </div>
  );
}
