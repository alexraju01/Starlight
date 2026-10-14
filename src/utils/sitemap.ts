import 'server-only';

import { ROUTES } from '@/constants/route';
import { SITE_URL } from '@/constants/site';
import { APIResponse } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import { TTL, fetchData } from './fetchData';

/** TMDB's discover endpoint never returns more than 500 pages. */
const MAX_TMDB_PAGE = 500;

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** `[page]` segment → page number. Links are `/sitemap/movies/1.xml`, so `.xml` is allowed. */
export const parseSitemapPage = (raw: string): number | null => {
  const pageNum = Number(raw.replace(/\.xml$/i, ''));
  return Number.isInteger(pageNum) && pageNum >= 1 && pageNum <= MAX_TMDB_PAGE ? pageNum : null;
};

export async function buildMediaSitemap(mediaMode: MediaMode, rawPage: string): Promise<Response> {
  const page = parseSitemapPage(rawPage);
  if (!page) return new Response('Invalid page', { status: 400 });

  // Raw discover endpoint: `api.media.getMedia` would also fetch every show's season count.
  const { results } = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
    query: { page, sort_by: 'popularity.desc' },
    cache: { type: 'revalidate', seconds: TTL.DAY },
  });

  const urls = results
    .map((item) => {
      const title = 'title' in item ? item.title : item.name;
      const date = 'release_date' in item ? item.release_date : item.first_air_date;
      const lastmod = date && !Number.isNaN(Date.parse(date)) ? new Date(date) : null;
      // Never advertise a lastmod in the future (unreleased titles).
      const safeLastmod = lastmod && lastmod.getTime() < Date.now() ? lastmod : null;

      return `  <url>
    <loc>${escapeXml(`${SITE_URL}${ROUTES.MEDIA(mediaMode, item.id, title)}`)}</loc>${
      safeLastmod ? `\n    <lastmod>${safeLastmod.toISOString()}</lastmod>` : ''
    }
  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    },
  );
}
