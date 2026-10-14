/**
 * Items per row by viewport width: the first entry whose `max` (px, inclusive) fits wins.
 * The `max` values are Tailwind's breakpoints minus one, so JS (row paging, edge cards)
 * agrees with the CSS grid columns at every width.
 */
export type Breakpoint = { max: number; value: number };

/** Media card grids and rows. Must match MediaGrid's `grid-cols-*` classes. */
export const MEDIA_COLUMNS: Breakpoint[] = [
  { max: 639, value: 2 },
  { max: 767, value: 3 },
  { max: 1279, value: 4 },
  { max: 1535, value: 5 },
  { max: Infinity, value: 6 },
];

/** "Browse by genre" row on the home page. */
export const GENRE_ROW_COLUMNS: Breakpoint[] = [
  { max: 500, value: 2 },
  { max: 768, value: 3 },
  { max: 1000, value: 4 },
  { max: Infinity, value: 5 },
];
