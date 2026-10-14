export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  character: string;
  credit_id: string;
  order: number;
}

/** Raw TMDB `tv/{id}/aggregate_credits` cast entry (fields used only). */
export interface TvAggregateCastMember {
  id: number;
  name: string;
  profile_path: string | null;
  total_episode_count: number;
  roles?: { character: string; episode_count: number }[];
}

/** Raw TMDB crew entry (fields used only). */
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

/** One person in a title's cast, the same shape for movie credits and TV aggregate credits. */
export interface CastPerson {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  /** TV only: episodes across the whole series. */
  episodeCount?: number;
}

/** A key behind-the-camera role, e.g. "Director" with its people. */
export interface CrewCredit {
  job: string;
  people: { id: number; name: string; profilePath: string | null }[];
}

export interface Credits {
  cast: CastPerson[];
  keyCrew: CrewCredit[];
}
