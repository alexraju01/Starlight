import { SITE_URL } from '@/constants/site';
import { api } from '@/utils/api';
import { slugify } from '@/utils/stringUtils';

import type { MetadataRoute } from 'next';

export const revalidate = 86400; // 24h

/** How many paginated movie / TV sitemaps are exposed (20 titles each). */
export const MEDIA_SITEMAP_PAGES = 100;

/** Child sitemaps — advertised in robots.txt (a <urlset> must not list other sitemaps). */
export const mediaSitemapUrls = () =>
  (['movies', 'tv'] as const).flatMap((type) =>
    Array.from(
      { length: MEDIA_SITEMAP_PAGES },
      (_, i) => `${SITE_URL}/sitemap/${type}/${i + 1}.xml`,
    ),
  );

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();

  const uniqueGenreSlugs = new Set([...movieGenres, ...tvGenres].map((g) => slugify(g.name)));

  const genreUrls = [...uniqueGenreSlugs].map((slug) => ({
    url: `${SITE_URL}/genre/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/movie`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/tv`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/genre`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/discover`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    ...genreUrls,
  ];
}
