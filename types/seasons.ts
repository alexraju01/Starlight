export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

/** One episode in a season (TMDB `tv/{id}/season/{n}`, fields used only). */
export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  runtime: number | null;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  /** "standard", "finale" or "mid_season". */
  episode_type: string;
}

/** A season with its episodes. */
export interface SeasonDetails {
  id: number;
  name: string;
  overview: string;
  air_date: string | null;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
  networks?: { id: number; name: string }[];
  episodes: Episode[];
}
