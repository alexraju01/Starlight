import { useEffect, useSyncExternalStore } from 'react';

import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { getSeasonCountsAction } from '@/utils/serverActions/seasonCounts';

/*
 * Season counts for TV cards, loaded after the page renders (lists don't include them).
 * One shared store for the whole session: each grid or row requests its missing ids in a
 * single call, and every card reads its own count – so counts survive navigation and each
 * show is only ever asked for once.
 */
const counts = new Map<number, number>();
const requested = new Set<number>();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Requests season counts for the TV shows in `media` that don't already have one. */
export function useRequestSeasonCounts(media: MediaWithDetails[]) {
  const missing = media
    .filter((m) => m.media_type === MediaMode.TV && m.number_of_seasons == null)
    .map((m) => m.id)
    .filter((id) => !requested.has(id));
  const key = missing.join(',');

  useEffect(() => {
    const ids = key
      ? key
          .split(',')
          .map(Number)
          .filter((id) => !requested.has(id))
      : [];
    if (ids.length === 0) return;
    ids.forEach((id) => requested.add(id));
    getSeasonCountsAction(ids)
      .then((result) => {
        Object.entries(result).forEach(([id, count]) => counts.set(Number(id), count));
        listeners.forEach((listener) => listener());
      })
      // Allow a retry on a later render; the badge simply stays hidden meanwhile.
      .catch(() => ids.forEach((id) => requested.delete(id)));
  }, [key]);
}

/** The loaded season count for show `id` (null until loaded, or for non-TV cards). */
export function useSeasonCount(id: number | null): number | null {
  return useSyncExternalStore(
    subscribe,
    () => (id === null ? null : (counts.get(id) ?? null)),
    () => null,
  );
}
