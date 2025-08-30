// hooks/useResponsiveItems.ts
import { useEffect, useState } from 'react';

type Breakpoint = { max: number; value: number };

export const useResponsiveItems = (breakpoints: Breakpoint[], defaultValue = 4): number | null => {
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
