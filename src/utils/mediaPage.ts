import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { ROUTES } from '@/constants/route';
import { SITE_NAME, SITE_URL } from '@/constants/site';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import { api } from './api';
import { getMediaDate } from './date/formatDate';
import { getImageUrl } from './image/getImageUrl';
import { displayName } from './stringUtils';

import type { Metadata } from 'next';

type DetailMode = MediaMode.MOVIE | MediaMode.TV;

/** `/movie/550-fight-club` → `550`. Returns null for anything that isn't a TMDB id. */
export const parseMediaId = (slug: string): number | null => {
  const id = Number.parseInt(slug, 10);
  return Number.isInteger(id) && id > 0 && /^\d+(-|$)/.test(slug) ? id : null;
};

/**
 * Loads a movie / show for a detail route, or renders the 404 page.
 * Wrapped in React `cache` so generateMetadata and the page share one request.
 */
export const getMediaOrNotFound = cache(
  async (mediaMode: DetailMode, slug: string): Promise<MediaWithDetails> => {
    const id = parseMediaId(slug);
    if (!id) notFound();

    const media = await api.media.getOneMedia(mediaMode, id);
    if (!media) notFound();

    return media;
  },
);

export function buildMediaMetadata(media: MediaWithDetails, mediaMode: DetailMode): Metadata {
  const name = displayName(media);
  const year = getMediaDate(media)?.slice(0, 4);
  const kind = mediaMode === MediaMode.MOVIE ? 'Movie' : 'TV Show';
  const title = `${name}${year ? ` (${year})` : ''} – ${kind} Details`;
  const description =
    media.overview?.slice(0, 160) ||
    `Explore details, cast and similar titles for ${name} on ${SITE_NAME}.`;
  const canonical = ROUTES.MEDIA(mediaMode, media.id, name);
  const image = getImageUrl(media.backdrop_path ?? media.poster_path, 'backdrop', 'w1280');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: mediaMode === MediaMode.MOVIE ? 'video.movie' : 'video.tv_show',
      images: image ? [{ url: image, width: 1280, height: 720, alt: name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** schema.org Movie / TVSeries structured data for rich search results. */
export function buildMediaJsonLd(media: MediaWithDetails, mediaMode: DetailMode) {
  const name = displayName(media);

  return {
    '@context': 'https://schema.org',
    '@type': mediaMode === MediaMode.MOVIE ? 'Movie' : 'TVSeries',
    name,
    url: `${SITE_URL}${ROUTES.MEDIA(mediaMode, media.id, name)}`,
    description: media.overview || undefined,
    image: getImageUrl(media.poster_path, 'poster', 'w500') || undefined,
    datePublished: getMediaDate(media) || undefined,
    genre: media.genres?.map((g) => g.name),
    ...(media.media_type === MediaMode.TV && media.number_of_seasons
      ? { numberOfSeasons: media.number_of_seasons }
      : {}),
    ...(media.vote_count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Math.round(media.vote_average * 10) / 10,
            ratingCount: media.vote_count,
            bestRating: 10,
            worstRating: 0,
          },
        }
      : {}),
  };
}

/** Serialises JSON-LD safely for a <script> tag (prevents `</script>` injection). */
export const jsonLdString = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');
