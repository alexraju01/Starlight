"use server";

import fetchData from "../fetchData";

export default async function getMedia(mediaMode, page = 1) {
	const movie = await fetchData("3", `discover/${mediaMode}?page=${page}`);
	return movie.results;
}
