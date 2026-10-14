import { prefersReducedMotion } from './motion';

/**
 * Scroll positions at which each child's start lines up with the list's scroll padding
 * (i.e. where `snap-start` items rest), plus the very end of the list.
 */
export function snapPoints(list: HTMLElement): number[] {
  const max = list.scrollWidth - list.clientWidth;
  const padding = parseFloat(getComputedStyle(list).scrollPaddingLeft) || 0;
  const origin = list.getBoundingClientRect().left - list.scrollLeft;

  const points = Array.from(list.children, (child) => {
    const start = child.getBoundingClientRect().left - origin - padding;
    return Math.min(Math.max(start, 0), max);
  });
  return [...new Set([...points, max])].sort((a, b) => a - b);
}

/** The snap point closest to `left`. */
export function nearestSnapPoint(list: HTMLElement, left: number): number {
  return snapPoints(list).reduce((best, point) =>
    Math.abs(point - left) < Math.abs(best - left) ? point : best,
  );
}

/** Smooth unless the user prefers reduced motion. */
export const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth');
