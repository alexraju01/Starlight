// app/movies/[id]/generateStaticParams.js

// import { fetchMovies } from "../../../lib/movies";

export async function generateStaticParams(url) {
	const movies = await fetchMovies(3, url);
	return movies.map((movie) => ({
		id: movie.id.toString(),
	}));
}
