"use server";

import fetchData from "./fetchData";

export default async function getSearch(query) {
	const results = await fetchData(3, `search/multi?query=${query}`);
	return results.results;
}
