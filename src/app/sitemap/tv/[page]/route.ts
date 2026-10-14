import { NextRequest } from 'next/server';

import { MediaMode } from '@/types/mediaMode';
import { buildMediaSitemap } from '@/utils/sitemap';

export const revalidate = 86400;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return buildMediaSitemap(MediaMode.TV, page);
}
