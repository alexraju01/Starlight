import { useEffect, useState } from 'react';

type Breakpoint = { max: number; value: number };

/**
 * Returns how many items fit per row for the current viewport, or `null` before hydration.
 * Widths above the largest breakpoint fall back to `defaultValue`, which defaults to the
 * last breakpoint's value (previously a hard-coded 4, so >1980px screens showed 4 huge cards).
 */
export const useResponsiveItems = (
  breakpoints: Breakpoint[],
  defaultValue: number = breakpoints[breakpoints.length - 1]?.value ?? 4,
): number | null => {
  const [itemsPerScreen, setItemsPerScreen] = useState<number | null>(null);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      const matched = breakpoints.find((bp) => width <= bp.max);
      setItemsPerScreen(matched?.value ?? defaultValue);
    };

    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, [breakpoints, defaultValue]);

  return itemsPerScreen;
};
