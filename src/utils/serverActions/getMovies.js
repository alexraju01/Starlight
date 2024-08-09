"use server";

import fetchData from "../fetchData";

export default async function getMovies(page = 1) {
	const movie = await fetchData("3", `discover/movie?page=${page}`);
	return movie.results;
}
