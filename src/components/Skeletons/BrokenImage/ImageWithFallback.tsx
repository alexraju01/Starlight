'use client';
import Image from 'next/image';
import { useState } from 'react';

import BrokenImage from './BrokenImage';

interface Props {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ImageWithFallback({ src, alt, className, width, height }: Props) {
  const [imgError, setImgError] = useState(false);
  // No source at all → show the fallback immediately instead of requesting a 404.
  return imgError || !src ? (
    <BrokenImage className={className ?? ''} />
  ) : (
    <Image
      width={width}
      height={height}
      className={className}
      src={src}
      alt={alt}
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center 20%',
      }}
      sizes="200px"
      onError={() => setImgError(true)}
    />
  );
}
