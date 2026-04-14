import { Metadata } from 'next';
import { Suspense } from 'react';

import { MediaOverview } from '@/components';
import { Spinner } from '@/components/Skeletons/LoadingSkeletons';
import { Movie } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils';

interface MoviePageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MoviePageParams): Promise<Metadata> {
  const { slug } = await params;

  const movie = (await api.media.getOneMedia(MediaMode.MOVIE, slug)) as Movie;

  return {
    title: `${movie.title} – Movie Details`,
    description:
      movie.overview?.slice(0, 160) ?? 'Explore details, cast, and similar movies on Starlight.',
    keywords: [movie.title, 'movie', 'details'],
  };
}

export default async function MovieDetailsPage({ params }: MoviePageParams) {
  const { slug } = await params;
  return (
    <section className="h-full w-full">
      <Suspense fallback={<Spinner />}>
        <MediaOverview params={slug} mediaMode={MediaMode.MOVIE} />
      </Suspense>
    </section>
  );
}
