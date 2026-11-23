import SectionHeading from '@/components/Navigation/SectionHeading';
import { Season } from '@/types/seasons';
import { orderSeasons } from '@/utils/seasons';

import SeasonsCard from './SeasonsCard';

interface Props {
  seasons?: Season[];
  showId: number;
  showName: string;
}

/**
 * The show's seasons, each linking to its episode list. "Specials" (TMDB's season 0) is
 * listed last and left out of the count, so it matches the "N Seasons" elsewhere on the page.
 */
export default function Seasons({ seasons, showId, showName }: Props) {
  const ordered = orderSeasons(seasons);
  if (ordered.length === 0) return null;
  const regularCount = ordered.filter((season) => season.season_number > 0).length;

  return (
    <section aria-labelledby="seasons-heading" className="flex flex-col gap-[20px]">
      <SectionHeading id="seasons-heading" count={regularCount || undefined}>
        Seasons
      </SectionHeading>

      <ul className="scroll-row">
        {ordered.map((season) => (
          <SeasonsCard key={season.id} season={season} showId={showId} showName={showName} />
        ))}
      </ul>
    </section>
  );
}
