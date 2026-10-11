import SectionHeading from '@/components/Navigation/SectionHeading';
import { Season } from '@/types/seasons';
import Icons from '@/utils/icons';

import SeasonsCard from './SeasonsCard';

interface Props {
  seasons?: Season[];
}

const Seasons = ({ seasons }: Props) => {
  if (!seasons || seasons.length === 0) return null;
  const plural = seasons.length === 1 ? 'Season' : 'Seasons';

  return (
    <section className="flex w-full flex-col gap-4">
      <SectionHeading icon={Icons.play}>{`${plural} (${seasons.length})`}</SectionHeading>

      <div className="grid w-full [grid-template-columns:repeat(auto-fill,minmax(13rem,1fr))] gap-[1.2rem] xl:gap-[1.5rem] @xl:[grid-template-columns:repeat(auto-fill,minmax(17rem,1fr))]">
        {seasons.map((season) => (
          <SeasonsCard key={season.id} season={season} />
        ))}
      </div>
    </section>
  );
};

export default Seasons;
