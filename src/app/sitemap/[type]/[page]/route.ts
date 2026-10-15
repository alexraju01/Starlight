import { buildMediaSitemap } from '@/utils/sitemap';

export const revalidate = 86400;

/** `/sitemap/movies/1.xml`, `/sitemap/tv/1.xml`, … */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string; page: string }> },
) {
  const { type, page } = await params;
  return buildMediaSitemap(type, page);
}
