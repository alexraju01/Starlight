/**
 * Columns item `index` should span so a grid's last row is always full: leftover items
 * share the row (2 leftovers in 4 columns span 2 each; 1 leftover spans the whole row).
 * Every other item spans 1.
 */
export const spanFor = (index: number, count: number, columns: number): number => {
  const leftover = count % columns;
  const lastRowStart = count - leftover;
  if (leftover === 0 || index < lastRowStart) return 1;
  const position = index - lastRowStart;
  return Math.floor(columns / leftover) + (position < columns % leftover ? 1 : 0);
};

// Literal class names so Tailwind generates them: [unused, span 1, span 2, span 3].
const BASE_SPANS = ['', 'col-span-1', 'col-span-2'];
const SM_SPANS = ['', 'sm:col-span-1', 'sm:col-span-2', 'sm:col-span-3'];

/** Span classes for a grid with 2 columns, then 3 from `sm` (the genre mood grids). */
export const gridSpanClasses = (index: number, count: number): string =>
  `${BASE_SPANS[spanFor(index, count, 2)]} ${SM_SPANS[spanFor(index, count, 3)]}`;
