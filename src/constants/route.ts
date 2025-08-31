// routes.ts
import { slugify } from '@/utils/string/slugify';

import type { MediaMode } from '@/types/mediaMode';
import type { Route } from 'next';

export const ROUTES = {
  HOME: '/' as Route,

  MOVIE: (id: number, slug?: string): Route =>
    (slug ? `/movie/${id}-${slugify(slug)}` : `/movie/${id}`) as Route,

  TV: (id: number, slug?: string): Route =>
    (slug ? `/tv/${id}-${slugify(slug)}` : `/tv/${id}`) as Route,

  MEDIA: (mode: MediaMode, id: number, slug?: string): Route =>
    (mode === 'movie' ? ROUTES.MOVIE(id, slug) : ROUTES.TV(id, slug)) as Route,

  GENRE: (id: number): Route => `/genre/${id}` as Route,

  DISCOVER: (text: string): Route => `/discover?search=${slugify(text)}` as Route,
} as const;
