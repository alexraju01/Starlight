import { GenreMovie, Media } from './global';

export interface Genre {
  id: number;
  name: string;
}
export interface GenreResponse {
  genres: Genre[];
}

export interface GenreWithMovies {
  id: number;
  name: string;
  movies: Media[]; // or MoviesWithLogos[] if logos are included
}
