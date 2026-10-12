import Image from 'next/image';
import Link from 'next/link';

import SectionHeading from '@/components/Navigation/SectionHeading';
import ScrollRow from '@/components/ui/ScrollRow';
import { ROUTES } from '@/constants/route';
import { MediaWithDetails } from '@/types/global';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { displayName } from '@/utils/stringUtils';

interface Props {
  genreName: string;
  /** Genre accent colour (hex) – each rank lights up in it on hover. */
  tint: string;
  titles: MediaWithDetails[];
}

/**
 * "Top 10 in Horror": a ranked row with large outlined numbers beside each poster. Arrows
 * on larger screens, swipe on touch, drag with a mouse – no visible scrollbar.
 */
export default function TopTenRow({ genreName, tint, titles }: Props) {
  const ranked = titles.filter((m) => m.poster_path).slice(0, 10);
  if (ranked.length < 3) return null;

  return (
    <section aria-labelledby="top-ten-heading" style={{ '--tint': tint } as React.CSSProperties}>
      <ScrollRow
        heading={<SectionHeading id="top-ten-heading">Top 10 in {genreName}</SectionHeading>}
        label={`Top 10 in ${genreName}`}
        // Room for the hover lift above and the poster shadows below (the list clips).
        listClassName="gap-[16px] pt-[8px] pb-[16px]"
      >
        {ranked.map((media, i) => {
          const title = displayName(media);
          return (
            <li key={`${media.media_type}-${media.id}`} className="shrink-0 snap-start">
              <Link
                href={ROUTES.MEDIA(media.media_type, media.id, title)}
                aria-label={`#${i + 1}: ${title}`}
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
                    // Only ten small posters: load them up front so none decode mid-swipe.
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
