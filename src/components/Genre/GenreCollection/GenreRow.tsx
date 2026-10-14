'use client';

import { Children } from 'react';

import RowSlider from '@/components/Media/RowSlider/RowSlider';
import { GENRE_ROW_COLUMNS } from '@/constants/breakpoints';

import type { Route } from 'next';

interface Props {
  title: string;
  href?: Route;
  children: React.ReactNode;
}

/** Paged row of server-rendered genre cards ("Browse by genre" on the home page). */
export default function GenreRow({ title, href, children }: Props) {
  const items = Children.toArray(children);

  return (
    <RowSlider
      title={title}
      href={href}
      breakpoints={GENRE_ROW_COLUMNS}
      count={items.length}
      renderItem={(i) => items[i]}
    />
  );
}
