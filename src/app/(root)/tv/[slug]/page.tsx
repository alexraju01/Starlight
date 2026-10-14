import { Metadata } from 'next';

import MediaDetailsPage from '@/components/Media/MediaOverview/MediaDetailsPage';
import { MediaMode } from '@/types/mediaMode';
import { buildMediaMetadata, getMediaOrNotFound } from '@/utils/mediaPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const media = await getMediaOrNotFound(MediaMode.TV, slug);
  return buildMediaMetadata(media, MediaMode.TV);
}

export default async function DetailsPage({ params }: PageProps) {
  const { slug } = await params;
  return <MediaDetailsPage mediaMode={MediaMode.TV} slug={slug} />;
}
