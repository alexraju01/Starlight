import { Season } from '@/types/seasons';

/** Seasons in viewing order: 1, 2, 3…, then "Specials" (TMDB's season 0) last. */
export const orderSeasons = (seasons: Season[] = []): Season[] => [
  ...seasons.filter((s) => s.season_number > 0),
  ...seasons.filter((s) => s.season_number === 0),
];
