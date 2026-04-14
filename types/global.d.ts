import { MediaMode } from './mediaMode';

/* ---------------------------------- */
/*          Base Types */
/* ---------------------------------- */

type ID = number;

interface BaseMedia {
  id: ID;
  adult: boolean;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  poster_path: string | null;
  original_language: string;
}

/* ---------------------------------- */
/*          Movie Types */
/* ---------------------------------- */

interface Movie extends BaseMedia {
  media_type: MediaMode.MOVIE;
  title: string;
  original_title: string;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  imdb_id: string;
  video: boolean;
  genres?: Genre[];
  genre_ids?: number[];
  production_countries: ProductionCountry[];
  production_companies?: ProductionCompany[];
  belongs_to_collection?: object | null;
}

/* ---------------------------------- */
/*          TV Types */
/* ---------------------------------- */

interface TVShow extends BaseMedia {
  media_type: MediaMode.TV;
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  type: string;
  genres?: Genre[];
  genre_ids?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  seasons?: Season[];
  networks?: Network[];
  created_by?: Creator[];
  last_episode_to_air?: Episode | null;
  next_episode_to_air?: Episode | null;
  origin_country: string[];
  languages?: string[];
  spoken_languages?: SpokenLanguage[];
  production_countries: ProductionCountry[];
  production_companies?: ProductionCompany[];
}

/* ---------------------------------- */
/*          Unified Types */
/* ---------------------------------- */
type Media = Movie | TVShow;

export type MediaListItem = (Movie & { genre_ids: number[] }) | (TVShow & { genre_ids: number[] });

/* ---------------------------------- */
/*          Extended Types */
/* ---------------------------------- */

export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export type MovieWithLogos = Movie & {
  logoImage?: string;
};

export type MediaWithDetails = (Movie | TVShow) & {
  genre_ids: number[];
  number_of_seasons?: number;
  logoImage?: string;
};

/* ---------------------------------- */
/*          API Responses */
/* ---------------------------------- */

export interface APIResponse<T = Media> {
  page?: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
}

/* ---------------------------------- */
/*          Global Types */
/* ---------------------------------- */

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT | unknown;
  }
}
