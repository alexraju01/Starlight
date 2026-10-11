import { Metadata } from 'next';
import { Suspense } from 'react';

import { MediaOverview } from '@/components';
import { Spinner } from '@/components/Skeletons/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';
import {
  buildMediaJsonLd,
  buildMediaMetadata,
  getMediaOrNotFound,
  jsonLdString,
} from '@/utils/mediaPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const media = await getMediaOrNotFound(MediaMode.MOVIE, slug);
  return buildMediaMetadata(media, MediaMode.MOVIE);
}

export default async function DetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const media = await getMediaOrNotFound(MediaMode.MOVIE, slug);

  return (
    <section className="h-full w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(buildMediaJsonLd(media, MediaMode.MOVIE)) }}
      />
      <Suspense fallback={<Spinner />}>
        <MediaOverview media={media} mediaMode={MediaMode.MOVIE} />
      </Suspense>
    </section>
  );
}
