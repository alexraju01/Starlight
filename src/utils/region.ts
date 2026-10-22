import 'server-only';

import { headers } from 'next/headers';

/** Used when the visitor's country is unknown (local dev, or no geo header). */
export const DEFAULT_REGION = 'GB';

/** The visitor's country (ISO 3166-1, e.g. "GB"), from Vercel's geolocation header. */
export async function getViewerRegion(): Promise<string> {
  const country = (await headers()).get('x-vercel-ip-country')?.toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : DEFAULT_REGION;
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

/** "GB" → "United Kingdom". */
export const regionName = (code: string): string => {
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
};
