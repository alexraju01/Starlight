import CarouselClient from "./CarouselClient";
import { MediaMode } from "@/types/mediaMode";
import { Genre } from "@/types/genre";
import { MoviesWithLogos } from "@/types/global";
import { fetchData } from "@/utils";
import { mapGenres } from "@/utils/genre";

type GenreResponse = { genres: Genre[] };
type TrendingMediaResponse = { results: MoviesWithLogos[] };
type ImageResponse = { logos: { file_path: string; iso_639_1: string }[] };

interface Props {
	mediaMode: MediaMode;
}

export default async function Carousel({ mediaMode }: Props) {
	try {
		const [genreRes, trendingRes] = await Promise.all([
			fetchData<GenreResponse>("3", `genre/${mediaMode}/list`),
			fetchData<TrendingMediaResponse>("3", `trending/${mediaMode}/week`),
		]);

		const genreMap = mapGenres(genreRes.genres);
		const trendingMedia = trendingRes.results.slice(0, 9);

		const moviesWithLogos: MoviesWithLogos[] = await Promise.all(
			trendingMedia.map(async (movie) => {
				try {
					const { logos } = await fetchData<ImageResponse>("3", `${mediaMode}/${movie.id}/images`);
					const logo = logos.find((l) => l.iso_639_1 === "en");

					return {
						...movie,
						logoImage: logo ? `https://image.tmdb.org/t/p/w300${logo.file_path}` : undefined,
					};
				} catch (logoErr) {
					console.warn(`Logo fetch failed for movie ${movie.id}:`, logoErr);
					return movie;
				}
			})
		);

		return <CarouselClient movies={moviesWithLogos} genres={genreMap} />;
	} catch (err) {
		console.error("Error rendering carousel:", err);
		return <p className='text-white'>Failed to load carousel.</p>;
	}
}
