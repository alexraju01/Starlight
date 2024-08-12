"use server";

import fetchData from "../fetchData";

export default async function getUpcoming(mediaMode = "tv", page = 1) {
	const movie = await fetchData(
		"3",
		`discover/tv?first_air_date.gte=2024-08-12&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
	);
	return movie.results;
}
