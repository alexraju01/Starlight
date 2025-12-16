import { MediaWithDetails, MovieListItem, TVShowListItem } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

export function isMovie(item: MediaWithDetails): item is MovieListItem {
  return item.media_type === MediaMode.MOVIE;
}
export function isTVShow(item: MediaWithDetails): item is TVShowListItem {
  return item.media_type === MediaMode.TV;
}

export function isGenreMovie(item: MediaWithDetails): item is MovieListItem {
  return 'genre_ids' in item;
}
