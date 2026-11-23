import { MediaMode } from '@/types/mediaMode';
import { api, HomeList } from '@/utils/api';

import MediaRowClient from './MediaRowClient';

import type { Route } from 'next';

type Source =
  /** A TMDB list endpoint, e.g. `movie/popular`. */
  | { endpoint: string; list?: never }
  /** A curated list with its own filtering (in cinemas, coming soon, new episodes). */
  | { list: HomeList; endpoint?: never };

type Props = Source & {
  title: React.ReactNode;
  /** "See all" destination. */
  href?: Route;
  mediaMode: MediaMode;
};

/** Server half of a media row: fetches the titles and genre names. Renders nothing if empty. */
export default async function MediaRow({ endpoint, list, title, href, mediaMode }: Props) {
  const [media, { genresMap }] = await Promise.all([
    list ? api.media.getHomeList(list) : api.media.getSliderData(mediaMode, endpoint),
    api.genre.getGenres(mediaMode),
  ]);
  if (media.length === 0) return null;

  return (
    <MediaRowClient
      media={media}
      title={title}
      href={href}
      mediaMode={mediaMode}
      genres={genresMap}
    />
  );
}
