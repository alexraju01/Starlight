import Image from 'next/image';

import { MediaWithDetails } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  media: MediaWithDetails;
}

/**
 * Hero artwork. Mobile: a 16:10 banner above the content. From `lg`: fills the whole hero
 * behind the content, with scrims that keep the text legible on any image.
 */
export default function MediaBackdrop({ media }: Props) {
  const src =
    getImageUrl(media.backdrop_path, 'backdrop', 'w1280') ||
    getImageUrl(media.poster_path, 'poster', 'w780');

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a1a1a] sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto"
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
      {/* Fade into the page at the bottom (all sizes)… */}
      <div className="to-secondary absolute inset-0 bg-gradient-to-b from-transparent from-40% via-[#100f10]/60 via-75% lg:from-30%" />
      {/* …and darken the left side on desktop, where the text sits. */}
      <div className="from-secondary via-secondary/75 absolute inset-0 hidden bg-gradient-to-r via-40% to-transparent to-75% lg:block" />
    </div>
  );
}
