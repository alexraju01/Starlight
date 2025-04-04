// import CarouselClient from "./CarouselClient";
import fetchData from "@/utils/fetchData";
import mapGenres from "@/utils/mapGenre";
import { MediaMode } from "@/types/mediaMode";
import { Genre } from "@/types/genre";
import { MoviesWithLogos } from "@/types/global";
import CarouselClient from "./CarouselClient";

type GenreResponse = { genres: Genre[] };
type TrendingMediaResponse = { results: MoviesWithLogos[] };
type ImageResponse = { logos: { file_path: string; iso_639_1: string }[] };

interface Props {
  mediaMode: MediaMode;
}

export default async function Carousel({ mediaMode }: Props) {
  try {
    const { genres } = await fetchData<GenreResponse>(
      "3",
      `genre/${mediaMode}/list`
    );
    const genreMap = mapGenres(genres);

    const { results: trendingMedia } = await fetchData<TrendingMediaResponse>(
      "3",
      `trending/${mediaMode}/day`
    );

    const moviesWithLogos: MoviesWithLogos[] = await Promise.all(
      trendingMedia.slice(0, 7).map(async (movie) => {
        const { logos } = await fetchData<ImageResponse>(
          "3",
          `${mediaMode}/${movie.id}/images`
        );
        const logoImage = logos.find((logo) => logo.iso_639_1 === "en");

        return {
          ...movie,
          logoImage: logoImage
            ? `https://image.tmdb.org/t/p/w300${logoImage.file_path}`
            : undefined,
        };
      })
    );

    return <CarouselClient movies={moviesWithLogos} genres={genreMap} />;
  } catch (err) {
    console.error("Error rendering carousel:", err);
    return <p className="text-white">Failed to load carousel.</p>;
  }
}
