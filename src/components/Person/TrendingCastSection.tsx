import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import PersonAvatar from '@/components/Media/CastContainer/PersonAvatar';
import ScrollRow from '@/components/ui/ScrollRow';
import { ROUTES } from '@/constants/route';
import { TrendingCast } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { formatYear } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

/** One trending title as a band: its artwork and details, then its cast to swipe through. */
export default function TrendingCastSection({ title }: { title: TrendingCast }) {
  const titleHref = ROUTES.MEDIA(title.mediaType, title.id, title.title);
  const backdrop = getImageUrl(title.backdropPath, 'backdrop', 'w780');
  const headingId = `cast-of-${title.mediaType}-${title.id}`;
  const meta = [formatYear(title.date), title.mediaType === MediaMode.TV ? 'TV Series' : 'Movie']
    .filter(Boolean)
    .join(' · ');

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.02] p-[16px] sm:p-[20px] lg:p-[24px]"
    >
      {/* The title's artwork, faint behind the header, so each band has its own colour. */}
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="-z-20 object-cover object-top opacity-[0.18]"
        />
      )}
      <div className="from-secondary/40 to-secondary absolute inset-0 -z-10 bg-gradient-to-b" />

      <ScrollRow
        heading={
          <Link href={titleHref} className="group flex min-w-0 items-center gap-[14px]">
            <span className="bg-card-bg relative h-[72px] w-[48px] shrink-0 overflow-hidden rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              {title.posterPath && (
                <Image
                  src={getImageUrl(title.posterPath, 'poster', 'w185')}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold tracking-[0.1em] text-white/45 uppercase">
                The cast of
              </span>
              <h2
                id={headingId}
                className="line-clamp-1 text-[20px] leading-[1.2] font-bold text-white decoration-white/40 underline-offset-4 group-hover:underline lg:text-[24px]"
              >
                {title.title}
              </h2>
              <span className="mt-[2px] flex items-center gap-[6px] text-[13px] text-white/55">
                {meta}
                <ArrowRight
                  aria-hidden="true"
                  className="size-[14px] transition-transform group-hover:translate-x-[3px]"
                />
              </span>
            </span>
          </Link>
        }
        label={`Cast of ${title.title}`}
        listClassName="gap-[4px] pt-[8px] pb-[4px] lg:gap-[8px]"
      >
        {title.cast.map((member) => (
          <li key={member.id} className="w-[112px] shrink-0 snap-start lg:w-[128px]">
            <Link
              href={ROUTES.PERSON(member.id, member.name)}
              className="group flex flex-col items-center rounded-[12px] pb-[4px] text-center"
            >
              <PersonAvatar
                name={member.name}
                profilePath={member.profilePath}
                sizeClass="size-[88px] lg:size-[104px]"
                sizes="104px"
              />
              <p className="mt-[10px] line-clamp-2 text-[14px] leading-[1.3] font-semibold text-white decoration-white/40 underline-offset-2 group-hover:underline">
                {member.name}
              </p>
              {member.character && (
                <p className="mt-[2px] line-clamp-2 text-[12px] leading-[1.35] text-white/55">
                  {member.character}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ScrollRow>
    </section>
  );
}
