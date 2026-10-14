import { cache } from 'react';

import { TTL, fetchData } from '@/utils/fetchData';
import { logError } from '@/utils/logger';

/**
 * Season count for TV cards. List endpoints don't include it, so each show needs its own
 * request: React `cache` dedupes them per render, and counts change rarely (week-long cache).
 */
export const getTvSeasons = cache(async (id: number): Promise<number | null> => {
  try {
    const data = await fetchData<{ number_of_seasons: number }>('3', `tv/${id}`, {
      cache: { type: 'revalidate', seconds: TTL.WEEK },
    });

    return data.number_of_seasons ?? null;
  } catch (error) {
    logError(`getTvSeasons ${id}`, error);
    return null;
  }
});
