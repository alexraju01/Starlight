import { ChevronDown, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { buttonClass } from '@/components/ui/buttonStyles';
import { ROUTES } from '@/constants/route';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { formatCount, formatMediaRuntime, formatYear, pluralize } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName, getMediaDate } from '@/utils/media';

import TrailerButton from './TrailerButton';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode;
  /** Show the "More like this" jump link. */
  hasSimilar: boolean;
}

/**
 * Poster, title, facts, genres, overview and actions. One grid: on mobile the details run
 * full width under [poster | title]; on desktop the poster spans both rows beside them.
 */
export default function MediaDetailsPanel({ media, mediaMode, hasSimilar }: Props) {
  const title = displayName(media);
  const isTv = media.media_type === MediaMode.TV;
  const poster = getImageUrl(media.poster_path, 'poster', 'w500');
  const hasRating = media.vote_count > 0 && media.vote_average > 0;

  const facts = [
    formatYear(getMediaDate(media)),
    isTv && media.number_of_seasons
      ? pluralize(media.number_of_seasons, 'Season')
      : formatMediaRuntime(media),
  ].filter(Boolean);

  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)] items-end gap-x-[16px] gap-y-[20px] sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-x-[24px] lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-x-[48px] lg:gap-y-[24px] 2xl:grid-cols-[300px_minmax(0,1fr)]">
      <div className="bg-card-bg relative aspect-[2/3] w-full overflow-hidden rounded-[12px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] ring-1 ring-white/10 lg:row-span-2 lg:rounded-[16px]">
        {poster && (
          <Image
            src={poster}
            alt={`${title} poster`}
            fill
            priority
            sizes="(min-width: 1536px) 300px, (min-width: 1024px) 264px, (min-width: 640px) 148px, 112px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-[8px] lg:gap-[12px]">
        <span className="border-primary/60 bg-primary/15 text-accent-soft w-fit rounded-[4px] border px-[8px] py-[3px] text-[10px] leading-none font-bold tracking-[0.14em] uppercase lg:text-[11px]">
          {isTv ? 'TV Series' : 'Movie'}
        </span>
        <h1 className="text-[clamp(26px,7vw,64px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-white">
          {title}
        </h1>
        {media.tagline && (
          <p className="hidden text-[18px] leading-[1.4] text-white/60 italic lg:block">
            {media.tagline}
          </p>
        )}
      </div>

      <div className="col-span-2 flex min-w-0 flex-col gap-[20px] lg:col-span-1 lg:col-start-2">
        <ul className="flex flex-wrap items-center gap-x-[12px] gap-y-[8px] text-[14px] text-white/70 lg:text-[16px]">
          {hasRating && (
            <li className="flex items-center gap-[6px]">
              <Star aria-hidden="true" className="fill-rating text-rating size-[16px]" />
              <span className="font-semibold text-white">{media.vote_average.toFixed(1)}</span>
              <span className="sr-only">out of 10,</span>
              <span className="text-white/45">({formatCount(media.vote_count)} votes)</span>
            </li>
          )}
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-[12px]">
              <span aria-hidden="true" className="size-[4px] rounded-full bg-white/30" />
              {fact}
            </li>
          ))}
        </ul>

        {media.genres && media.genres.length > 0 && (
          <ul aria-label="Genres" className="flex flex-wrap gap-[8px]">
            {media.genres.map((genre) => (
              <li key={genre.id}>
                <Link
                  href={ROUTES.GENRE(genre.name)}
                  className="inline-flex h-[32px] items-center rounded-full border border-white/15 bg-white/[0.06] px-[14px] text-[13px] font-medium text-white/85 backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/15 hover:text-white"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {media.tagline && (
          <p className="text-[15px] leading-[1.5] text-white/60 italic lg:hidden">
            {media.tagline}
          </p>
        )}

        {media.overview && (
          <p className="max-w-[68ch] text-[15px] leading-[1.7] text-pretty text-white/75 lg:text-[16px]">
            {media.overview}
          </p>
        )}

        <div className="flex flex-col gap-[12px] pt-[4px] sm:flex-row">
          <TrailerButton mediaMode={mediaMode} id={media.id} title={title} />
          {hasSimilar && (
            <a href="#similar" className={buttonClass('ghost', 'lg', 'backdrop-blur-md')}>
              More like this
              <ChevronDown aria-hidden="true" className="size-[18px]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
