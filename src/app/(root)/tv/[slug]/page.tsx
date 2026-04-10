import { Metadata } from 'next';
import { Suspense } from 'react';

import { MediaOverview } from '@/components';
import Spinner from '@/components/Skeletons/LoadingSkeletons/Spinner/Spinner';
import { TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

interface TVPageParams {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: TVPageParams): Promise<Metadata> {
  const { slug } = await params;
  console.log('=====', slug);
  const show = (await api.media.getOneMedia(MediaMode.TV, slug)) as TVShow;

  return {
    title: `${show.name} – TV Show Details`,
    description:
      show.overview?.slice(0, 160) ||
      'Explore details, cast, and similiar shows for this TV show on Starlight.',

    keywords: [show.name, 'tv show', 'tv details'],
  };
}

export default async function page({ params }: TVPageParams) {
  const { slug } = await params;

  return (
    <section className="w-full h-full">
      <Suspense fallback={<Spinner />}>
        <MediaOverview params={slug} mediaMode={MediaMode.TV} />
      </Suspense>
    </section>
  );
}
