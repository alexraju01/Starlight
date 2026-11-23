import { useSyncExternalStore } from 'react';

import { ListStore, SavedTitle, myList, recentlyViewed, sameTitle } from '@/utils/library';

/** A list's titles, newest first – or `null` before hydration (it's only known in the browser). */
const useList = (store: ListStore): SavedTitle[] | null =>
  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

export const useMyList = () => useList(myList);
export const useRecentlyViewed = () => useList(recentlyViewed);

/** Whether a title is in My List (false until hydrated). */
export function useIsSaved(title: Pick<SavedTitle, 'id' | 'media_type'>): boolean {
  const list = useMyList();
  return list?.some((saved) => sameTitle(saved, title)) ?? false;
}
