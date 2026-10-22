import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { ROUTES } from '@/constants/route';
import { SITE_URL } from '@/constants/site';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import { api } from './api';
import { getImageUrl } from './image/getImageUrl';
import { displayName, getMediaDate } from './media';

import type { Metadata } from 'next';

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
  async (mediaMode: MediaMode, slug: string): Promise<MediaWithDetails> => {
    const id = parseMediaId(slug);
    if (!id) notFound();

    const media = await api.media.getOneMedia(mediaMode, id);
    if (!media) notFound();

    return media;
  },
);

/** Cuts at a word boundary so search snippets never end mid-word. */
const truncate = (text: string, max: number) =>
  text.length <= max
    ? text
    : `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s.,;:!?–-]+$/, '')}…`;

export function buildMediaMetadata(media: MediaWithDetails, mediaMode: MediaMode): Metadata {
  const name = displayName(media);
  const year = getMediaDate(media)?.slice(0, 4);
  const label = `${name}${year ? ` (${year})` : ''}`;
  // Worded the way people search: "where to watch <title>", "<title> trailer", "<show> seasons".
  const title =
    mediaMode === MediaMode.MOVIE
      ? `${label} – Where to Watch, Trailer & Cast`
      : `${label} – Where to Watch, Seasons & Cast`;
  const lead =
    mediaMode === MediaMode.MOVIE
      ? `Where to watch ${label}: streaming, rental and purchase options, plus the trailer and cast.`
      : `Where to watch ${label}: streaming options, every season, the trailer and cast.`;
  const description = truncate(media.overview ? `${lead} ${media.overview}` : lead, 160);
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
export function buildMediaJsonLd(media: MediaWithDetails, mediaMode: MediaMode) {
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
