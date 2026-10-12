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
