import { Movie } from "@/types/global";
import fetchData from "@/utils/fetchData";
import Image from "next/image";

interface Props {
  endpoint: string;
}

type TrendingMediaResponse = { results: Movie[] };

const CustomSlider = async ({ endpoint }: Props) => {
  const { results } = await fetchData<TrendingMediaResponse>("3", endpoint);

  return (
    <section className="relative z-2 flex flex-col gap-[57px] lg:mx-[101px]">
      <div className="flex justify-between">
        <h2 className="text-[44px] font-medium font-Helvetica">
          Top 20 movies
        </h2>
      </div>

      <div className="flex gap-6 overflow-hidden">
        {results.map((media: Movie) => (
          <div
            key={media.id}
            className="relative w-[322px] h-[372px] bg-amber-500 shrink-0 rounded-[15.92px] "
          >
            <Image
              src={`https://image.tmdb.org/t/p/w780${media.poster_path}`}
              alt={media.title || media.name || "Movie Poster"}
              fill
              className="object-cover rounded-[11px] "
              //   sizes="(max-width: 768px) 100vw, 322px"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomSlider;
