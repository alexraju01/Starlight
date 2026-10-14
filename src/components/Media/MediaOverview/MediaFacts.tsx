import SectionHeading from '@/components/Navigation/SectionHeading';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import {
  formatFullDate,
  formatLanguage,
  formatMediaRuntime,
  formatMoney,
  pluralize,
} from '@/utils/format';

/** Name lists can run long – give them the full card width on mobile instead of a cramped half. */
const WIDE_FACTS = new Set(['Production', 'Network', 'Created by']);

interface Props {
  media: MediaWithDetails;
}

/** First few names of a list, e.g. production companies. */
const names = (items?: { name: string }[], max = 3) =>
  items?.length
    ? items
        .slice(0, max)
        .map((i) => i.name)
        .join(', ')
    : null;

function getFacts(media: MediaWithDetails): [label: string, value: string | null][] {
  const shared: [string, string | null][] = [
    ['Status', media.status ?? null],
    ['Original language', formatLanguage(media.original_language)],
  ];

  if (media.media_type === MediaMode.TV) {
    return [
      ...shared,
      ['First aired', formatFullDate(media.first_air_date)],
      ['Last aired', formatFullDate(media.last_air_date)],
      ['Seasons', media.number_of_seasons ? pluralize(media.number_of_seasons, 'Season') : null],
      [
        'Episodes',
        media.number_of_episodes ? pluralize(media.number_of_episodes, 'Episode') : null,
      ],
      ['Episode length', formatMediaRuntime(media)],
      ['Network', names(media.networks)],
      ['Created by', names(media.created_by)],
    ];
  }

  return [
    ...shared,
    ['Release date', formatFullDate(media.release_date)],
    ['Runtime', formatMediaRuntime(media)],
    ['Budget', formatMoney(media.budget)],
    ['Revenue', formatMoney(media.revenue)],
    ['Production', names(media.production_companies)],
  ];
}

/** "Details" card: the facts that don't fit in the hero. Unknown values are left out. */
export default function MediaFacts({ media }: Props) {
  const facts = getFacts(media).filter((fact): fact is [string, string] => Boolean(fact[1]));
  if (facts.length === 0) return null;

  return (
    <section
      aria-labelledby="details-heading"
      className="border-card-stroke bg-panel rounded-[16px] border p-[20px] lg:p-[24px]"
    >
      <SectionHeading id="details-heading">Details</SectionHeading>
      <dl className="mt-[20px] grid grid-cols-2 gap-x-[16px] gap-y-[18px] sm:grid-cols-3 sm:gap-x-[24px] lg:grid-cols-1">
        {facts.map(([label, value]) => (
          <div
            key={label}
            className={WIDE_FACTS.has(label) ? 'col-span-2 min-w-0 sm:col-span-1' : 'min-w-0'}
          >
            <dt className="text-[12px] font-medium tracking-[0.06em] text-white/45 uppercase">
              {label}
            </dt>
            <dd className="mt-[4px] text-[15px] leading-[1.45] text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
