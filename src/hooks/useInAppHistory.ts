import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Module-level: survives client-side navigations, resets on a full page load.
let navigationCount = 0;

/** Call once in a component that is mounted on every page (the NavBar). */
export function useTrackInAppNavigation() {
  const pathname = usePathname();
  useEffect(() => {
    navigationCount += 1;
  }, [pathname]);
}

/** True when the user has navigated within the app, so `router.back()` stays on-site. */
export const hasInAppHistory = () => navigationCount > 1;
