import ImageWithFallback from '@/components/Skeletons/BrokenImage/ImageWithFallback';
import { Season } from '@/types/seasons';

interface Props {
  id: number;
  season: Season;
}

const SeasonsCard = ({ season }: Props) => {
  return (
    <div key={season.id} className="transition-all duration-300 ease-in-out md:hover:scale-108">
      <div className="relative flex aspect-[1/1] h-[clamp(10rem,14vw,12rem)] w-full flex-col gap-[0.6rem] text-center text-[1.3rem]">
        <ImageWithFallback
          className="h-full w-full rounded-[0.6rem] bg-black object-cover"
          src={
            season.poster_path
              ? `https://image.tmdb.org/t/p/w342${season.poster_path}`
              : `https://image.tmdb.org/t/p/w342/`
          }
          alt={season.name}
        />
      </div>
      <h2 className="text-center text-[1.2rem]">{season.name}</h2>
    </div>
  );
};

export default SeasonsCard;
