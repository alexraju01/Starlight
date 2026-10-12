import Image from 'next/image';

import { MediaWithDetails } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  media: MediaWithDetails;
}

/** Hero artwork: a banner on mobile; from `lg` it fills the hero behind the text, with scrims. */
export default function MediaBackdrop({ media }: Props) {
  const src =
    getImageUrl(media.backdrop_path, 'backdrop', 'w1280') ||
    getImageUrl(media.poster_path, 'poster', 'w780');

  return (
    <div
      aria-hidden="true"
      className="bg-card-bg relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto"
    >
      {src && (
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-fadeIn object-cover object-[center_20%]"
        />
      )}
      <div className="to-secondary via-secondary/60 absolute inset-0 bg-gradient-to-b from-transparent from-40% via-75% lg:from-30%" />
      <div className="from-secondary via-secondary/75 absolute inset-0 hidden bg-gradient-to-r via-40% to-transparent to-75% lg:block" />
    </div>
  );
}
