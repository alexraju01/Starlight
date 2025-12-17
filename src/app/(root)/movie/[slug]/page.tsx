import { Suspense } from 'react';

import { MediaOverview } from '@/components';
import { Spinner } from '@/components/Feedback/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  const { slug } = await params;
  console.log('Slug:', slug);
  return (
    <section className="w-full h-full">
      jshgdjhksdgkjh
      <Suspense fallback={<Spinner />}>
        <MediaOverview params={slug} mediaMode={MediaMode.MOVIE} />
      </Suspense>
    </section>
  );
}
