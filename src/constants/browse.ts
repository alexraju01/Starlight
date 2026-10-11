/** Sort orders offered on the Movies / TV Shows pages (`?sort=`). */
export const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'top_rated', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortOption = 'popular';

/** Anything that isn't a known sort (missing, typo, array) falls back to the default. */
export const parseSort = (value: unknown): SortOption =>
  SORT_OPTIONS.some((option) => option.value === value) ? (value as SortOption) : DEFAULT_SORT;
