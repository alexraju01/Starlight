'use client';

import { Children } from 'react';

import RowSlider from '@/components/Media/RowSlider/RowSlider';
import { GENRE_COLLECTION_BREAKPOINTS } from '@/constants/breakpoints';

import type { Route } from 'next';

interface SliderProps {
  title: string;
  href?: Route;
  children: React.ReactNode;
}

/** Row slider for server-rendered cards ("Our Genres" on the home page). */
export default function Slider({ title, href, children }: SliderProps) {
  const items = Children.toArray(children);

  return (
    <RowSlider
      title={title}
      href={href}
      breakpoints={GENRE_COLLECTION_BREAKPOINTS}
      count={items.length}
      renderItem={(i) => items[i]}
    />
  );
}
