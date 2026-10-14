import { Media } from './global';

export interface Genre {
  id: number;
  name: string;
}
export interface GenreResponse {
  genres: Genre[];
}

/** A genre's id on each side – TMDB's movie and TV genre lists only partly overlap. */
export type GenreIds = { movie?: number; tv?: number };

/** One tile on the genres index. */
export interface GenreShowcaseItem {
  name: string;
  ids: GenreIds;
  backdropPath: string | null;
  /** The popular title the backdrop belongs to. */
  featuredTitle: string | null;
  posterPaths: string[];
}

export interface GenreWithMovies {
  id: number;
  name: string;
  movies: Media[];
}
