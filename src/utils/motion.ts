/** The visitor asked their OS for less motion: skip autoplay and animated scrolling. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
