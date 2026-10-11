import Image from 'next/image';

import { MediaWithDetails } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  media: MediaWithDetails;
}

export default function MediaBackdrop({ media }: Props) {
  const { backdrop_path, poster_path } = media;
  // w1280 instead of `original`; the old '/placeholder.jpg' fallback didn't exist (404).
  const mediaSrc =
    getImageUrl(backdrop_path, 'backdrop', 'w1280') || getImageUrl(poster_path, 'poster', 'w780');

  if (!mediaSrc) return null;

  return (
    <div className="absolute inset-0">
      <Image
        alt=""
        src={mediaSrc}
        fill
        priority
        sizes="100vw"
        className="animate-fadeIn mask-gradient-default absolute top-[-10rem] left-0 h-full w-full object-cover brightness-[0.9] xl:h-auto xl:brightness-100"
      />
    </div>
  );
}
