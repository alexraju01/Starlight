import { MediaMode } from '@/types/mediaMode';

// Server actions are public HTTP endpoints – never trust their arguments.

export const isMediaMode = (value: unknown): value is MediaMode =>
  value === MediaMode.MOVIE || value === MediaMode.TV;

export const isPositiveInt = (value: unknown, max = Number.MAX_SAFE_INTEGER): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= max;

/** TMDB discover/search endpoints cap pagination at 500. */
export const MAX_PAGE = 500;
export const MAX_QUERY_LENGTH = 100;
