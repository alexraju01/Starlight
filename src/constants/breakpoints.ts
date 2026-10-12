/**
 * Items per row by viewport width: the first entry whose `max` (px, inclusive) fits wins.
 *
 * The `max` values are Tailwind's breakpoints minus one (sm 640, md 768, lg 1024,
 * xl 1280, 2xl 1536), so JS logic (edge cards, slider paging) agrees with the CSS
 * grid columns at every width – including the exact breakpoint pixels.
 */
export type Breakpoint = { max: number; value: number };

/**
 * Media card grids and the home rows. Must match MovieGrid's Tailwind columns:
 * `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`.
 */
export const CAROUSEL_BREAKPOINTS: Breakpoint[] = [
  { max: 639, value: 2 },
  { max: 767, value: 3 },
  { max: 1279, value: 4 },
  { max: 1535, value: 5 },
  { max: Infinity, value: 6 },
];

/** "More like this" row on the details page: one more card per row from md up. */
export const DISCOVER_BREAKPOINTS: Breakpoint[] = [
  { max: 639, value: 2 },
  { max: 767, value: 3 },
  { max: 1023, value: 4 },
  { max: 1279, value: 5 },
  { max: 1535, value: 6 },
  { max: Infinity, value: 7 },
];

/** "Browse by genre" row on the home page (5 per screen above 1000px). */
export const GENRE_COLLECTION_BREAKPOINTS: Breakpoint[] = [
  { max: 500, value: 2 },
  { max: 768, value: 3 },
  { max: 1000, value: 4 },
  { max: Infinity, value: 5 },
];
