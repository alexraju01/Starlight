'use client';

import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

/** Fills its (positioned) parent; shows a placeholder when there's no image or it fails to load. */
export default function ImageWithFallback({ src, alt, className = '' }: Props) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label="Image not available"
        className={`flex h-full w-full items-center justify-center bg-[#222] text-center text-white/40 ${className}`}
      >
        <ImageOff aria-hidden="true" className="size-1/3 max-h-[25px] max-w-[25px]" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="200px"
      className={className}
      style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
      onError={() => setHasError(true)}
    />
  );
}
