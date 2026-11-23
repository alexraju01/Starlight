import { ArrowRight, Clapperboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { buttonClass } from '@/components/ui/buttonStyles';
import { ROUTES } from '@/constants/route';
import { Person, TrendingCast } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { truncate } from '@/utils/stringUtils';

interface Props {
  person: Person;
  /** The trending title they're in (its backdrop fills the hero). */
  title: TrendingCast;
  character: string;
}

/**
 * People page hero: this week's most popular person, a large portrait over the backdrop of
 * the trending title they're in, with their best-known titles and a way into their profile.
 */
export default function PeopleSpotlight({ person, title, character }: Props) {
  const backdrop = getImageUrl(title.backdropPath, 'backdrop', 'w1280');
  const photo = getImageUrl(person.profilePath, 'profile', 'h632');
  const profileHref = ROUTES.PERSON(person.id, person.name);
  const titleHref = ROUTES.MEDIA(title.mediaType, title.id, title.title);

  return (
    <section className="relative isolate flex min-h-[600px] items-end overflow-hidden lg:min-h-[min(680px,calc(100svh-var(--nav-h)))]">
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 animate-[spotlight-zoom_9s_ease-out_forwards] object-cover object-[center_25%] opacity-60"
        />
      )}
      <div className="from-secondary via-secondary/85 lg:via-secondary/60 absolute inset-0 -z-10 bg-gradient-to-r to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-70 mix-blend-screen"
        style={{
          background:
            'radial-gradient(70% 90% at 0% 100%, color-mix(in srgb, var(--color-primary) 60%, transparent), transparent 70%)',
        }}
      />
      <div className="from-secondary absolute inset-0 -z-10 bg-gradient-to-t via-transparent to-transparent" />

      <div className="page-gutter grid w-full items-end gap-[28px] pt-[48px] pb-[40px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-[64px] lg:pb-[64px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col">
          <h1 className="flex items-center gap-[10px] text-[13px] font-semibold tracking-[0.14em] text-white/70 uppercase">
            <span
              aria-hidden="true"
              className="bg-primary size-[8px] rounded-full shadow-[0_0_12px_var(--color-primary)]"
            />
            People · Spotlight this week
          </h1>

          {/* Portrait sits beside the name on phones; on desktop it's the big card on the right. */}
          <div className="mt-[16px] flex items-center gap-[16px] lg:block">
            {photo && (
              <span className="relative size-[88px] shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 lg:hidden">
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-cover object-[center_15%]"
                />
              </span>
            )}
            <p className="text-[clamp(40px,7vw,96px)] leading-[0.95] font-extrabold tracking-[-0.03em] text-balance text-white">
              {person.name}
            </p>
          </div>

          <p className="mt-[16px] text-[16px] text-white/75 lg:text-[18px]">
            Now in{' '}
            <Link
              href={titleHref}
              className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              {title.title}
            </Link>
            {character && <span className="text-white/60"> as {character}</span>}
            <span className="text-white/45">
              {' '}
              · {title.mediaType === MediaMode.TV ? 'TV Series' : 'Movie'}
            </span>
          </p>

          {person.biography && (
            <p className="mt-[16px] max-w-[60ch] text-[15px] leading-[1.7] text-pretty text-white/65 lg:text-[16px]">
              {truncate(person.biography, 240)}
            </p>
          )}

          {person.knownFor.length > 0 && (
            <ul aria-label="Known for" className="mt-[20px] flex flex-wrap gap-[8px]">
              {person.knownFor.slice(0, 4).map((credit) => (
                <li key={`${credit.mediaType}-${credit.id}`}>
                  <Link
                    href={ROUTES.MEDIA(credit.mediaType, credit.id, credit.title)}
                    className="inline-flex h-[32px] items-center gap-[6px] rounded-full border border-white/15 bg-black/30 px-[12px] text-[13px] font-medium text-white/85 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Clapperboard aria-hidden="true" className="size-[14px] text-white/50" />
                    {credit.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-[28px] flex flex-col gap-[12px] sm:flex-row">
            <Link href={profileHref} className={buttonClass('light', 'lg')}>
              View profile
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </Link>
            <Link
              href={`${profileHref}#filmography-heading`}
              className={buttonClass('ghost', 'lg', 'backdrop-blur-md')}
            >
              Filmography
            </Link>
          </div>
        </div>

        {photo && (
          <Link
            href={profileHref}
            tabIndex={-1}
            aria-hidden="true"
            className="group relative hidden aspect-[4/5] w-full rotate-[2deg] overflow-hidden rounded-[24px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.9),0_0_60px_-20px_var(--color-primary)] ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 lg:block"
          >
            <Image
              src={photo}
              alt=""
              fill
              priority
              sizes="360px"
              className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          </Link>
        )}
      </div>
    </section>
  );
}
