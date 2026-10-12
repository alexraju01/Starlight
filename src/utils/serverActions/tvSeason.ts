import { cache } from 'react';

import { fetchData } from '@/utils/fetchData';

/** Season counts change at most a few times a year, so a week-long cache is plenty. */
const SEASONS_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Season count for the "N Seasons" badge on TV cards. List endpoints don't include it, so
 * each show needs its own request; React `cache` dedupes them within a render and the
 * long revalidate keeps repeat lookups rare.
 */
export const getTvSeasons = cache(async (id: number): Promise<number | null> => {
  try {
    const data = await fetchData<{ number_of_seasons: number }>('3', `tv/${id}`, {
      cache: { type: 'revalidate', seconds: SEASONS_REVALIDATE_SECONDS },
    });

    return data.number_of_seasons ?? null;
  } catch (error) {
    console.error(`Failed to fetch seasons for TV ${id}`, error);
    return null;
  }
});
