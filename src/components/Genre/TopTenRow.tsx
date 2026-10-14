'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import SectionHeading from '@/components/Navigation/SectionHeading';
import ScrollRow from '@/components/ui/ScrollRow';
import { SegmentedButtons } from '@/components/ui/Segmented';
import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName, mediaKey } from '@/utils/media';

type Kind = 'movies' | 'shows';

interface Props {
  genreName: string;
  /** Accent colour (hex) for the hovered rank. */
  tint: string;
  /** Most popular first; either may be empty. */
  movies: MediaWithDetails[];
  shows: MediaWithDetails[];
}

const LABEL: Record<Kind, string> = { movies: 'Movies', shows: 'TV Shows' };

const rankable = (titles: MediaWithDetails[]) => titles.filter((m) => m.poster_path).slice(0, 10);

/**
 * "Top 10 Horror Movies" with large outlined ranks. Movies and shows are ranked separately
 * (TMDB popularity isn't comparable across the two); genres with both get a toggle.
 */
export default function TopTenRow({ genreName, tint, movies, shows }: Props) {
  const lists: Record<Kind, MediaWithDetails[]> = {
    movies: rankable(movies),
    shows: rankable(shows),
  };
  const kinds = (Object.keys(lists) as Kind[]).filter((kind) => lists[kind].length >= 3);
  const [active, setActive] = useState<Kind>(kinds[0] ?? 'movies');
  if (kinds.length === 0) return null;

  const ranked = lists[active];
  const title = `Top 10 ${genreName} ${LABEL[active]}`;

  return (
    <section aria-labelledby="top-ten-heading" style={{ '--tint': tint } as React.CSSProperties}>
      <ScrollRow
        // Remount on toggle so the list starts at #1.
        key={active}
        heading={
          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[10px]">
            <SectionHeading id="top-ten-heading">{title}</SectionHeading>
            {kinds.length > 1 && (
              <SegmentedButtons
                label="Rank"
                size="sm"
                value={active}
                onChange={setActive}
                options={kinds.map((kind) => ({ value: kind, label: LABEL[kind] }))}
              />
            )}
          </div>
        }
        label={title}
        // Room for the hover lift and shadows (the list clips).
        listClassName="gap-[16px] pt-[8px] pb-[16px]"
      >
        {ranked.map((media, i) => {
          const name = displayName(media);
          return (
            <li key={mediaKey(media)} className="shrink-0 snap-start">
              <Link
                href={ROUTES.MEDIA(media.media_type, media.id, name)}
                aria-label={`#${i + 1}: ${name}`}
                className="group flex items-end"
              >
                <span
                  aria-hidden="true"
                  className="relative z-0 -mr-[24px] text-[176px] leading-[0.74] font-black tracking-[-0.08em] text-transparent transition-[-webkit-text-stroke-color] duration-300 [-webkit-text-stroke:3px_rgba(255,255,255,0.42)] group-hover:[-webkit-text-stroke-color:var(--tint)] lg:-mr-[32px] lg:text-[240px]"
                >
                  {i + 1}
                </span>
                <span className="relative z-10 block aspect-[2/3] w-[120px] overflow-hidden rounded-[12px] shadow-[0_12px_32px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[6px] group-hover:ring-[color:var(--tint)]/70 lg:w-[150px]">
                  <Image
                    src={getImageUrl(media.poster_path, 'poster', 'w342')}
                    alt=""
                    fill
                    sizes="150px"
                    // Ten small posters: load up front so none decode mid-swipe.
                    loading="eager"
                    className="object-cover"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ScrollRow>
    </section>
  );
}
