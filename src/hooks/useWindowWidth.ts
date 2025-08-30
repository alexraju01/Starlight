import { useEffect, useState } from 'react';

/**
 * Custom React Hook to track the current window width.
 *
 * - Returns the `window.innerWidth` value as a stateful number.
 * - Handles SSR (Server-Side Rendering) by initializing with `undefined`.
 * - Automatically updates when the browser window is resized.
 *
 * @returns {number | undefined} The current width of the window, or `undefined` on initial render during SSR.
 */
const useWindowWidth = (): number | undefined => {
  // Initialize width state; undefined ensures SSR compatibility (window is not defined on the server)
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Define a function to update the width state with the current window width
    const updateWidth = () => setWidth(window.innerWidth);

    // Immediately call to set initial width once on client-side mount
    updateWidth();

    // Register resize listener to keep the width state updated
    window.addEventListener('resize', updateWidth);

    // Clean up the listener on unmount to prevent memory leaks
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Return the current window width (or undefined during initial SSR render)
  return width;
};

export default useWindowWidth;
