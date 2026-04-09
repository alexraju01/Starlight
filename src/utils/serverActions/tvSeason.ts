import { cache } from 'react';

import { fetchData } from '@/utils';

export const getTvSeasons = cache(async (id: number): Promise<number | null> => {
  try {
    const data = await fetchData<{ number_of_seasons: number }>('3', `tv/${id}`, {
      cache: { type: 'revalidate', seconds: 60 * 60 * 24 }, // 1 day
    });

    return data.number_of_seasons ?? null;
  } catch (error) {
    console.error(`Failed to fetch seasons for TV ${id}`, error);
    return null;
  }
});
