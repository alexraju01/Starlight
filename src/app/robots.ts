import { SITE_URL } from '@/constants/site';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Search results are thin, endless variations of other pages. (`/_next/` must stay
      // crawlable: Google needs the JS/CSS to render pages.)
      disallow: '/discover?',
    },
    // The index lists every other sitemap.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
