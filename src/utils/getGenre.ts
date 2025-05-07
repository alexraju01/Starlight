import { GenreResponse } from "@/types/genre";
import fetchData from "./fetchData";

export default async function getGenre(mediaMode: string) {
	return await fetchData<GenreResponse>("3", `genre/${mediaMode}/list`);
}
