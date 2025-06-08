"use server";

import { APIResponse } from "@/types/global";
import { MediaMode } from "@/types/mediaMode";

import fetchData from "../fetchData";

export default async function getMedia(mediaMode: MediaMode, page = 1) {
	console.log("inner mediamode", mediaMode);
	console.log("inner pagesss:", page);
	const movie = await fetchData<APIResponse>("3", `discover/${mediaMode}`, page);

	return movie.results;
}
