"use server";

import { MediaMode } from "@/types/mediaMode";
import fetchData from "../fetchData";
import { APIResponse } from "@/types/global";

export default async function getMedia(mediaMode: MediaMode, page = 1) {
	const movie = await fetchData<APIResponse>("3", `discover/${mediaMode}?page=${page}`);
	return movie.results;
}
