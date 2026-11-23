'use server';

import { getTvSeasons } from './tvSeason';
import { isPositiveInt } from './validate';

/** Most ids one call may ask for: a grid page or row is 20 shows. */
const MAX_IDS = 60;

/**
 * Season counts for TV cards, many shows per call. Lists don't include the count, so cards
 * ask for it after the page has rendered instead of the page waiting for one request per show.
 */
export async function getSeasonCountsAction(ids: unknown): Promise<Record<number, number>> {
  if (!Array.isArray(ids) || ids.length > MAX_IDS || !ids.every((id) => isPositiveInt(id))) {
    return {};
  }
  const counts = await Promise.all(ids.map((id) => getTvSeasons(id)));
  return Object.fromEntries(ids.flatMap((id, i) => (counts[i] ? [[id, counts[i]] as const] : [])));
}
