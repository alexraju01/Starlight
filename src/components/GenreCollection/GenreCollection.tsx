import fetchData from "@/utils/fetchData";
import { APIResponse } from "@/types/global";
import { Genre } from "@/types/genre";
import GenreCollectionClient from "@/components/GenreCollection/GenreCollectionClient";

const getGenreMovies = async (
	genre: Genre
): Promise<Genre & { movies: APIResponse["results"] }> => {
	try {
		const data = await fetchData<APIResponse>(
			"3",
			`discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&page=1`
		);
		return {
			...genre,
			movies: data.results.slice(0, 4),
		};
	} catch (error) {
		console.error(`Failed to fetch movies for genre ${genre.name}:`, error);
		return {
			...genre,
			movies: [],
		};
	}
};

const GenreCollection = async () => {
	try {
		const { genres }: { genres: Genre[] } = await fetchData("3", "/genre/movie/list");
		const genreMovies = await Promise.all(genres.map(getGenreMovies));

		return (
			<section className='relative z-2 mb-[28px]'>
				<GenreCollectionClient genreMovies={genreMovies} />
			</section>
		);
	} catch (error) {
		console.error("Failed to fetch genres:", error);
		return null; // or fallback UI
	}
};

export default GenreCollection;
