import { buildPagesSitemap } from '@/utils/sitemap';

export const revalidate = 86400;

export function GET() {
  return buildPagesSitemap();
}
