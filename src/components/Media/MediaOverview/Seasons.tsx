import SectionHeading from '@/components/Navigation/SectionHeading';
import { Season } from '@/types/seasons';

import SeasonsCard from './SeasonsCard';

interface Props {
  seasons?: Season[];
}

/**
 * The show's seasons in order. TMDB stores "Specials" as season 0: it's listed last and
 * left out of the count, so the heading matches the "N Seasons" shown elsewhere on the page.
 */
export default function Seasons({ seasons }: Props) {
  if (!seasons || seasons.length === 0) return null;

  const regular = seasons.filter((season) => season.season_number > 0);
  const specials = seasons.filter((season) => season.season_number === 0);

  return (
    <section aria-labelledby="seasons-heading" className="flex flex-col gap-[20px]">
      <SectionHeading id="seasons-heading" count={regular.length || undefined}>
        Seasons
      </SectionHeading>

      <ul className="scroll-row">
        {[...regular, ...specials].map((season) => (
          <SeasonsCard key={season.id} season={season} />
        ))}
      </ul>
    </section>
  );
}
