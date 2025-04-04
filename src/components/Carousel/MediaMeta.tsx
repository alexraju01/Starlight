import { MoviesWithLogos } from "@/types/global";
import { dateConverter } from "@/utils/dateConverter";
import { capitalize } from "@/utils/capitalize";

export default function MediaMeta({ movie }: { movie: MoviesWithLogos }) {
  return (
    <div className="flex gap-3.5 items-center mb-8 text-white text-[20px] font-normal">
      <p>{dateConverter(movie.release_date)}</p>
      <span className="h-[25px] w-[1px] bg-white"></span>
      <p>{capitalize(movie.media_type)}</p>
    </div>
  );
}
