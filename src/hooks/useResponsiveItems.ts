import { useCallback, useSyncExternalStore } from 'react';

import type { Breakpoint } from '@/constants/breakpoints';

// One shared `resize` listener for every component using this hook (previously each grid
// and slider registered its own).
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  if (listeners.size === 0) window.addEventListener('resize', notify);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener('resize', notify);
  };
};

/** The server can't know the viewport: callers render their CSS-only layout until hydrated. */
const serverSnapshot = () => null;

/**
 * Items per row for the current viewport, or `null` before hydration. Only re-renders when
 * the result changes (crossing a breakpoint), not on every pixel of a resize.
 */
export const useResponsiveItems = (breakpoints: Breakpoint[]): number | null => {
  const snapshot = useCallback(() => {
    const width = window.innerWidth;
    return (breakpoints.find((bp) => width <= bp.max) ?? breakpoints[breakpoints.length - 1]).value;
  }, [breakpoints]);

  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
};
