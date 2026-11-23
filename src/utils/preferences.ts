/**
 * The visitor's privacy choices, kept in localStorage. Storing a choice someone made is
 * allowed without asking; what each choice switches on is only stored once they say yes.
 * `undefined` means they haven't been asked yet.
 */
export interface Preferences {
  /** Remember recently viewed titles between visits (for the home page rows). */
  history?: boolean;
  /** Play muted YouTube trailers when hovering a card (YouTube may store data). */
  trailerPreviews?: boolean;
}

const KEY = 'starlight:prefs';
const EMPTY: Preferences = {};

let cache: Preferences | null = null;
const listeners = new Set<() => void>();

const read = (): Preferences => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? '{}');
    return parsed && typeof parsed === 'object' ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
};

const notify = () => listeners.forEach((listener) => listener());

const onStorage = (event: StorageEvent) => {
  if (event.key !== KEY) return;
  cache = null;
  notify();
};

export const preferences = {
  subscribe(listener: () => void) {
    if (listeners.size === 0) window.addEventListener('storage', onStorage);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) window.removeEventListener('storage', onStorage);
    };
  },
  getSnapshot: (): Preferences => (cache ??= read()),
  /** `null` on the server: choices are only known in the browser. */
  getServerSnapshot: (): Preferences | null => null,
  set(change: Partial<Preferences>) {
    cache = { ...(cache ?? read()), ...change };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(cache));
    } catch {
      // Blocked: the choice holds for this visit.
    }
    notify();
  },
  /** Forgets every choice, so the visitor is asked again. */
  reset() {
    cache = EMPTY;
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // Blocked: nothing was stored.
    }
    notify();
  },
};
