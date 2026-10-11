import { Suspense } from 'react';

import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import MediaList from './MediaList';

interface Props {
  mediaMode: MediaMode.MOVIE | MediaMode.TV;
  /** Highlighted word(s) after "Browse", e.g. "Movies". */
  heading: string;
  tagline: string;
}

async function BrowseContent({ mediaMode }: Pick<Props, 'mediaMode'>) {
  const [media, { genresMap }] = await Promise.all([
    api.media.getMedia(mediaMode),
    api.genre.getGenres(mediaMode),
  ]);

  return <MediaList initialMedia={media} initialGenres={genresMap} mediaMode={mediaMode} />;
}

/** Shared layout of the /movie and /tv pages: header plus a paginated grid. */
export default function BrowseMediaPage({ mediaMode, heading, tagline }: Props) {
  return (
    <section className="animate-fadeIn text-white">
      <div className="relative border-b border-white/5 bg-gradient-to-b from-red-900/10 to-transparent py-16">
        <div className="content-container">
          <h1 className="text-4xl font-black tracking-tight uppercase md:text-6xl">
            Browse <span className="text-primary">{heading}</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">{tagline}</p>
        </div>
      </div>

      <section className="content-container">
        <Suspense fallback={<LoadingSkeletons />}>
          <BrowseContent mediaMode={mediaMode} />
        </Suspense>
      </section>
    </section>
  );
}
