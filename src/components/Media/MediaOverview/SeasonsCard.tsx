// import ImageWithFallback from "@/components/feedback/BrokenImage";
import ImageWithFallback from '@/components/Feedback/BrokenImage/ImageWithFallback';
import { Season } from '@/types/seasons';

interface Props {
  id: number;
  season: Season;
}

const tmdbLoader = ({ src, width }: { src: string; width: number }) => {
  const size = width <= 185 ? 'w185' : 'w342';
  return `https://image.tmdb.org/t/p/${size}${src}`;
};

export default function SeasonsCard({ season }: Props) {
  return (
    <div key={season.id} className="transition-all duration-300 ease-in-out  md:hover:scale-108">
      <div className="flex flex-col gap-[0.6rem] w-full aspect-[1/1] h-[clamp(10rem,14vw,12rem)] text-[1.3rem] text-center relative">
        <ImageWithFallback
          className="w-full h-full object-cover rounded-[0.6rem] bg-black"
          src={
            season.poster_path
              ? `https://image.tmdb.org/t/p/w342${season.poster_path}`
              : `https://image.tmdb.org/t/p/w342/`
          }
          alt={season.name}
        />
      </div>
      <h2 className="text-[1.2rem] text-center">{season.name}</h2>
    </div>
  );
}
