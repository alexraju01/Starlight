/** Raw TMDB `watch/providers` entry (JustWatch data). */
export interface TmdbWatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

/** Raw TMDB `watch/providers` result for one country. */
export interface TmdbWatchRegion {
  /** TMDB's watch page for the title, which links out to each service. */
  link: string;
  flatrate?: TmdbWatchProvider[];
  free?: TmdbWatchProvider[];
  ads?: TmdbWatchProvider[];
  rent?: TmdbWatchProvider[];
  buy?: TmdbWatchProvider[];
}

export type WatchKind = 'stream' | 'free' | 'rent' | 'buy';

export interface WatchProvider {
  id: number;
  name: string;
  logoPath: string;
}

/** Where a title can be watched in one country, grouped by how. Empty groups are left out. */
export interface WatchOptions {
  /** ISO 3166-1 country code, e.g. "GB". */
  region: string;
  link: string;
  groups: { kind: WatchKind; providers: WatchProvider[] }[];
}
