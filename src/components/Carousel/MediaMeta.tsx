import { MoviesWithLogos } from "@/types/global";
import { dateConverter } from "@/utils/dateConverter";
import { capitalize } from "@/utils/capitalize";
import { getGenreNames } from "@/utils/getGenreNames";
// import { getGenreNames } from "@/utils/getGenreNames";

interface Props {
  movie: MoviesWithLogos;
  genres: Record<string, string>;
}

export default function MediaMeta({ movie, genres }: Props) {
  console.log(genres);
  return (
    <div className="flex gap-3.5 items-center mb-8 text-white text-[20px] font-normal">
      <p>{dateConverter(movie.release_date)}</p>
      <span className="h-[25px] w-[1px] bg-white"></span>
      <p>{capitalize(movie.media_type)}</p>
      <span className="h-[25px] w-[1px] bg-white"></span>

      {/* <span className="h-[25px] w-[1px] bg-white"></span> */}
      <p>{getGenreNames(movie, genres)}</p>
    </div>
  );
}
