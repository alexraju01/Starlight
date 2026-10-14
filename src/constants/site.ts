/**
 * Single source of truth for the public site URL used in metadata,
 * canonical links, robots.txt and sitemaps.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.starlightdiscover.co.uk'
).replace(/\/+$/, '');

export const SITE_NAME = 'StarLight';
