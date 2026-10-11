import SectionHeading from '@/components/Navigation/SectionHeading';
import { Season } from '@/types/seasons';

import SeasonsCard from './SeasonsCard';

interface Props {
  seasons?: Season[];
}

const Seasons = ({ seasons }: Props) => {
  if (!seasons || seasons.length === 0) return null;

  return (
    <section aria-labelledby="seasons-heading" className="flex flex-col gap-[20px]">
      <SectionHeading id="seasons-heading" count={seasons.length}>
        Seasons
      </SectionHeading>

      <ul className="scroll-row">
        {seasons.map((season) => (
          <SeasonsCard key={season.id} season={season} />
        ))}
      </ul>
    </section>
  );
};

export default Seasons;
