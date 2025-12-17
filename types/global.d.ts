import { MediaMode } from './mediaMode';

interface BaseMedia {
  id: number;
  adult: boolean;
  media_type: MediaMode;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  poster_path: string | null;
  genres?: Genre[];
  original_language: string;
  production_countries: ProductionCountry[];
  origin_country?: string[];
  spoken_languages?: SpokenLanguage[];
  production_companies?: ProductionCompany[];
}

export interface GenreMovie extends Omit<Movie, 'genres'> {
  genre_ids: number[];
}

interface Movie extends BaseMedia {
  media_type: MediaMode.MOVIE; // ✅ Explicitly define for movies
  title: string;
  original_title: string;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  imdb_id: string;
  video: boolean;
  origin_country: string[];
  belongs_to_collection?: object | null;
}

interface TVShow extends BaseMedia {
  media_type: MediaMode.TV;
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  seasons?: Season[];
  networks?: Network[];
  created_by?: Creator[];
  last_episode_to_air?: Episode | null;
  next_episode_to_air?: Episode | null;
  origin_country: string[];
  type: string;
  languages?: string[];
}

interface MovieListItem extends BaseMedia {
  media_type: MediaMode.MOVIE;
  title: string;
  original_title: string;
  release_date: string;
  genre_ids: number[];
  video: boolean;
}

interface TVShowListItem extends BaseMedia {
  media_type: MediaMode.TV;
  name: string;
  original_name: string;
  first_air_date: string;
  genre_ids: number[];
  origin_country: string[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: Season[];
}

// Unified media type for API responses
type MediaListItem = MovieListItem | TVShowListItem;
type Media = Movie | TVShow;

type MediaWithDetails = (MovieListItem & { number_of_seasons?: number }) | TVListItem;

interface MoviesWithLogos extends Movie {
  logoImage?: string; // Optional because some movies may not have a logo
  genre_ids: number[];
}

export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null; // Some logos may not have a language code
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

type MultiMedia = Movie | TVShow;

interface APIResponse {
  page?: number;
  results: Media[];
  total_pages?: number;
  total_results?: number;
}
