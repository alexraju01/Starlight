import { MediaMode } from '@/types/mediaMode';
import { slugify } from '@/utils/stringUtils';

import type { Route } from 'next';

/** First path segments that exist – the 404 page suggests the closest one for a typo. */
export const TOP_LEVEL_ROUTES = ['movie', 'tv', 'genre', 'discover'];

export const ROUTES = {
  HOME: '/' as Route,

  MOVIE: (id: number, slug?: string): Route =>
    (slug ? `/movie/${id}-${slugify(slug)}` : `/movie/${id}`) as Route,

  TV: (id: number, slug?: string): Route =>
    (slug ? `/tv/${id}-${slugify(slug)}` : `/tv/${id}`) as Route,

  MEDIA: (mode: MediaMode, id: number, slug?: string): Route =>
    mode === MediaMode.MOVIE ? ROUTES.MOVIE(id, slug) : ROUTES.TV(id, slug),

  GENRE: (name: string): Route => `/genre/${slugify(name)}` as Route,

  DISCOVER_HOME: '/discover' as Route,

  DISCOVER: (text: string): Route => `/discover?search=${encodeURIComponent(text.trim())}` as Route,
} as const;
