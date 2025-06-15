import fetchData from "@/utils/fetchData";
import { APIResponse } from "@/types/global";
import { Genre } from "@/types/genre";
import GenreCollectionClient from "./GenreCollectionClient";

const getGenreMovies = async (
	genre: Genre
): Promise<Genre & { movies: APIResponse["results"] }> => {
	try {
		const data = await fetchData<APIResponse>(
			"3",
			`discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`
		);
		// Filter out movies with no poster, THEN take the first 4
		const filteredMovies = data.results.filter((movie) => movie.poster_path).slice(0, 4);

		return {
			...genre,
			movies: filteredMovies,
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

		const seenMovieIds = new Set<number>();

		const genreMovies = [];

		for (const genre of genres) {
			const data = await fetchData<APIResponse>(
				"3",
				`discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`
			);

			// Filter for unique movies with valid posters
			const uniqueMovies = data.results
				.filter((movie) => movie.poster_path && !seenMovieIds.has(movie.id))
				.slice(0, 4); // Only take first 4 unique ones

			// Add movie IDs to seen set
			uniqueMovies.forEach((movie) => seenMovieIds.add(movie.id));

			// Add to genreMovies
			genreMovies.push({
				...genre,
				movies: uniqueMovies,
			});
		}

		return (
			<section className='relative z-1 mb-[28px]'>
				<GenreCollectionClient genreMovies={genreMovies} />
			</section>
		);
	} catch (error) {
		console.error("Failed to fetch genres:", error);
		return null;
	}
};

export default GenreCollection;
