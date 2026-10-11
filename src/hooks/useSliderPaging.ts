import { useState } from 'react';

/**
 * Page-by-page navigation for a row slider: each arrow moves a full screen of items, never
 * past the first item or beyond the point where the last item is flush with the right edge.
 */
export function useSliderPaging(totalItems: number, itemsPerScreen: number | null) {
  const [index, setIndex] = useState(0);
  const perScreen = itemsPerScreen ?? 1;
  const maxIndex = Math.max(0, totalItems - perScreen);

  return {
    index,
    canGoPrev: index > 0,
    canGoNext: index < maxIndex,
    prev: () => setIndex((i) => Math.max(i - perScreen, 0)),
    next: () => setIndex((i) => Math.min(i + perScreen, maxIndex)),
  };
}
