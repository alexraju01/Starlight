import { ExternalLink, UserRound } from 'lucide-react';
import Image from 'next/image';

import GoBack from '@/components/Navigation/GoBack';
import { buttonClass } from '@/components/ui/buttonStyles';
import { Person } from '@/types';
import { formatAge, formatFullDate, pluralize, roleLabel } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

/**
 * Person header: portrait, name and key facts over the backdrop of their best-known title
 * (darker than a title page's, so the focus stays on the person).
 */
export default function PersonHero({ person }: { person: Person }) {
  const photo = getImageUrl(person.profilePath, 'profile', 'h632');
  const backdrop = getImageUrl(
    person.knownFor.find((c) => c.backdropPath)?.backdropPath,
    'backdrop',
    'w1280',
  );
  const age = formatAge(person.birthday, person.deathday);
  const born = formatFullDate(person.birthday);
  const titles = new Set(person.credits.map((c) => `${c.mediaType}-${c.id}`)).size;

  const facts = [
    born && (person.deathday ? `${born} – ${formatFullDate(person.deathday)}` : `Born ${born}`),
    age !== null && (person.deathday ? `Aged ${age}` : `Age ${age}`),
    person.placeOfBirth,
  ].filter((fact): fact is string => Boolean(fact));

  const links = [
    person.links.imdb && { label: 'IMDb', href: person.links.imdb },
    person.links.instagram && { label: 'Instagram', href: person.links.instagram },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <section
      aria-label="Profile"
      className="relative isolate overflow-hidden pt-[72px] pb-[32px] lg:pt-[96px] lg:pb-[48px]"
    >
      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-fadeIn -z-20 object-cover object-[center_20%] opacity-35"
        />
      )}
      <div className="via-secondary/85 to-secondary absolute inset-0 -z-10 bg-gradient-to-b from-transparent" />
      <div className="from-secondary absolute inset-0 -z-10 hidden bg-gradient-to-r to-transparent lg:block" />

      <GoBack className="absolute top-[16px] left-[16px] z-10 sm:left-[24px] lg:top-[24px] lg:left-[68px] 2xl:left-[101px]" />

      <div className="page-gutter grid grid-cols-[112px_minmax(0,1fr)] items-end gap-x-[16px] gap-y-[20px] sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-x-[24px] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-[40px]">
        <div className="bg-card-bg relative aspect-[2/3] w-full overflow-hidden rounded-[12px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] ring-1 ring-white/10 lg:rounded-[16px]">
          {photo ? (
            <Image
              src={photo}
              alt={person.name}
              fill
              priority
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 148px, 112px"
              className="object-cover object-[center_15%]"
            />
          ) : (
            <UserRound
              aria-hidden="true"
              className="absolute inset-0 m-auto size-1/2 text-white/20"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-[10px] lg:gap-[14px]">
          <span className="border-primary/60 bg-primary/15 text-accent-soft w-fit rounded-[4px] border px-[8px] py-[3px] text-[10px] leading-none font-bold tracking-[0.14em] uppercase lg:text-[11px]">
            {roleLabel(person.knownForDepartment)}
          </span>
          <h1 className="text-[clamp(28px,7vw,64px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance text-white">
            {person.name}
          </h1>
          {facts.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-[12px] gap-y-[6px] text-[14px] text-white/70 lg:text-[16px]">
              {facts.map((fact, i) => (
                <li key={fact} className="flex items-center gap-[12px]">
                  {i > 0 && (
                    <span aria-hidden="true" className="size-[4px] rounded-full bg-white/30" />
                  )}
                  {fact}
                </li>
              ))}
            </ul>
          )}
          <p className="text-[14px] text-white/50">{pluralize(titles, 'credit')}</p>

          {links.length > 0 && (
            <div className="flex flex-wrap gap-[8px] pt-[4px]">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass('ghost', 'sm', 'backdrop-blur-md')}
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" className="size-[14px]" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
