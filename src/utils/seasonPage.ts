import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';

import { ROUTES } from '@/constants/route';
import { SITE_URL } from '@/constants/site';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { SeasonDetails } from '@/types/seasons';

import { api } from './api';
import { formatYear, pluralize } from './format';
import { getImageUrl } from './image/getImageUrl';
import { displayName } from './media';
import { getMediaOrNotFound } from './mediaPage';
import { truncate } from './stringUtils';

import type { Metadata } from 'next';

/** "3" → 3. Null for anything that isn't a plain season number (season 0 is "Specials"). */
const parseSeasonNumber = (raw: string): number | null =>
  /^\d{1,3}$/.test(raw) ? Number(raw) : null;

/**
 * The show and one of its seasons for `/tv/[slug]/season/[number]`, or the 404 page.
 * Shared by metadata and the page via React `cache`.
 */
export const getSeasonOrNotFound = cache(
  async (
    slug: string,
    rawNumber: string,
  ): Promise<{ show: MediaWithDetails; season: SeasonDetails }> => {
    const seasonNumber = parseSeasonNumber(rawNumber);
    if (seasonNumber === null) notFound();

    const show = await getMediaOrNotFound(MediaMode.TV, slug);
    const listed =
      show.media_type === MediaMode.TV &&
      show.seasons?.some((s) => s.season_number === seasonNumber);
    if (!listed) notFound();

    const season = await api.media.getSeason(show.id, seasonNumber);
    if (!season) notFound();
    return { show, season };
  },
);

/** "Game of Thrones Season 3" (or "Game of Thrones Specials"). */
export const seasonTitle = (show: MediaWithDetails, season: SeasonDetails) =>
  `${displayName(show)} ${season.season_number === 0 ? 'Specials' : `Season ${season.season_number}`}`;

export function buildSeasonMetadata(show: MediaWithDetails, season: SeasonDetails): Metadata {
  const name = seasonTitle(show, season);
  const year = formatYear(season.air_date);
  // Worded the way people search: "<show> season 3 episodes".
  const title = `${name} – Episodes, Air Dates & Ratings`;
  const lead = `All ${pluralize(season.episodes.length, 'episode')} of ${name}${year ? ` (${year})` : ''}, with air dates, runtimes and ratings.`;
  const description = truncate(season.overview ? `${lead} ${season.overview}` : lead, 160);
  const canonical = ROUTES.SEASON(show.id, displayName(show), season.season_number);
  const image =
    getImageUrl(season.poster_path, 'poster', 'w500') ||
    getImageUrl(show.backdrop_path, 'backdrop', 'w1280');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'video.tv_show',
      images: image ? [{ url: image, alt: name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** schema.org TVSeason (with its episodes) for rich search results. */
export function buildSeasonJsonLd(show: MediaWithDetails, season: SeasonDetails) {
  const showName = displayName(show);
  return {
    '@context': 'https://schema.org',
    '@type': 'TVSeason',
    name: season.name,
    seasonNumber: season.season_number,
    numberOfEpisodes: season.episodes.length,
    url: `${SITE_URL}${ROUTES.SEASON(show.id, showName, season.season_number)}`,
    image: getImageUrl(season.poster_path, 'poster', 'w500') || undefined,
    datePublished: season.air_date ?? undefined,
    description: season.overview || undefined,
    partOfSeries: {
      '@type': 'TVSeries',
      name: showName,
      url: `${SITE_URL}${ROUTES.TV(show.id, showName)}`,
    },
    episode: season.episodes.map((episode) => ({
      '@type': 'TVEpisode',
      episodeNumber: episode.episode_number,
      name: episode.name,
      datePublished: episode.air_date ?? undefined,
    })),
  };
}
