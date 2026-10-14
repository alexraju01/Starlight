import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { formatYear } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName, getMediaDate } from '@/utils/media';

import PosterFan from './PosterFan';

interface Props {
  name: string;
  /** Accent colour (hex). */
  tint: string;
  /** e.g. "Dark & twisted". */
  moodTitle?: string;
  /** e.g. "movies and TV shows". */
  kinds: string;
  /** Most popular of one type (movies if the genre has them), best first. */
  topTitles: MediaWithDetails[];
}

/** Genre header in its own colour: the #1 title's artwork, top posters and a link to the #1. */
export default function GenreHero({ name, tint, moodTitle, kinds, topTitles }: Props) {
  // The artwork may come from the next title if the #1 has none.
  const featured = topTitles[0];
  const backdrop = getImageUrl(
    topTitles.find((m) => m.backdrop_path)?.backdrop_path,
    'backdrop',
    'w1280',
  );
  const posters = topTitles
    .filter((m) => m.poster_path)
    .slice(0, 3)
    .map((m) => getImageUrl(m.poster_path, 'poster', 'w342'));

  const featuredTitle = featured ? displayName(featured) : null;
  const featuredMeta = featured
    ? [
        formatYear(getMediaDate(featured)),
        featured.media_type === MediaMode.TV ? 'TV Series' : 'Movie',
      ].filter(Boolean)
    : [];

  return (
    <header
      style={{ '--tint': tint } as React.CSSProperties}
      className="relative isolate flex min-h-[500px] items-end overflow-hidden lg:min-h-[600px]"
    >
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 animate-[spotlight-zoom_9s_ease-out_forwards] object-cover object-[center_25%]"
        />
      )}
      <div className="from-secondary via-secondary/80 lg:via-secondary/55 absolute inset-0 -z-10 bg-gradient-to-r to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-70 mix-blend-screen"
        style={{
          background:
            'radial-gradient(70% 90% at 0% 100%, color-mix(in srgb, var(--tint) 55%, transparent), transparent 70%)',
        }}
      />
      <div className="from-secondary absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent" />

      <PosterFan
        posters={posters}
        className="absolute right-[68px] bottom-[56px] hidden h-[340px] w-[420px] lg:block 2xl:right-[101px]"
      />

      <Link
        href="/genre"
        className="absolute top-[20px] left-[16px] inline-flex items-center gap-[4px] rounded-full border border-white/15 bg-black/35 py-[6px] pr-[14px] pl-[8px] text-[14px] font-medium text-white/85 backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white sm:left-[24px] lg:top-[28px] lg:left-[68px] 2xl:left-[101px]"
      >
        <ChevronLeft aria-hidden="true" className="size-[16px]" />
        All genres
      </Link>

      <div className="page-gutter w-full pt-[88px] pb-[36px] lg:pb-[56px]">
        <p className="flex items-center gap-[10px] text-[13px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          <span
            aria-hidden="true"
            className="size-[8px] rounded-full bg-[color:var(--tint)] shadow-[0_0_12px_var(--tint)]"
          />
          {moodTitle ? `Genre · ${moodTitle}` : 'Genre'}
        </p>
        <h1 className="mt-[12px] text-[clamp(48px,8vw,104px)] leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-white">
          {name}
        </h1>
        <p className="mt-[16px] max-w-[48ch] text-[16px] leading-[1.6] text-pretty text-white/70 lg:text-[18px]">
          The most popular {name.toLowerCase()} {kinds} right now, updated daily.
        </p>

        {featured && featuredTitle && (
          <Link
            href={ROUTES.MEDIA(featured.media_type, featured.id, featuredTitle)}
            className="group mt-[28px] flex w-full max-w-[440px] items-center gap-[14px] rounded-[14px] border border-white/12 bg-black/40 p-[10px] pr-[16px] backdrop-blur-xl transition-colors hover:border-[color:var(--tint)]/60 hover:bg-black/55"
          >
            {featured.poster_path && (
              <div className="relative aspect-[2/3] w-[52px] shrink-0 overflow-hidden rounded-[8px]">
                <Image
                  src={getImageUrl(featured.poster_path, 'poster', 'w185')}
                  alt=""
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold tracking-[0.14em] text-[color:var(--tint)] uppercase">
                #1 {name} {featured.media_type === MediaMode.TV ? 'show' : 'movie'} right now
              </p>
              <p className="mt-[2px] line-clamp-1 text-[16px] font-semibold text-white">
                {featuredTitle}
              </p>
              <p className="mt-[2px] flex items-center gap-[8px] text-[13px] text-white/60">
                {featuredMeta.join(' · ')}
                {featured.vote_count > 0 && (
                  <span className="flex items-center gap-[4px] text-white/75">
                    <Star aria-hidden="true" className="fill-rating text-rating size-[12px]" />
                    {featured.vote_average.toFixed(1)}
                  </span>
                )}
              </p>
            </div>
            <ChevronRight
              aria-hidden="true"
              className="size-[20px] shrink-0 text-white/50 transition-[translate,color] duration-300 group-hover:translate-x-[3px] group-hover:text-white"
            />
          </Link>
        )}
      </div>
    </header>
  );
}
