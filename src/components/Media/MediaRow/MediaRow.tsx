import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import MediaRowClient from './MediaRowClient';

import type { Route } from 'next';

interface Props {
  /** TMDB list endpoint, e.g. `movie/popular`. */
  endpoint: string;
  title: React.ReactNode;
  /** "See all" destination. */
  href?: Route;
  mediaMode: MediaMode;
}

/** Server half of a media row: fetches the titles and genre names. Renders nothing if empty. */
export default async function MediaRow({ endpoint, title, href, mediaMode }: Props) {
  const [media, { genresMap }] = await Promise.all([
    api.media.getSliderData(mediaMode, endpoint),
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
