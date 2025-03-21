"use server";

import { APIResponse } from "@/types/global";
import fetchData from "../fetchData";

export default async function getSearch(query: string) {
	const results = await fetchData<APIResponse>("3", `search/multi?query=${query}`);
	return results.results;
}
