import { ImageOff, Star } from 'lucide-react';
import Image from 'next/image';

import SectionHeading from '@/components/Navigation/SectionHeading';
import { Episode } from '@/types/seasons';
import { formatFullDate, formatRuntime } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

const BADGE: Record<string, string> = {
  finale: 'Season finale',
  mid_season: 'Mid-season finale',
};

const badgeClass =
  'rounded-[4px] border px-[6px] py-[2px] text-[10px] font-bold tracking-[0.1em] uppercase';

/** Every episode of the season: still, number and title, air date, runtime, rating, summary. */
export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <section aria-labelledby="episodes-heading" className="flex flex-col gap-[20px]">
      <SectionHeading id="episodes-heading" count={episodes.length || undefined}>
        Episodes
      </SectionHeading>

      {episodes.length === 0 ? (
        <p className="rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-[16px] text-[14px] text-white/65">
          No episodes have been announced for this season yet.
        </p>
      ) : (
        <ol className="flex flex-col gap-[12px]">
          {episodes.map((episode) => {
            const still = getImageUrl(episode.still_path, 'backdrop', 'w780');
            const isUpcoming = !episode.air_date || Date.parse(episode.air_date) > Date.now();
            const meta = [
              episode.air_date ? formatFullDate(episode.air_date) : 'Date to be announced',
              formatRuntime(episode.runtime),
            ].filter(Boolean);

            return (
              <li
                key={episode.id}
                className="flex flex-col gap-[14px] rounded-[16px] border border-white/[0.07] bg-white/[0.02] p-[12px] sm:flex-row sm:gap-[20px] sm:p-[14px]"
              >
                <div className="bg-card-bg relative aspect-video w-full shrink-0 overflow-hidden rounded-[10px] sm:w-[240px] lg:w-[280px]">
                  {still ? (
                    <Image
                      src={still}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 240px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <ImageOff
                      aria-hidden="true"
                      className="absolute inset-0 m-auto size-[24px] text-white/25"
                    />
                  )}
                  <span className="absolute top-[8px] left-[8px] rounded-[6px] bg-black/70 px-[8px] py-[3px] text-[12px] font-bold text-white backdrop-blur-sm">
                    E{episode.episode_number}
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                  <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[6px]">
                    <h3 className="text-[16px] leading-[1.3] font-semibold text-white lg:text-[18px]">
                      <span className="text-white/45">{episode.episode_number}.</span>{' '}
                      {episode.name}
                    </h3>
                    {BADGE[episode.episode_type] && (
                      <span
                        className={`${badgeClass} border-primary/60 bg-primary/15 text-accent-soft`}
                      >
                        {BADGE[episode.episode_type]}
                      </span>
                    )}
                    {isUpcoming && (
                      <span
                        className={`${badgeClass} border-white/20 bg-white/[0.06] text-white/70`}
                      >
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="flex flex-wrap items-center gap-x-[10px] text-[13px] text-white/55">
                    {meta.join(' · ')}
                    {episode.vote_count > 0 && (
                      <span className="flex items-center gap-[4px] text-white/75">
                        <Star aria-hidden="true" className="fill-rating text-rating size-[12px]" />
                        {episode.vote_average.toFixed(1)}
                      </span>
                    )}
                  </p>
                  {episode.overview && (
                    <p className="mt-[2px] line-clamp-3 text-[14px] leading-[1.6] text-white/70">
                      {episode.overview}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
