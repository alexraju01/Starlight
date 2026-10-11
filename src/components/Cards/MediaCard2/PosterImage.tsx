import { ImageOff } from 'lucide-react';
import Image from 'next/image';

import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
}

const PosterImage = ({ src, alt, className, priority = false }: Props) => {
  const url = getImageUrl(src, 'poster', 'w342');

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
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 342px"
      className={`object-cover ${className || ''}`}
    />
  );
};

export default PosterImage;
