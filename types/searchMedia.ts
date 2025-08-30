import { MediaMode } from './mediaMode';

export interface SearchMedia {
  id: number;
  media_type: MediaMode; // Ensures valid types
  title?: string;
  name?: string;
  poster_path: string | null;
  original_name?: string;
  first_air_date?: string;
  release_date?: string;
  vote_average?: number;
}
