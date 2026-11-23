'use client';

import clsx from 'clsx';
import { ChevronDown, ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import SectionHeading from '@/components/Navigation/SectionHeading';
import { buttonClass } from '@/components/ui/buttonStyles';
import { SegmentedButtons } from '@/components/ui/Segmented';
import { ROUTES } from '@/constants/route';
import { MediaMode } from '@/types/mediaMode';
import { formatYear, pluralize } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

import type { PersonCredit } from '@/types';

type TypeFilter = 'all' | MediaMode;

const TYPES: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: MediaMode.MOVIE, label: 'Movies' },
  { value: MediaMode.TV, label: 'TV' },
];

/** Rows shown before "Show all". */
const PAGE_SIZE = 30;

interface Props {
  credits: PersonCredit[];
  /** Selected first, e.g. "Acting" for an actor. */
  mainDepartment: string;
}

/** Every credit, newest first, filterable by department (Acting, Directing…) and type. */
export default function Filmography({ credits, mainDepartment }: Props) {
  // Departments with counts: the person's main one first, then the busiest.
  const departments = Object.entries(
    credits.reduce<Record<string, number>>((acc, c) => {
      acc[c.department] = (acc[c.department] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort(([a, x], [b, y]) => Number(b === mainDepartment) - Number(a === mainDepartment) || y - x);

  const [department, setDepartment] = useState(departments[0]?.[0] ?? mainDepartment);
  const [type, setType] = useState<TypeFilter>('all');
  const [showAll, setShowAll] = useState(false);

  const inDepartment = credits.filter((c) => c.department === department);
  const visible = inDepartment.filter((c) => type === 'all' || c.mediaType === type);
  const shown = showAll ? visible : visible.slice(0, PAGE_SIZE);
  const hasBothTypes = new Set(inDepartment.map((c) => c.mediaType)).size > 1;

  if (credits.length === 0) return null;

  return (
    <section aria-labelledby="filmography-heading" className="flex flex-col gap-[16px]">
      <SectionHeading id="filmography-heading" count={visible.length}>
        Filmography
      </SectionHeading>

      <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
        {departments.length > 1 ? (
          <div role="group" aria-label="Department" className="flex flex-wrap gap-[8px]">
            {departments.map(([name, count]) => (
              <button
                key={name}
                type="button"
                aria-pressed={name === department}
                onClick={() => {
                  setDepartment(name);
                  setType('all');
                  setShowAll(false);
                }}
                className={clsx(
                  'inline-flex h-[36px] items-center gap-[6px] rounded-full border px-[14px] text-[14px] font-medium transition-colors',
                  name === department
                    ? 'border-primary bg-primary text-white'
                    : 'border-white/12 bg-white/[0.04] text-white/75 hover:border-white/30 hover:text-white',
                )}
              >
                {name}
                <span className={name === department ? 'text-white/70' : 'text-white/40'}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        {hasBothTypes && (
          <SegmentedButtons
            label="Type"
            size="sm"
            value={type}
            onChange={(value) => {
              setType(value);
              setShowAll(false);
            }}
            options={TYPES}
          />
        )}
      </div>

      <ol className="flex flex-col divide-y divide-white/[0.06] rounded-[14px] border border-white/[0.08] bg-white/[0.02]">
        {shown.map((credit) => {
          const year = formatYear(credit.date);
          const role =
            credit.department === 'Acting' ? credit.role && `as ${credit.role}` : credit.role;
          return (
            <li key={`${credit.mediaType}-${credit.id}`}>
              <Link
                href={ROUTES.MEDIA(credit.mediaType, credit.id, credit.title)}
                className="flex items-center gap-[14px] px-[14px] py-[10px] transition-colors hover:bg-white/[0.04]"
              >
                <span className="w-[40px] shrink-0 text-[14px] text-white/45 tabular-nums">
                  {year ?? 'TBA'}
                </span>
                <span className="bg-card-bg relative h-[60px] w-[40px] shrink-0 overflow-hidden rounded-[6px]">
                  {credit.posterPath ? (
                    <Image
                      src={getImageUrl(credit.posterPath, 'poster', 'w92')}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <ImageOff
                      aria-hidden="true"
                      className="absolute inset-0 m-auto size-[16px] text-white/25"
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-[15px] font-semibold text-white">
                    {credit.title}
                  </span>
                  <span className="line-clamp-1 text-[13px] text-white/55">
                    {[role, credit.episodeCount ? pluralize(credit.episodeCount, 'episode') : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </span>
                {credit.mediaType === MediaMode.TV && (
                  <span className="shrink-0 rounded-[4px] border border-white/15 px-[6px] py-[2px] text-[10px] font-bold tracking-[0.1em] text-white/50">
                    TV
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      {visible.length > PAGE_SIZE && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className={buttonClass('ghost', 'md', 'self-center')}
        >
          Show all {visible.length}
          <ChevronDown aria-hidden="true" className="size-[18px]" />
        </button>
      )}
    </section>
  );
}
