import { MediaMode } from './mediaMode';

/** Raw TMDB `combined_credits` entry (fields used only). */
export interface TmdbPersonCredit {
  id: number;
  media_type: MediaMode;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids?: number[];
  vote_count: number;
  vote_average: number;
  character?: string;
  episode_count?: number;
  job?: string;
  department?: string;
}

/** Raw TMDB `person/{id}` with `combined_credits` and `external_ids` appended. */
export interface TmdbPersonResponse {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  also_known_as: string[];
  combined_credits: { cast: TmdbPersonCredit[]; crew: TmdbPersonCredit[] };
  external_ids: { imdb_id: string | null; instagram_id: string | null; wikidata_id: string | null };
}

/** One title in a person's filmography. Several jobs on one title are merged into `role`. */
export interface PersonCredit {
  mediaType: MediaMode;
  id: number;
  title: string;
  /** Release / first air date, or '' when unannounced. */
  date: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteCount: number;
  /** Character played, or the job(s) for crew credits ("Producer, Writer"). */
  role: string;
  /** "Acting" for cast credits, else the crew department ("Directing", "Production"…). */
  department: string;
  /** TV cast only. */
  episodeCount?: number;
}

export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  profilePath: string | null;
  /** "Acting", "Directing", … */
  knownForDepartment: string;
  alsoKnownAs: string[];
  /** Most-voted titles in the person's main department, best known first. */
  knownFor: PersonCredit[];
  /** Every credit, newest first (unannounced dates first). */
  credits: PersonCredit[];
  links: { imdb: string | null; instagram: string | null; wikidata: string | null };
}

/** A person in a list (people page, search): enough for a card. */
export interface PersonSummary {
  id: number;
  name: string;
  profilePath: string | null;
  /** Titles shown under the name, best known first. */
  knownFor: string[];
}

/** Raw TMDB `search/person` result (fields used only). */
export interface TmdbPersonSearchResult {
  id: number;
  name: string;
  adult: boolean;
  profile_path: string | null;
  popularity: number;
  known_for?: { title?: string; name?: string }[];
}

/** A trending movie or show with its top-billed cast (People page). */
export interface TrendingCast {
  mediaType: MediaMode;
  id: number;
  title: string;
  date: string;
  posterPath: string | null;
  backdropPath: string | null;
  cast: { id: number; name: string; profilePath: string; character: string; popularity: number }[];
}
