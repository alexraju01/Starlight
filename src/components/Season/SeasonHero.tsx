import { ChevronLeft, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import ExpandableText from '@/components/ui/ExpandableText';
import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';
import { SeasonDetails } from '@/types/seasons';
import { formatYear, pluralize } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName } from '@/utils/media';

interface Props {
  show: MediaWithDetails;
  season: SeasonDetails;
  /** The season switcher, shown under the details. */
  children?: React.ReactNode;
}

/** Season header: its poster over the show's backdrop, a way back to the show, key facts. */
export default function SeasonHero({ show, season, children }: Props) {
  const showName = displayName(show);
  const backdrop = getImageUrl(show.backdrop_path, 'backdrop', 'w1280');
  const poster =
    getImageUrl(season.poster_path, 'poster', 'w500') ||
    getImageUrl(show.poster_path, 'poster', 'w500');
  const network = season.networks?.[0]?.name;
  const facts = [
    formatYear(season.air_date),
    season.episodes.length > 0 && pluralize(season.episodes.length, 'Episode'),
    network,
  ].filter((fact): fact is string => Boolean(fact));

  return (
    <section
      aria-label="Season overview"
      className="relative isolate overflow-hidden pt-[72px] pb-[28px] lg:pt-[96px] lg:pb-[40px]"
    >
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-fadeIn -z-20 object-cover object-[center_20%] opacity-40"
        />
      )}
      <div className="via-secondary/85 to-secondary absolute inset-0 -z-10 bg-gradient-to-b from-transparent" />
      <div className="from-secondary absolute inset-0 -z-10 hidden bg-gradient-to-r to-transparent lg:block" />

      <Link
        href={ROUTES.TV(show.id, showName)}
        className="absolute top-[16px] left-[16px] inline-flex max-w-[calc(100%-32px)] items-center gap-[4px] rounded-full border border-white/15 bg-black/35 py-[6px] pr-[14px] pl-[8px] text-[14px] font-medium text-white/85 backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white sm:left-[24px] lg:top-[24px] lg:left-[68px] 2xl:left-[101px]"
      >
        <ChevronLeft aria-hidden="true" className="size-[16px] shrink-0" />
        <span className="truncate">{showName}</span>
      </Link>

      <div className="page-gutter grid grid-cols-[112px_minmax(0,1fr)] items-end gap-x-[16px] gap-y-[20px] sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-x-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-[40px]">
        <div className="bg-card-bg relative aspect-[2/3] w-full overflow-hidden rounded-[12px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] ring-1 ring-white/10 lg:row-span-2 lg:rounded-[16px]">
          {poster && (
            <Image
              src={poster}
              alt={`${season.name} poster`}
              fill
              priority
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 148px, 112px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-[8px] lg:gap-[12px]">
          <span className="border-primary/60 bg-primary/15 text-accent-soft w-fit rounded-[4px] border px-[8px] py-[3px] text-[10px] leading-none font-bold tracking-[0.14em] uppercase lg:text-[11px]">
            {showName}
          </span>
          <h1 className="text-[clamp(28px,7vw,64px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-white">
            {season.name}
          </h1>
          <ul className="flex flex-wrap items-center gap-x-[12px] gap-y-[6px] text-[14px] text-white/70 lg:text-[16px]">
            {season.vote_average > 0 && (
              <li className="flex items-center gap-[6px]">
                <Star aria-hidden="true" className="fill-rating text-rating size-[16px]" />
                <span className="font-semibold text-white">{season.vote_average.toFixed(1)}</span>
                <span className="sr-only">out of 10</span>
              </li>
            )}
            {facts.map((fact, i) => (
              <li key={fact} className="flex items-center gap-[12px]">
                {(i > 0 || season.vote_average > 0) && (
                  <span aria-hidden="true" className="size-[4px] rounded-full bg-white/30" />
                )}
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 flex min-w-0 flex-col gap-[20px] lg:col-span-1 lg:col-start-2">
          {season.overview && (
            <ExpandableText
              text={season.overview}
              lines={4}
              lineHeight={1.7}
              mobileOnly
              className="max-w-[68ch] text-[15px] leading-[1.7] text-pretty text-white/75 lg:text-[16px]"
            />
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
