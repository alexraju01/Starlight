import ImageWithFallback from '@/components/Skeletons/BrokenImage/ImageWithFallback';
import { Season } from '@/types/seasons';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  season: Season;
}

const SeasonsCard = ({ season }: Props) => {
  return (
    <div className="transition-all duration-300 ease-in-out md:hover:scale-108">
      <div className="relative flex aspect-[1/1] h-[clamp(10rem,14vw,12rem)] w-full flex-col gap-[0.6rem] text-center text-[1.3rem]">
        <ImageWithFallback
          className="h-full w-full rounded-[0.6rem] bg-black object-cover"
          src={getImageUrl(season.poster_path, 'poster', 'w342')}
          alt={season.name}
        />
      </div>
      <h3 className="text-center text-[1.2rem]">{season.name}</h3>
    </div>
  );
};

export default SeasonsCard;
