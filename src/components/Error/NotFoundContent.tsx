import Link from 'next/link';

import MediaGrid from '@/components/Media/MediaGrid';
import SectionHeading from '@/components/Navigation/SectionHeading';
import { ghostButton, primaryButton } from '@/components/ui/buttonStyles';
import SearchBox from '@/components/ui/SearchBox/SearchBox';
import { api } from '@/utils/api';

import NotFoundPath from './NotFoundPath';

const TRENDING_COUNT = 10;

/** Body of the 404 page: message, search, ways out, and something worth watching. */
export default async function NotFoundContent() {
  // Best effort: the page must still render if TMDB is unavailable.
  const [trending, genresMap] = await Promise.all([
    api.media.getTrendingAll().catch(() => []),
    api.genre
      .getAllGenres()
      .then((g) => g.genresMap)
      .catch(() => ({})),
  ]);

  return (
    <>
      <section className="page-gutter relative overflow-hidden pt-[48px] pb-[56px] lg:pt-[96px] lg:pb-[80px]">
        <div
          aria-hidden="true"
          className="from-primary/20 pointer-events-none absolute inset-x-0 -top-[120px] h-[360px] bg-gradient-to-b to-transparent blur-2xl"
        />
        <div className="relative flex flex-col items-center text-center">
          <p
            aria-hidden="true"
            className="bg-gradient-to-b from-white to-white/10 bg-clip-text text-[clamp(88px,16vw,168px)] leading-none font-extrabold tracking-[-0.05em] text-transparent"
          >
            404
          </p>
          <h1 className="mt-[16px] text-[26px] leading-[1.2] font-bold tracking-[-0.01em] text-white lg:text-[32px]">
            Page not found
          </h1>
          <NotFoundPath />

          <div className="mt-[28px] w-full max-w-[520px] text-left">
            <SearchBox fullWidth />
          </div>

          <div className="mt-[20px] flex w-full flex-col gap-[12px] sm:w-auto sm:flex-row">
            <Link href="/" className={primaryButton}>
              Go to home
            </Link>
            <Link href="/movie" className={ghostButton}>
              Browse movies
            </Link>
          </div>
        </div>
      </section>

      {trending.length > 0 && (
        <section className="page-gutter flex flex-col gap-[20px] pb-[48px] lg:gap-[24px] lg:pb-[72px]">
          <SectionHeading>Trending this week</SectionHeading>
          <MediaGrid media={trending.slice(0, TRENDING_COUNT)} genreMap={genresMap} />
        </section>
      )}
    </>
  );
}
