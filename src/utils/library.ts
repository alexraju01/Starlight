import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

/**
 * The visitor's own lists (My List, recently viewed), kept in this browser's localStorage:
 * no account, nothing leaves the device. Each list is a tiny external store for
 * `useSyncExternalStore`, kept in sync across tabs via the `storage` event.
 */

/** What's stored per title: enough to render a media card without refetching. */
export interface SavedTitle {
  id: number;
  media_type: MediaMode;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  /** When it was saved / last viewed (ms). Newest first. */
  savedAt: number;
}

export const toSavedTitle = (media: MediaWithDetails): SavedTitle => ({
  id: media.id,
  media_type: media.media_type,
  ...(media.media_type === MediaMode.MOVIE
    ? { title: media.title, release_date: media.release_date }
    : { name: media.name, first_air_date: media.first_air_date }),
  poster_path: media.poster_path,
  backdrop_path: media.backdrop_path,
  vote_average: media.vote_average,
  vote_count: media.vote_count,
  // Details pages have `genres` (objects), lists have `genre_ids`.
  genre_ids: media.genre_ids?.length ? media.genre_ids : (media.genres?.map((g) => g.id) ?? []),
  savedAt: Date.now(),
});

/** Saved titles have all a card reads, so they render with the regular media components. */
export const asMedia = (saved: SavedTitle) => saved as unknown as MediaWithDetails;

export const sameTitle = (a: Pick<SavedTitle, 'id' | 'media_type'>, b: typeof a) =>
  a.id === b.id && a.media_type === b.media_type;

const EMPTY: SavedTitle[] = [];

export interface ListStore {
  subscribe: (listener: () => void) => () => void;
  /** `null` on the server: the list is only known in the browser. */
  getSnapshot: () => SavedTitle[];
  getServerSnapshot: () => null;
  add: (title: SavedTitle) => void;
  remove: (title: Pick<SavedTitle, 'id' | 'media_type'>) => void;
  clear: () => void;
}

function createListStore(key: string, max: number): ListStore {
  let cache: SavedTitle[] | null = null;
  const listeners = new Set<() => void>();

  const read = (): SavedTitle[] => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) ?? '[]');
      return Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      return EMPTY; // storage blocked (private mode) or corrupted
    }
  };

  const write = (list: SavedTitle[]) => {
    cache = list.slice(0, max);
    try {
      window.localStorage.setItem(key, JSON.stringify(cache));
    } catch {
      // Storage full or blocked: keep the in-memory list for this visit.
    }
    listeners.forEach((listener) => listener());
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== key) return;
    cache = null;
    listeners.forEach((listener) => listener());
  };

  return {
    subscribe(listener) {
      if (listeners.size === 0) window.addEventListener('storage', onStorage);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener('storage', onStorage);
      };
    },
    getSnapshot: () => (cache ??= read()),
    getServerSnapshot: () => null,
    add(title) {
      const current = cache ?? read();
      write([title, ...current.filter((t) => !sameTitle(t, title))]);
    },
    remove(title) {
      write((cache ?? read()).filter((t) => !sameTitle(t, title)));
    },
    clear: () => write(EMPTY),
  };
}

export const myList = createListStore('starlight:my-list', 500);
export const recentlyViewed = createListStore('starlight:recently-viewed', 20);
