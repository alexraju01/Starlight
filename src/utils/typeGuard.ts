import { GenreMovie, Media, Movie, TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
// Utility type guards
// export function isMovie(media: Media): media is Movie {
// 	return (media as Movie).media_type === "movie";
// }

// export function isTVShow(media: Media): media is TVShow {
// 	return (media as TVShow).media_type === "tv";
// }

// utils/typeGuards.ts

export function isMovie(item: Media): item is Movie {
  return item.media_type === MediaMode.MOVIE;
}

export function isTVShow(item: Media): item is TVShow {
  return item.media_type === MediaMode.TV;
}

export function isGenreMovie(item: Media): item is GenreMovie {
  return 'genre_ids' in item;
}
