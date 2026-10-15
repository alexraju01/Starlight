import 'server-only';

import { ROUTES } from '@/constants/route';
import { SITE_URL } from '@/constants/site';
import { APIResponse } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import { api } from './api';
import { TTL, fetchData } from './fetchData';
import { slugify } from './stringUtils';

/** Movie and TV sitemaps, 20 titles each: the 2,000 best-known movies and shows. */
export const MEDIA_SITEMAP_PAGES = 100;

const SITEMAP_TYPES = { movies: MediaMode.MOVIE, tv: MediaMode.TV } as const;

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

const xml = (body: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });

// No <lastmod>, <changefreq> or <priority>: Google ignores the last two, and a lastmod
// is only trusted if it's a real page change – which we can't know for TMDB data.
const urlset = (paths: string[]) =>
  xml(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
      .map((path) => `  <url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc></url>`)
      .join('\n')}\n</urlset>`,
  );

/** `/sitemap.xml`: the one sitemap to submit; lists every child sitemap. */
export function buildSitemapIndex(): Response {
  const children = [
    '/sitemap/pages.xml',
    ...Object.keys(SITEMAP_TYPES).flatMap((type) =>
      Array.from({ length: MEDIA_SITEMAP_PAGES }, (_, i) => `/sitemap/${type}/${i + 1}.xml`),
    ),
  ];
  return xml(
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${children
      .map((path) => `  <sitemap><loc>${SITE_URL}${path}</loc></sitemap>`)
      .join('\n')}\n</sitemapindex>`,
  );
}

/** Home, browse pages, the genres index and every genre page. */
export async function buildPagesSitemap(): Promise<Response> {
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();
  const genreSlugs = new Set([...movieGenres, ...tvGenres].map((g) => slugify(g.name)));
  return urlset(['', '/movie', '/tv', '/genre', ...[...genreSlugs].map((s) => `/genre/${s}`)]);
}

/** `[page]` segment → page number. Links are `/sitemap/movies/1.xml`, so `.xml` is allowed. */
export const parseSitemapPage = (raw: string): number | null => {
  const page = Number(raw.replace(/\.xml$/i, ''));
  return Number.isInteger(page) && page >= 1 && page <= MEDIA_SITEMAP_PAGES ? page : null;
};

/**
 * One page of movie or TV URLs, most-voted first. Vote count barely moves day to day, so a
 * title stays in the same sitemap (popularity order reshuffled them all daily) – and the
 * most-voted titles are the ones people actually search for.
 */
export async function buildMediaSitemap(type: string, rawPage: string): Promise<Response> {
  const mediaMode = SITEMAP_TYPES[type as keyof typeof SITEMAP_TYPES];
  const page = parseSitemapPage(rawPage);
  if (!mediaMode || !page) return new Response('Not found', { status: 404 });

  // Raw discover endpoint: `api.media.getMedia` would also fetch every show's season count.
  const { results } = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
    query: { page, sort_by: 'vote_count.desc' },
    cache: { type: 'revalidate', seconds: TTL.DAY },
  });

  return urlset(
    results.map((item) =>
      ROUTES.MEDIA(mediaMode, item.id, 'title' in item ? item.title : item.name),
    ),
  );
}
