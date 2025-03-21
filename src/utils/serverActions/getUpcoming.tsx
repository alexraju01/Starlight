import { APIResponse } from "@/types/global";
import fetchData from "../fetchData";

const today = new Date().toISOString().split("T")[0];

export default async function getUpcoming(mediaMode = "tv", page = 1) {
	const movie = await fetchData<APIResponse>(
		"3",
		`discover/${mediaMode}?first_air_date.gte=${today}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=first_air_date.asc`
	);
	return movie.results;
}
