import { SITE_URL } from '@/constants/site';

import { mediaSitemapUrls } from './sitemap';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Note: `/_next/` must stay crawlable – Google needs the JS/CSS to render pages.
        // Search result pages are thin/duplicate content, so keep them out of the index.
        disallow: ['/api/', '/discover?'],
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, ...mediaSitemapUrls()],
    host: SITE_URL,
  };
}
