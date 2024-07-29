import { fetchData } from "./fetchData";

export async function getGenre(type) {
	return await fetchData(3, `genre/${type}/list`);
}
