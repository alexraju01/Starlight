import { MediaMode } from '@/types/mediaMode';

import type { Media } from '@/types';

/** A movie's title or a show's name. */
export const displayName = (media: Media): string =>
  media.media_type === MediaMode.MOVIE ? media.title : media.name;

/** Release date for a movie, first air date for a show. */
export const getMediaDate = (media: Media): string =>
  media.media_type === MediaMode.MOVIE ? media.release_date : media.first_air_date;

/** Stable list key: movies and shows can share numeric ids. */
export const mediaKey = (media: Pick<Media, 'media_type' | 'id'>): string =>
  `${media.media_type}-${media.id}`;
