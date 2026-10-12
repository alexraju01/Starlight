import { ImageOff } from 'lucide-react';
import Image from 'next/image';

import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
  /**
   * `backdrop`: the landscape art shown when a card enlarges (up to ~70vw on phones,
   * ~26–41vw on desktop) – fetched at w780 so it isn't a blurry upscale of a 342px poster.
   */
  variant?: 'poster' | 'backdrop';
}

const PosterImage = ({ src, alt, className, priority = false, variant = 'poster' }: Props) => {
  const isBackdrop = variant === 'backdrop';
  const url = isBackdrop
    ? getImageUrl(src, 'backdrop', 'w780')
    : getImageUrl(src, 'poster', 'w342');

  // Previously a missing poster produced a broken URL ("…/w342Media Poster").
  if (!url) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#222] text-white/40 ${className || ''}`}
      >
        <ImageOff className="size-8" aria-hidden="true" />
        <span className="line-clamp-2 px-3 text-center text-[12px]">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      // Lazy-load: grids render dozens of posters and most are below the fold.
      loading={priority ? 'eager' : 'lazy'}
      fill
      sizes={
        isBackdrop
          ? '(min-width: 1536px) 26vw, (min-width: 1024px) 38vw, (min-width: 640px) 53vw, 70vw'
          : '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 342px'
      }
      className={`object-cover ${className || ''}`}
    />
  );
};

export default PosterImage;
