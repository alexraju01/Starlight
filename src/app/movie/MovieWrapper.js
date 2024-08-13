import getMedia from "@/utils/serverActions/getMedia";
import MovieList from "./MovieList";

export default async function MovieWrapper() {
	const movies = await getMedia("movie", 1);
	return <MovieList initialMovies={movies} />;
}
